"use strict";


// NEWS
//
$.getJSON('http://codeit.pro/frontTestTask/news/getList',
    function (news) {

        let carouselInner = $('.carousel-inner'),
            carouselIndicator = $('.carousel-indicators');

        for (var i = 0; i < news['list'].length; i++) {

            if (i === 0) {
                carouselInner.append('<div class="item active" id=' + i + '></div>');
                carouselIndicator.append('<li class="active"data-target="#myCarousel" data-slide-to="' + i + '"></li>');
            }
            else {
                carouselInner.append('<div class="item" id=' + i + '></div>');
                carouselIndicator.append('<li class="" data-target="#myCarousel" data-slide-to="' + i + '"></li>');
            }
            let item = $('#' + i);

            let date = new Date(news['list'][i].date * 1000);

            let convertDate = function (date) {
                let month = date.getMonth() + 1,
                    year = date.getFullYear(),
                    day = date.getDate();
                if (month < 10) month = "0" + month;
                return day + "." + month + "." + year;
            };

            let textShort = function (str) {
                let maxLength = 200;
                return (str.length > maxLength) ? str.slice(0, maxLength) + '...' : str;
            };
            let desk = textShort(news['list'][i].description);


            item.append('<div class="item active"><div class="row">'
                + '<div class="col-sm-4 col-xs-12">'
                + '<img class="image" src="' + news['list'][i].img + '"></div>'
                + '<div class="col-sm-7 col-xs-12">'
                + '<h4><a href="' + news['list'][i].link + '">'
                + news['list'][i].author + '</a></h4>'
                + '<p>' + desk + '</p>'
                + '</div>'
                + '</div>'
                + '<strong>Author: </strong><em>' + news['list'][i].author + '</em></br>'
                + '<strong>Public: </strong><em id="date">' + convertDate(date) + '</em>'
                + '</div>');
        }
    });

$.getJSON('http://codeit.pro/frontTestTask/company/getList',
    function (company) {
        let companylist = company['list'];
        let companies = $('.list-group');
        let totalNumber = $('#totalCompanies');

        totalNumber.append(companylist.length);

        for (var i = 0; i < companylist.length; i++) {
            companies.append('<li class="list-group-item company">' + companylist[i].name + '</li>');

        }
        // PARTNENRS

        $('.company').on('click', function (e) {
            let partnersBlock = $('.partnersBlock'),
                partners = $('.partners').empty();

            partnersBlock.removeClass('hidden');
            // partnersBlock.toggleClass('active');
            // $(this).toggleClass('active');

            let inner = this.innerHTML;
            for (var i = 0; i < companylist.length; i++) {
                var comp = companylist[i];

                if (inner == comp.name) {
                    for (var j = 0; j < comp.partners.length; i++) {
                        let content = comp.partners[j].name;
                        let value = comp.partners[j].value;
                        partners.append(content + ' ' + value);
                    }
                }
            }
        });

    });
