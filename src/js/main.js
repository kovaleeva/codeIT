'use strict';

$(document).ready(function () {
    // $('input[type="submit"]').prop('disabled', true);



    let signUp = function () {
        $.ajax({
            type: 'POST',
            url: 'http://codeit.pro/frontTestTask/user/registration',
            data: $("#reg").serialize(),
            success: function (data) {
                console.log(data);
                // if (data.status === 'OK') {
                //     window.location.href = 'companies.html'
                // }
                // else {
                //     alert(data.message)
                // }
            }
        });
    };

    jQuery.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || /^[a-z]+$/i.test(value);
    }, "Letters only please");

    var form = $("#reg");
    form.validate({

        rules: {
            name: {
                required: true,
                minlength: 1,
                lettersonly: true
            },

            surname: {
                required: true,
                minlength: 1
            },
            email: {
                required: true,
                email: true
            },
            gender: {
                required: true
            },
            pass: {
                required: true,
                minlength: 6,
                maxlength: 10
            },
            checkbox: {
                required: true
            }
        }

    });

    $('sign-up-submit').on('click', function () {
        if (form.valid()) {
            signUp();
        }
    });
});
