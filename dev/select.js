// SELECT
// Inspired by http://mondaybynoon.com/2009/02/23/creating-custom-form-elements-using-jquery-selects/
(function($) {
  $.fn.sameSelect = function() {
    var z = 999;
    $(document).mousedown(function checkExternalClick(event) {
      if ($(event.target).parents('.select.on').length === 0) {
        $('.select.on').removeClass('on');
	     $('.select.on').removeClass('on');
		  $('.options').hide();
	   }
    });
    return this.each(function(i, original_select) {
      var parent = $(original_select).parent();
      $(original_select).hide(); // hide the original select

	   // prep the target for our new markup
      var select = $('<dl class="select"><dt><a class="toggle" href="javascript:void(0);"></a></dt><dd><div class="options"><ul></ul></div></dd></dl>').css('zIndex', z);
      z--;
      // put new select under the original
      $(select).insertAfter(original_select);

      // we don't want to see it yet
      parent.find(".select .options").hide();

      // parse all options within the select and set indices
	   var option_index = 0;
	   $(original_select).find('option').each(function(option_index, option) {
		  // add the option
        $(parent).find('.select .options ul').append('<li><a href="javascript:void(0);"><span class="value">' + $(option).text() + '</span><span class="hidden index">' + option_index + '</span></a></li>');

		  // check to see if this is what the default should be
		  if($(option).attr('selected')) {
          var selected = $("<span></span>").html($(option).text());
			 $(select).find('a.toggle').append(selected);
		  }
		  i++;
      });

      // let's hook our links, ya?
	   $('a.toggle').live('click', function() {
        var theseOptions = $(this).parent().parent().find('.options');
		  if(theseOptions.css('display') == 'block') {
			 $('.select.on').removeClass('on');
			 theseOptions.hide();
		  } else {
			theseOptions.parent().parent().addClass('on');
			theseOptions.show();
		  }
		  return false;
	   });

	   // bind to clicking a new option value
	   $('.options a').live('click', function(e) {
        $('.options').hide();

		  var enhanced = $(this).parent().parent().parent().parent().parent().parent();
		  var realselect = enhanced.find('select');

		  // set the proper index
		  realselect[0].selectedIndex = $(this).find('span.index').text();

		  // update the pseudo selected element
		  enhanced.find('.toggle').empty().append('<span></span>').find('span').text($(this).find('span.value').text());
		  return false;
      });
    });
  };
})(jQuery);