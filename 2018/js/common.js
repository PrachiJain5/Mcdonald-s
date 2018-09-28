
// var path = window.location.href;
// var query = path.substring(path.indexOf("=")+1)
// var population = localStorage.getItem("population")
// if(population =="crew") {
//     document.getElementById("staffrm").style.display="none";
// }

var hash = window.location.hash;
var path = window.location.pathname.split('/');
var population = getQuery('p');

if (population == 'staffrm') {
	localStorage.setItem('population','staffrm');
} else if (population == 'crew') {
	localStorage.setItem('population','crew');
} else if (population == 'staffrmhi') {
    localStorage.setItem('population','staffrmhi');
} else if (population == 'crewhi') {
    localStorage.setItem('population', 'crewhi');
}

currentPopulation = localStorage.getItem('population');
console.log('currentPopulation ' + currentPopulation);

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
            // if (!hash) {
            //     $('.benefits-2018-nav').find('a:visible:first').addClass('active');
            // } else {
            //     if (path[path.length-1] == 'things-to-consider.html') {
            //         // open pill on things-to-consider.html page
            //         hash && $('ul.nav a[href="' + hash + '"]').tab('show');
            //     } else {
            //         // open pill on any other page mostly prepare-to-choose-2018-benefits.html page
            //         hash && $('nav a[href="' + hash + '"]').tab('show');
            //     }
            // }
            // $('.benefits-2018-nav a').filter(':visible').each(function(i) {
            //     var modulus;
            //     if (currentPopulation == 'pt') {
            //         modulus = (i + 1) % 4;
            //     } else {
            //         modulus = (i + 1) % 5;
            //     }
            //     if (modulus === 0) { 
            //         $(this).after('<div class="w-100"></div>');
            //     }
            // });
            // if (path[path.length - 1] == 'spanish.html') {
            //     if (path[0].indexOf('qa') > -1 || path[0].indexOf('qc') > -1) {
            //         $('.sso-link').attr('href', 'https://xyzoffice365.pf.target.com/idp/startSSO.ping?PartnerSpId=qc.hewitt.com:saml2.0&TargetResource=https://sso.alight.com/portal?pageCd=YBR_planInfo');
            //     } else {
            //         $('.sso-link').attr('href', 'https://saml.pf.target.com/idp/startSSO.ping?PartnerSpId=hewitt.com:saml2.0&TargetResource=https://sso.alight.com/portal?pageCd=YBR_planInfo');
            //     }
            // } else {
            //     if (path[0].indexOf('qa') > -1 || path[0].indexOf('qc') > -1) {
            //         $('.sso-link').attr('href', 'https://xyzoffice365.pf.target.com/idp/startSSO.ping?PartnerSpId=qc.hewitt.com:saml2.0&TargetResource=https://sso.hewitt.com/upoint?pageCd=YBR_planInfo');
            //     } else {
            //         $('.sso-link').attr('href', 'https://saml.pf.target.com/idp/startSSO.ping?PartnerSpId=hewitt.com:saml2.0&TargetResource=https://sso.hewitt.com/upoint?pageCd=YBR_planInfo');
            //     }
            // }
            eventTracking();
            
        });

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
	if (currentPopulation == 'staffrm') {
		$('.staffrm').show();
		$('.accordion > .card.staffrm').addClass('d-flex');
		$('#pills-medicalTwo').addClass('active show');
	}
	if (currentPopulation == 'crew') {
		$('.crew').show();
		$('.accordion > .card.crew').addClass('d-flex');
		$('#pills-supplemental').addClass('active show');
	}
	if (currentPopulation == 'staffrmhi') {
		$('.staffrmhi').show();
		$('.accordion > .card.staffrmhi').addClass('d-flex');
		$('#pills-medicalOne').addClass('active show');
    }
    if (currentPopulation == 'crewhi') {
		$('.crewhi').show();
		$('.accordion > .card.crewhi').addClass('d-flex');
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

function myEnvironment() {
	var environmentString = location.hostname; // ex. qa.makeityoursource.com/compareprices/csc/
	var returnValue;
	if (environmentString.indexOf("qa.") > -1 || environmentString.indexOf("qc.") > -1 || environmentString.indexOf("localhost") > -1 || environmentString.indexOf('127.0.0.1') > -1)  {
		returnValue = "UA-51404617-1";
	} else {
		returnValue = "UA-6459246-150"; // Replace as appropriate with Production Property Id
	}
	return returnValue;
}

