"use strict";

$(document).ajaxStart(function(){
    $(".stillLoad").css("display", "block");
    $(".itemContent").css("display", "none");
});
$(document).ajaxComplete(function(){
    $(".stillLoad").css("display", "none");
    $(".itemContent").css("display", "block");
});

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
        let companylist = company['list'],
            companies = $('#allCompanies'),
            totalNumber = $('#totalCompanies');

        totalNumber.append(companylist.length);

        for (var i = 0; i < companylist.length; i++) {
            companies.append('<li class="list-group-item company">' + companylist[i].name + '</li>');
        }
        // PARTNENRS

        $('.company').on('click', function (e) {
            let partnersBlock = $('.partnersBlock'),
                partners = $('.partners').empty(),
                inner = this.innerHTML;

            partnersBlock.removeClass('hidden');
            // partnersBlock.toggleClass('active');
            // $(this).toggleClass('active');

            for (var i = 0; i < companylist.length; i++) {
                let comp = companylist[i];
                if (inner == comp.name) {
                    // let $a = comp['partners'];
                    //     $a.each(function() {
                    //         let content = $a.name;
                    //         let value = $a.value;
                    //         partners.append('<li><div>' + content + '</div><div class="companyPercent">' + value + '%</div></li>');
                    //     });

                    for (var j = 0; j < comp.partners.length; j++) {
                        let content = comp.partners[j].name;
                        let value = comp.partners[j].value;
                        partners.append('<li class="list-group-item justify-content-between">' + content + '<span class="companyPercent badge badge-default badge-pill">' + value + '%</span></li>');
                    }
                }
            }

            sortPercent();
        });

        // sort by name
        $('#sortName').on('click', function () {
            let $elements = $('.partners li'),
                $target = $('.partners');

            $elements.sort(function (a, b) {
                let an = $(a).text(),
                    bn = $(b).text();

                return (an && bn) ? an.toUpperCase().localeCompare(bn.toUpperCase()) : 0;
            });

            $elements.detach().appendTo($target);
        });

        // sort percentage from high to small
        let sortPercent = function () {
            let item = $('.partners li'),
                partners = $('.partners').empty();
            item.each(function () {
                let i0 = $(this).text().replace(/\D+/g, "");
                $(this).attr("id", i0);
            });
            let variable = false;
            $(item).sort(function (a, b) {
                return (variable == (parseInt(b.id)) < parseInt(a.id)) ? 1 : -1;
            }).each(function () {
                var elem = $(this);
                elem.remove();
                $(elem).appendTo(partners);
            });
            variable = variable ? false : true;

        };

        $('#sortPercent').on('click', function () {
            sortPercent();
        });

        // Unique countries
        let arr = [];
        for (var i = 0; i < companylist.length; i++) {
            arr.push(companylist[i].location);
        }

        let uniqBy = function (a, key) {
            var seen = {};
            return a.filter(function (item) {
                var k = key(item);
                return seen.hasOwnProperty(k) ? false : (seen[k] = true);
            })
        };

        let uniq = uniqBy(arr, JSON.stringify);
        uniq.forEach(function (item, i, un) {
            uniq[i].num = 0;
            arr.forEach(function (it, j, ar) {
                if (arr[j].name == uniq[i].name) {
                    uniq[i].num++;
                }
            });
            let legend = $('#companiesHere'),
                compHere = uniq[i],
                locationCountry = compHere.name,
                locationNumber = compHere.num;
            legend.append('<li class="list-group-item justify-content-between" id="' + locationCountry + '">' + locationCountry + '<span class="companyPercent badge badge-default badge-pill">' + locationNumber + '</span></li>');
            // console.log(compHere.name);

            // Close/open location
            $('#' + locationCountry).on('click', function () {
                $('#location').toggleClass('hidden');
                $('#showChart').toggleClass('hidden');
                $('#companiesInCountry').removeClass('hidden');

                getCoutries(this.id);
                // console.log(this.id);
            });

            // Get companies in this locationCountry
            let getCoutries = function (where) {
                let companiesInCountry = $('#companiesInCountry');
                for (var i = 0; i < companylist.length; i++) {
                    if (where == companylist[i].location.name) {
                        companiesInCountry.append('<li class="list-group-item justify-content-between">' + companylist[i].name + '</li>');
                    }
                }
            };


            // Close button
            $('#showChart').on('click', function () {
                $('#location').removeClass('hidden');
                $('#showChart').addClass('hidden');
                $('#companiesInCountry').addClass('hidden').empty();

            });

            // Chart donut
            google.charts.load("current", {packages: ["corechart"]});
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                let array = [
                    ['Country', 'Number of companies']
                ];
                uniq.forEach(function (item, i, un) {
                    let temp = [];
                    temp.push(uniq[i].name);
                    temp.push(uniq[i].num);
                    array.push(temp);
                });
                // console.log(array);
                // console.log(uniq);
                var data = google.visualization.arrayToDataTable(array);

                var options = {
                    pieHole: 0.5,
                    legend: 'none'
                    // pieSliceText: 'label'
                };

                var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
                chart.draw(data, options);
            };
        })

    });