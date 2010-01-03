/*
 * sameForm - Your form with the same nice look in all browsers.
 * by Claudemiro Feitosa <dimiro1@gmail.com>
 *
 * Version: 0.1
 *
 */
// SELECT
// Based on http://mondaybynoon.com/2009/02/23/creating-custom-form-elements-using-jquery-selects/
(function($) {
  $.fn.sameSelect = function() {
    var z = 999;
    $(document).mousedown(function checkExternalClick(event) {
      if ($(event.target).parents('.activedropdown').length === 0) {
	     $('.activedropdown').removeClass('activedropdown');
		  $('.options').hide();
	   }
    });
    return this.each(function(i, original_select) {
      var parent = $(original_select).parent();
      $(original_select).hide(); // hide the original select

	   // prep the target for our new markup
      var select = $('<dl class="select"><dt><a class="dropdown_toggle" href="#"></a></dt><dd><div class="options"><ul></ul></div></dd></dl>').css('zIndex', z);
      z--;
      // put new select under the original
      $(select).insertAfter(original_select);

      // we don't want to see it yet
      parent.find(".select .options").hide();

      // parse all options within the select and set indices
	   var option_index = 0;
	   $(original_select).find('option').each(function(option_index, option) {
		  // add the option
        $(parent).find('.select .options ul').append('<li><a href="#"><span class="value">' + $(option).text() + '</span><span class="hidden index">' + option_index + '</span></a></li>');

		  // check to see if this is what the default should be
		  if($(option).attr('selected')) {
          var selected = $("<span></span>").html($(option).text());
			 $(select).find('a.dropdown_toggle').append(selected);
		  }
		  i++;
      });

      // let's hook our links, ya?
	   $('a.dropdown_toggle').live('click', function() {
        var theseOptions = $(this).parent().parent().find('.options');
		  if(theseOptions.css('display') == 'block') {
			 $('.activedropdown').removeClass('activedropdown');
			 theseOptions.hide();
		  } else {
			theseOptions.parent().parent().addClass('activedropdown');
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
		  enhanced.find('.dropdown_toggle').empty().append('<span></span>').find('span').text($(this).find('span.value').text());
		  return false;
      });
    });
  };
})(jQuery);
// RADIO
(function($) {
  $.fn.sameRadio = function() {
    return this.each(function(i, element) {
      var parent = $(element).parent();
      var checked = "off";
      if ($(element).attr("checked")) {
        checked = "on";
      }

      var radio = $("<span></span>")
        .addClass("radio")
        .addClass(checked)
        .html("&nbsp;"); // IE need something inside
      $(radio).insertAfter(element);
      $(element).hide(); // hide the original checkbox

      // bind the click function
      $(radio).click(function(e) {
        $('input[name=' + $(element).attr("name") + ']').each(function(j, r) {
          $(r).removeAttr("checked");
          $(r).next('span').removeClass("on");
          $(r).next('span').addClass("off");
        });
        if ($(element).attr("checked")) {
          $(element).removeAttr("checked");
          $(radio).addClass("off");
          $(radio).removeClass("on");
        } else {
          $(element).attr({"checked": "checked"});
          $(radio).removeClass("off");
          $(radio).addClass("on");
        }
      });
    });
  };
})(jQuery);
// CHECKBOX
(function($) {
  $.fn.sameCheckbox = function() {
    return this.each(function(i, element) {
      var parent = $(element).parent();
      var checked = "off";
      if ($(element).attr("checked")) {
        checked = "on";
      }
      // create the enhanced checkbox
      var check = $("<span></span>")
                    .addClass("checkbox")
                    .addClass(checked)
                    .html("&nbsp;"); // IE need something inside
      $(check).insertAfter(element);
      $(element).hide(); // hide the original checkbox

      // LABEL Accessibility
      $('label[for=' + $(element).attr("name") + ']').live("click", function() {
        $(check).click();
      });
      // bind the click function
      $(check).click(function(e) {
        if ($(element).attr("checked")) {
          $(element).removeAttr("checked");
          $(check).addClass("off");
          $(check).removeClass("on");
        } else {
          $(element).attr({"checked": "checked"});
          $(check).removeClass("off");
          $(check).addClass("on");
        }
      });
    });
  };
})(jQuery);
(function($) {
  $.fn.sameForm = function() {
    return this.each(function(i, form) {
      $(form).addClass("sameForm");
      $('select', form).sameSelect();
      $('input[type=checkbox]', form).sameCheckbox();
      $('input[type=radio]', form).sameRadio();
    });
  };
})(jQuery);
