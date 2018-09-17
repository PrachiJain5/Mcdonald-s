var myPlayer;
var hash = window.location.hash;
var path = window.location.pathname.split('/');
var population = getQuery('p');

if (population == 'hi') {
	localStorage.setItem('population','hi');
} else if (population == 'pt') {
	localStorage.setItem('population','pt');
} else if (population == 'ft') {
	localStorage.setItem('population','ft');
}

currentPopulation = localStorage.getItem('population');
console.log('currentPopulation ' + currentPopulation);
if ($('.premiums').length) {
	$.get('inc-modal-premiums.html')
	.done(function(data) {
		$('body').append(data);
		$('#premiums').on('shown.bs.modal', function() {
			accordionActions();
			$('#premiums').on('show.bs.collapse', toggleIcon);
			$('#premiums').on('hide.bs.collapse', toggleIcon);
		populationFilter();
		});
	});
}

if (localStorage.getItem('population') == 'ft') {
	if (document.title == 'Use Tools') {
		$('title').html('Use Tools and Watch Videos');
	}
}
(function (i, s, o, g, r, a, m) {
i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
	(i[r].q = i[r].q || []).push(arguments)
}, i[r].l = 1 * new Date(); a = s.createElement(o),
	m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', myEnvironment(), 'auto');

ga('set', {
	page: '/' + path[path.length-2] + '/' + path[path.length-1] + ' | pop: ' + currentPopulation
});
//No additional Dimensions are required for IS&T sites
ga('send', 'pageview');
	
$(function() { // document.ready
	$('header').load('inc-header.html', function() {
		populationFilter();
		// Menu set active class to current page
		var $page = path[path.length - 1];
		$('.navbar a').each(function() {
			var $href = $(this).attr('href');
			if (($href == $page) || ($href == '')) {
				$(this).addClass('active');
			} else {
				$(this).removeClass('active');
			}
		});
		if (!hash) {
			$('.benefits-2018-nav').find('a:visible:first').addClass('active');
		} else {
			if (path[path.length-1] == 'things-to-consider.html') {
				// open pill on things-to-consider.html page
				hash && $('ul.nav a[href="' + hash + '"]').tab('show');
			} else {
				// open pill on any other page mostly prepare-to-choose-2018-benefits.html page
				hash && $('nav a[href="' + hash + '"]').tab('show');
			}
		}
		$('.benefits-2018-nav a').filter(':visible').each(function(i) {
			var modulus;
			if (currentPopulation == 'pt') {
				modulus = (i + 1) % 4;
			} else {
				modulus = (i + 1) % 5;
			}
			if (modulus === 0) { 
				$(this).after('<div class="w-100"></div>');
			}
		});
		if (path[path.length - 1] == 'spanish.html') {
			if (path[0].indexOf('qa') > -1 || path[0].indexOf('qc') > -1) {
				$('.sso-link').attr('href', 'https://xyzoffice365.pf.target.com/idp/startSSO.ping?PartnerSpId=qc.hewitt.com:saml2.0&TargetResource=https://sso.alight.com/portal?pageCd=YBR_planInfo');
			} else {
				$('.sso-link').attr('href', 'https://saml.pf.target.com/idp/startSSO.ping?PartnerSpId=hewitt.com:saml2.0&TargetResource=https://sso.alight.com/portal?pageCd=YBR_planInfo');
			}
		} else {
			if (path[0].indexOf('qa') > -1 || path[0].indexOf('qc') > -1) {
				$('.sso-link').attr('href', 'https://xyzoffice365.pf.target.com/idp/startSSO.ping?PartnerSpId=qc.hewitt.com:saml2.0&TargetResource=https://sso.hewitt.com/upoint?pageCd=YBR_planInfo');
			} else {
				$('.sso-link').attr('href', 'https://saml.pf.target.com/idp/startSSO.ping?PartnerSpId=hewitt.com:saml2.0&TargetResource=https://sso.hewitt.com/upoint?pageCd=YBR_planInfo');
			}
		}
		eventTracking();
		
	});
	checkModalVideo();
	if ($('.consider-content').length) {
		$('.consider-content').load('things-to-consider.html #pills-tabContent', function() {
			populationFilter();
			checkModalVideo();
		});
	}
	$('footer').load('inc-footer.html', function() {
		populationFilter();
		eventTracking();
	});

	accordionActions();

	$('.accordion').on('show.bs.collapse', toggleIcon);
	$('.accordion').on('hide.bs.collapse', toggleIcon);

	$('.solid-circle').closest('a').addClass('no-hover');
});

function eventTracking() {
	$('a[href$="pdf"]').each(function() {
		var link = jQuery(this).attr('href') + ' | pop: ' + currentPopulation;
		$(this).attr({
			'onclick': "ga('send', 'event', 'PDF', 'Clicked', jQuery(this).attr('href') + ' | pop: ' + currentPopulation, {'nonInteraction': 1});",
			'target': '_blank'
		});
	});
	$('a[href$=".doc"], a[href$=".docx"], a[href$=".xls"], a[href$=".xlsx"], a[href$=".ppt"], a[href$=".pptx"]').each(function() {
		$(this).attr('onclick', "ga('send', 'event', 'Media', 'Clicked', jQuery(this).attr('href') + ' | pop: ' + currentPopulation, {'nonInteraction': 1});");
	});
	$('a[href^="http"]').each(function() {
		$(this).attr({
			'onclick': "ga('send', 'event', 'Outbound', 'Clicked', jQuery(this).attr('href') + ' | pop: ' + currentPopulation, {'nonInteraction': 1});",
			'target': '_blank'
		});
	});
}

function toggleIcon(e) {
	$(e.target).prev('.card-header').find('.accordion-arrow').toggleClass('accordion-arrow-rotate');
}

function getQuery(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable) {
			return pair[1];
		}
	}
	return(false);
}

function populationFilter() {
	if (currentPopulation == 'hi') {
		$('.hawaii').show();
		$('.accordion > .card.hawaii').addClass('d-flex');
		$('#pills-medicalTwo').addClass('active show');
	}
	if (currentPopulation == 'pt') {
		$('.part-time').show();
		$('.accordion > .card.part-time').addClass('d-flex');
		$('#pills-supplemental').addClass('active show');
	}
	if (currentPopulation == 'ft') {
		$('.full-time').show();
		$('.accordion > .card.full-time').addClass('d-flex');
		$('#pills-medicalOne').addClass('active show');
	}
	// if (!currentPopulation) {
	// 	window.location = "error.html";
	// }
}

function accordionActions() {
	$('.accordion .open-all').each(function(index) {
		$(this).on('click', function() {
			$(this).closest('.accordion').find('.card .collapse:not(".show")').collapse('show');
		});
	});
	$('.accordion .close-all').each(function(index) {
		$(this).on('click', function() {
			$(this).closest('.accordion').find('.card .collapse.show').collapse('hide');
		});
	});
}

function changeVideo(videoId) {
	myPlayer.catalog.getVideo(videoId, function(error,video) {
		myPlayer.catalog.load(video);
		var name = myPlayer.mediainfo.name;
		$('#playerLightbox').removeClass('playerHide').addClass('playerShow');
		$('#lightboxBg').show();
		$('body').addClass('lightbox-open');
		$('#video-title').html(name);
		myPlayer.play();
	});
	myPlayer.on('ended', function() {
		playerClose();
	});
}

function playerClose() {
	myPlayer.pause();
	$('#playerLightbox').removeClass('playerShow').addClass('playerHide');
	$('#lightboxBg, .end-link').hide();
	$('.end-link img').attr('src', '');
	$('body').removeClass('lightbox-open');
}

function initLightbox() {
	videojs("myPlayerID").ready(function() {
		myPlayer = this;
	});
	$('#lightboxBg').on('click', function() {
		playerClose();
	});
}

function checkModalVideo() {
	if ($('.modal-video').length) {
		$.get("inc-modal-video.html")
		.done(function(data) {
			$('header').after(data);
			$.getScript('js/index.min.js', function() {
				initLightbox();
			});
		});
	}
}

function myEnvironment() {
	var environmentString = location.hostname; // ex. qa.makeityoursource.com/compareprices/csc/
	var returnValue;
	if (environmentString.indexOf("qa.") > -1 || environmentString.indexOf("qc.") > -1 || environmentString.indexOf("localhost") > -1) {
		returnValue = "UA-51404617-1";
	} else {
		returnValue = "UA-26291185-35"; // Replace as appropriate with Production Property Id
	}
	return returnValue;
}