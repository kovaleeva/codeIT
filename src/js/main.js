'use strict';

// require("jsdom").env("", function(err, window) {
//     if (err) {
//         console.error(err);
//         return;
//     }
//
//     var $ = require("jquery")(window);
// });
//
// function validate(form) {
//
//
// }

// function loadData() {
//
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', 'http://codeit.pro/frontTestTask/user/registration', false);
//     xhr.send();
//     alert(xhr.responseText);
//     console.log(xhr.responseText);
// };

(function () {
    let app = {
        initialize: function () {
            this.modules();
            this.setUpListeners();
            this.validateForm();
        },

        modules: function () {

        },
        setUpListeners: function () {
            $('form').on('submit', app.submitForm);
        },
        submitForm: function (e) {
            e.preventDefault();
            console.log('submit');
        },
        validateForm: function (form) {
            let inputs = form.find('input');
            $.each(inputs, function (index, val) {
                let input = $(val),
                    value = input.val(),
                    formGroup = input.parents('.input-group');

            });
        }
    };
    app.initialize();

})();