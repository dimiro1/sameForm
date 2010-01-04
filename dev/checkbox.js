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
      $('label[for=' + $(element).attr("id") + ']').live("click", function() {
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