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