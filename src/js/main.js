'use strict';

$(document).ready(function () {
    // $('input[type="submit"]').prop('disabled', true);


    let signUp = function () {

        $.ajax({
            method: "POST",
            url: "http://codeit.pro/frontTestTask/user/registration",
            data: {
                name: $("input[name='name']").val(),
                secondname: $("input[name='secondname']").val(),
                email: $("input[name='email']").val(),
                gender: $("input[name='gender']").val(),
                pass: $("input[name='pass']").val()
            },
            success: function (data) {
                if (data.status === 'OK') {
                    window.location.href = 'companies.html';
                }
                else {
                    alert(data.message);
                }
            }
        });
    };

    jQuery.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || /^[a-z]+$/i.test(value);
    }, "Letters only please");

    $("#reg").validate({

        rules: {
            name: {
                required: true,
                minlength: 3,
                maxlength: 60,
                lettersonly: true
            },

            secondname: {
                required: true,
                minlength: 3,
                maxlength: 60
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
                minlength: 6
            },
            checkbox: {
                required: true
            }
        }
    });
    $('.sign-up-submit').on('submit', signUp);
});
