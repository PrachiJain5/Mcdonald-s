// Google Analytics Event tracking codes - jQuery must be installed
// UNIVERSAL TRACKING CODE EXAMPLE: ga('send', 'event', 'category', 'action', 'opt_label', opt_value, {'nonInteraction': 1});
// The codes below are common examples and can be modified, combined or added to as needed

$(document).ready(function(){ 

//FIND links ending in .pdf

$('a[href$="pdf"]').each(function() {

// ADD GA tracking code to links
$(this).attr('onclick', "ga('send', 'event', 'PDF', 'Clicked', jQuery(this).attr('href'), {'nonInteraction': 1});");
$(this).attr('target', '_blank'); // OPTIONAL: ADD target blank
});

//FIND links to DOCs, XLS, PPT if used

$('a[href$=".doc"], a[href$=".docx"], a[href$=".xls"], a[href$=".xlsx"], a[href$=".ppt"], a[href$=".pptx"]').each(function() {

// ADD GA tracking code to links
$(this).attr('onclick', "ga('send', 'event', 'Media', 'Clicked', jQuery(this).attr('href'), {'nonInteraction': 1});");
}); 

//FIND links that start with http

$('a[href^="http"]').each(function() {

// ADD GA tracking code to links
$(this).attr('onclick', "ga('send', 'event', 'Outbound', 'Clicked', jQuery(this).attr('href'), {'nonInteraction': 1});");
$(this).attr('target', '_blank'); // OPTIONAL: ADD target blank
});


}); 