$(function() {

	var methods = {

		defaults: {
			duration: 3000,
			screen: 0,
			screens: 7,
			question: 0,
			breakpoint: 900
		},

		windowWidth: $(window).width(),
		windowHeight: $(window).height(),

		answers: {
			1:0,
			2:0,
			3:0,
			4:0,
			5:0,
			6:0,
			7:0,
			8:0
		},

		plans: {
			hsa:0,
			hra:0,
			depends:0
		},

		planPhrase: {
			1: 'HSA Plan',
			2: 'It depends',
			3: 'HRA Plan'
		},

		chosenPlan: '',

		stars: {
			hsa: 'faded_star.png',
			hra: 'faded_star.png',
			depends: 'faded_star.png'
		},

		init: function(options) {
			if ( options ) {
				$.extend(methods.defaults, options);
			}
			methods.loop();
			methods.loadIntro();
		},

		bark: function() {
			if (Modernizr.audio) {
				if ( ! is_mobile(navigator.userAgent||navigator.vendor||window.opera) ) {
					$('#bark')[0].play();
				}
			} else {

				// The Modernizr check is for IE8, but Safari on Windows fails the pass as true,
				// so checking for no-borderradius is a check to result in a true for IE8 and false for
				// failing modern browsers to avvoid an error for the object.play method.

				if ( ! Modernizr.borderradius ) {
					try {
						mediaPlayerBark.object.play();
					} catch(err) {
					}
				}
			}
		},

		loop: function() {
			if (Modernizr.audio) {
				$('#loop')[0].play();
			} else {

				// The Modernizr check is for IE8, but Safari on Windows fails the pass as true,
				// so checking for no-borderradius is a check to result in a true for IE8 and false for
				// failing modern browsers to avvoid an error for the object.play method.

				if ( ! Modernizr.borderradius ) {
					try {
						mediaPlayerLoop.object.play();
					} catch(err) {
					}
				}
			}
		},

		advance: function() {
			$('.screen').fadeOut();
			methods.defaults.screen = methods.defaults.screen + 1;
			$('.splash_' + methods.defaults.screen).fadeIn();
		},

		adjustCanvas: function() {
			$('body').css( 'height', methods.windowHeight + 'px' );
			$('.content').css( 'height', ( methods.windowHeight - $('.header').height() ) + 'px' );
		},
  
		resizeSplashArea: function() {
			var screenNumber = methods.defaults.screen;

			if ( methods.windowWidth > methods.defaults.breakpoint ) {
				$('.splash_' + screenNumber + ' .intro').css('height', ($('.splash_' + screenNumber).height()) + 'px');

				var maxWidth = $('.splash_' + screenNumber).width();
				var contentWidth = $('.splash_' + screenNumber + ' .intro div').width();
				var gutterWidth = parseInt( (maxWidth - contentWidth) / 2 );
				var bullseyeWidth = $('.splash_' + screenNumber + ' .bullseye').width();

				var adjustment = 0;
				if (bullseyeWidth > gutterWidth) {
					adjustment = bullseyeWidth - gutterWidth;
				}

				$('.splash_' + screenNumber + ' .intro div p').css('padding-right', adjustment + 'px');
			} else {
				$('.splash_' + screenNumber + ' .intro div').css( 'padding-left', '0px' ).css( 'padding-right', '0px' );

				var splashHeight = $('.splash_' + screenNumber).height();
				var bullseyeHeight = $('.splash_' + screenNumber + ' .bullseye').height();
				$('.splash_' + screenNumber + ' .intro').css('height', (splashHeight - bullseyeHeight) + 'px');
			}

			// Height of container to equal height of child p
			var textHeight = $('.splash_' + screenNumber + ' .intro div p').height();
			$('.splash_' + screenNumber + ' .intro div').css('height', textHeight + 'px');
		},
  
		adjustQuizArea: function(number) {
			var queryHeight = $('.quiz_' + number + ' .query').outerHeight();

			var thisHeight = $('.quiz_' + number + ' .number p').height();
			$('.quiz_' + number + ' .number p').css( 'margin-top', ((queryHeight - thisHeight)/2) + 'px' );

			thisHeight = $('.quiz_' + number + ' .icon img').height();
			$('.quiz_' + number + ' .icon img').css( 'margin-top', ((queryHeight - thisHeight)/2) + 'px' );

			var resultHeight = $('.quiz_' + number + ' .result_1').outerHeight();
			thisHeight = $('.quiz_' + number + ' .selection_1 img').height();
			$('.quiz_' + number + ' .selection_1 img').css( 'margin-top', ((resultHeight - thisHeight)/2) + 'px' );

			var resultHeight = $('.quiz_' + number + ' .result_2').outerHeight();
			thisHeight = $('.quiz_' + number + ' .selection_2 img').height();
			$('.quiz_' + number + ' .selection_2 img').css( 'margin-top', ((resultHeight - thisHeight)/2) + 'px' );

			var resultHeight = $('.quiz_' + number + ' .result_3').outerHeight();
			thisHeight = $('.quiz_' + number + ' .selection_3 img').height();
			$('.quiz_' + number + ' .selection_3 img').css( 'margin-top', ((resultHeight - thisHeight)/2) + 'px' );

			var commentHeight = $('.quiz_' + number + ' .comment').outerHeight();
			var continueHeight = $('.quiz_' + number + ' .continue p').height();
			$('.quiz_' + number + ' .continue p').css( 'margin-top', ((commentHeight - continueHeight)/2) + 'px' );
		},
  
		adjustResultsArea1: function() {
			var resultHeight = $('#hra .planTitle').outerHeight();
			var thisHeight = $('#hra .planWeight div img').height();
			$('#hra .planWeight div').css( 'margin-top', ((resultHeight - thisHeight)/2) + 'px' );

			resultHeight = $('#hsa .planTitle').outerHeight();
			thisHeight = $('#hsa .planWeight div img').height();
			$('#hsa .planWeight div').css( 'margin-top', ((resultHeight - thisHeight)/2) + 'px' );

			resultHeight = $('#depends .planTitle').outerHeight();
			thisHeight = $('#depends .planWeight div img').height();
			$('#depends .planWeight div').css( 'margin-top', ((resultHeight - thisHeight)/2) + 'px' );

			if ( methods.windowWidth <= methods.defaults.breakpoint ) {
				var textHeight = $('.suggest h1').outerHeight();
				$('.suggest .plan').css('line-height', textHeight + 'px');
			}
		},

		adjustResultsArea2: function() {
			var queryHeight = $('.results_2 .query').outerHeight();

			var thisHeight = $('.results_2 .number p').height();
			$('.results_2 .number p').css( 'margin-top', ((queryHeight - thisHeight)/2) + 'px' );

			thisHeight = $('.results_2 .target p').height();
			$('.results_2 .target p').css( 'margin-top', ((queryHeight - thisHeight)/2) + 'px' ).css('padding-bottom', ((queryHeight - thisHeight)/2) + 'px');
		},
  
		loadIntro: function() {

			methods.defaults.screen = 0;
			methods.advance();
			methods.resizeSplashArea();

			setTimeout( function() {
				methods.advance();
				methods.resizeSplashArea();

				setTimeout( function() {
					methods.advance();
					methods.resizeSplashArea();

					setTimeout( function() {
						methods.advance();
						methods.resizeSplashArea();

						setTimeout( function() {
							methods.advance();
							methods.resizeSplashArea();

							setTimeout( function() {
								methods.advance();
								methods.resizeSplashArea();

								$('.goToQuiz').on( 'click tap', function() {
									methods.resetRetakeQuiz();
									return false;
								});

							}, methods.defaults.duration );
						}, methods.defaults.duration );
					}, methods.defaults.duration );
				}, methods.defaults.duration );
			}, methods.defaults.duration );
		},

		resetRetakeQuiz: function() {

			$('body').addClass('allowScroll');

			methods.defaults.question = 1;

			methods.chosenPlan = '';

			methods.answers = {
				1:0,
				2:0,
				3:0,
				4:0,
				5:0,
				6:0,
				7:0,
				8:0
			};

			methods.plans = {
				hsa:0,
				hra:0,
				depends:0
			};

			methods.stars = {
				hsa: 'faded_star.png',
				hra: 'faded_star.png',
				depends: 'faded_star.png'
			};

			$('.selection img').attr('src', 'img/no_star.png');
			$('.answer').removeClass('selectedAnswer');

			$('.planWeight div img').attr('src', 'img/no_star.png');
			$('.result').removeClass('selectedPlan');

			methods.nextQuestion(1);
		},

		nextQuestion: function(number) {
			methods.defaults.question = number;

			$('.screen').hide();
			window.scrollTo( 0, window.pageYOffset + 1 );
			$('.quiz_' + number).fadeIn();

			methods.adjustQuizArea(number);

			if ( number == 9 ) {
				methods.showResults1();
			} else {
				$('.quiz_' + number).fadeIn();
				methods.adjustQuizArea(number);
			}

		},

		showResults1: function() {

			$('.screen').hide();
			window.scrollTo( 0, window.pageYOffset + 1 );
			$('.results_1').fadeIn();

			// methods.answers = { 1:1, 2:1, 3:1, 4:3, 5:2, 6:3 };
			// methods.answers = { 1:3, 2:3, 3:3, 4:1, 5:2, 6:1 };
			// methods.answers = { 1:2, 2:2, 3:2, 4:1, 5:2, 6:3 };

			$.each( methods.answers, function(index, value) {
			if ( index != 3 ) {					
				if ( value == 1 ) {
					methods.plans.hsa = methods.plans.hsa + 1;
				} else if ( value == 2 ) {
					methods.plans.depends = methods.plans.depends + 1;
				} else {
					methods.plans.hra = methods.plans.hra + 1;
				}					
			}							 
				
			});

			var topTally;

			if ( methods.plans.hsa > methods.plans.hra ) {
				methods.chosenPlan = 'HSA';
				$('.plan').html(methods.chosenPlan);
				$('#hsa').addClass('selectedPlan');
				methods.stars.hsa = 'star.png';
				topTally = methods.plans.hsa;
			}

			if ( methods.plans.hra > methods.plans.hsa ) {
				methods.chosenPlan = 'HRA';
				$('.plan').html(methods.chosenPlan);
				$('#hra').addClass('selectedPlan');
				methods.stars.hra = 'star.png';
				topTally = methods.plans.hra;
			}

			if ( methods.plans.depends >= topTally || methods.plans.hra == methods.plans.hsa ) {
				methods.chosenPlan = 'It depends';
				var font_size = '200%';
				if ( methods.windowWidth <= methods.defaults.breakpoint ) {
					font_size = '120%';
				}
				// if ( methods.answers[4] == 1 ) {
				if (methods.plans.hsa > methods.plans.hra) {
					$('.plan').css('font-size', font_size).html('It depends, but consider the HSA plan.');
					if ( methods.windowWidth <= methods.defaults.breakpoint ) {
						$('.plan').css('font-size', '110%').html('Depends');
					}
				} else {
					$('.plan').css('font-size', font_size).html('It depends, but consider the HRA plan.');
					if ( methods.windowWidth <= methods.defaults.breakpoint ) {
						$('.plan').css('font-size', '110%').html('Depends');
					}
				}
				$('#depends').addClass('selectedPlan');
				methods.stars.depends = 'star.png';
			}

			var counter = 0;

			$('#hra .planWeight div img').each( function(index) {
				counter = counter + 1;
				if ( counter <= methods.plans.hra ) {
					$(this).attr('src', 'img/' + methods.stars.hra);
				}
			});

			counter = 0;

			$('#hsa .planWeight div img').each( function(index) {
				counter = counter + 1;
				if ( counter <= methods.plans.hsa ) {
					$(this).attr('src', 'img/' + methods.stars.hsa);
				}
			});

			counter = 0;

			$('#depends .planWeight div img').each( function(index) {
				counter = counter + 1;
				if ( counter <= methods.plans.depends ) {
					$(this).attr('src', 'img/' + methods.stars.depends);
				}
			});

			methods.adjustResultsArea1();

			// console.log( '1: ' + methods.answers[1] );
			// console.log( '2: ' + methods.answers[2] );
			// console.log( '3: ' + methods.answers[3] );
			// console.log( '4: ' + methods.answers[4] );
			// console.log( '5: ' + methods.answers[5] );
			// console.log( '6: ' + methods.answers[6] );
		},

		showResults2: function() {
			$('.screen').hide();
			window.scrollTo( 0, window.pageYOffset + 1 );
			$('.results_2').fadeIn();

			methods.adjustResultsArea2();
			$('.target_1 p').html( methods.planPhrase[ methods.answers[1] ] );
			$('.target_2 p').html( methods.planPhrase[ methods.answers[2] ] );
			//$('.target_3 p').html( methods.planPhrase[ methods.answers[3] ] );
			$('.target_4 p').html( methods.planPhrase[ methods.answers[4] ] );
			$('.target_5 p').html( methods.planPhrase[ methods.answers[5] ] );
			$('.target_6 p').html( methods.planPhrase[ methods.answers[6] ] );
			$('.target_7 p').html( methods.planPhrase[ methods.answers[7] ] );
			$('.target_8 p').html( methods.planPhrase[ methods.answers[8] ] );
		}
	};

	$.quiz = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === "object" || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error("Method " +  method + " does not exist.");
		}
	};

	$(window).resize( function() {
		methods.windowWidth = $(window).width();
		methods.windowHeight = $(window).height();
		methods.adjustCanvas();
		methods.resizeSplashArea();
		methods.adjustQuizArea(methods.defaults.question);
		methods.adjustResultsArea1();
		methods.adjustResultsArea2();
	});

	$('.continue p a').on( 'click tap', function() {
		var next = $(this).attr('data-next');
		if ( methods.answers[next-1] < 1 ) {
			$('.error').fadeIn();
		} else {
			$('.error').hide();
			methods.nextQuestion( next );
		}
		return false;
	});

	$('.quiz .answer').on( 'click tap', function() {
		$('.error').hide();

		var qNumber = $(this).attr('data-question');
		var aNumber = $(this).attr('data-answer');
		methods.answers[qNumber] = aNumber;

		$(this).siblings('.answer').removeClass('selectedAnswer').children('div').children('.selection').children('img').attr('src', 'img/no_star.png');
		$(this).addClass('selectedAnswer').children('div').children('.selection').children('img').attr('src', 'img/star.png');
	});

	$('.details').on( 'click tap', function() {
		methods.showResults2();
		return false;
	});

	$('.retake').on( 'click tap', function() {
		methods.resetRetakeQuiz();
		return false;
	});

	$('body').scroll( function () {
		$('.screen img.bullseye').css('bottom', 0).css('right', 0);
	});

	methods.adjustCanvas();

	$('.splash_0').show();
	methods.resizeSplashArea();

	// $('.quiz_1').show();
	// methods.resetRetakeQuiz();

	// $('.results_1').show();
	// $('body').addClass('allowScroll');
	// methods.showResults1();
});

$(document).ready(function(){
	$('.back-to').on('click tap', function() {
		$('.screen').hide();
		$('.results_1').fadeIn();
	});

});

$('.quiz_8 .next .continue a').on('click tap', function() {
	$('.smb-result li').hide();
	$('.results_2 .target-b1, .results_2 .target-b2, .results_2 .target-b3').hide();
	if ($(".quiz_1 .selection_3 img").attr('src') == 'img/star.png') {
		$('.smb-result li:nth-of-type(1)').show();
		$('.results_2 .target-b1').show();
	}
	if ($(".quiz_2 .selection_1 img").attr('src') == 'img/star.png') {
		$('.smb-result li:nth-of-type(2)').show();
		$('.results_2 .target-b2').show();
	}
	if ($(".quiz_3 .selection_1 img").attr('src') == 'img/star.png' || $(".quiz_3 .selection_2 img").attr('src') == 'img/star.png') {
		$('.smb-result li:nth-of-type(3)').show();
		$('.results_2 .target-b3').show();
	}
	if ($(".quiz_1 .selection_3 img").attr('src') == 'img/no_star.png' && $(".quiz_2 .selection_1 img").attr('src') == 'img/no_star.png' && $(".quiz_3 .selection_1 img").attr('src') == 'img/no_star.png' && $(".quiz_3 .selection_2 img").attr('src') == 'img/no_star.png') {
		$('.smb-result li:nth-of-type(4)').show();
	}
});