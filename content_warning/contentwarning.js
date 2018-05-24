(function ($) {
    Drupal.behaviors.contentwarning = {
      attach: function (context, settings) {
        var warning = new tingle.modal({
          footer: true,
          stickyFooter: true,
          closeMethods: ['overlay', 'button', 'escape'],
          closeLabel: "Close",
          cssClass: ['contentwarningclass'],
          onOpen: function () {
            localStorage.setItem('contentwarning', '');
          },
          onClose: function () {
            localStorage.setItem('contentwarning', 'closed');
          },
          beforeClose: function () {
            return true; // close the modal
          }
        });

        // set content
        warning.setContent(settings.contentwarning.content);
        warning.checkOverflow(); //for mobiles

        // add the button
        warning.addFooterBtn('Continue to website', 'tingle-btn tingle-btn--pull-right button', function () {
          warning.close();
        });
        warning.addFooterBtn('Another button', 'tingle-btn tingle-btn--pull-right button-light', function () {
          warning.close();
        });

        // Show the message if the user hasn't seen it before, or if the user isn't logged in (is anon)
        if ((typeof (Storage) !== 'undefined') && (localStorage.getItem('contentwarning') != 'closed') && !settings.contentwarning.loggedIn) {
          warning.open();
        }
      }
    };
})(jQuery);