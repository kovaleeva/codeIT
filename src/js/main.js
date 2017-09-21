'use strict';

function loadData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://codeit.pro/frontTestTask/user/registration', false);
    xhr.send();
    alert(xhr.responseText);

}