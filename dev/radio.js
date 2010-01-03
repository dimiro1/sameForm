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