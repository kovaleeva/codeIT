'use strict';

function loadData() {
    var msg   = $('reg').serialize();
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

$(document).ready(function(){
    $('input[type="submit"]').prop('disabled', true);

    $("button").click(function(){
        $.post("demo_test_post.asp",
            {
                name: "Donald Duck",
                city: "Duckburg"
            },
            function(data,status){
                alert("Data: " + data + "\nStatus: " + status);
            });
    });
});