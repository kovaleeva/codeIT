'use strict';

$(document).ready(function(){
    // $('input[type="submit"]').prop('disabled', true);
    let signUp = function () {

        $.ajax({
            type: 'POST',
            url: 'http://codeit.pro/frontTestTask/user/registration',
            data: msg,
            success: function (data) {

            },
            error: function (xhr, str) {

            }
        })
    };

    $('sign-up-submit').on('click', function () {
        signUp();
    });
});