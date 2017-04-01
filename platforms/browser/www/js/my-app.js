var myApp = new Framework7();
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: false
});

var base_url = 'http://kreaserv-tech.com/asset-pie/index.php/krunal_api/';
var img_url = 'http://kreaserv-tech.com/asset-pie/assets/uploads/krunal_app_uploads/';

$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

myApp.onPageInit('index', function (page) {
})

myApp.onPageInit('about', function (page) {

})

myApp.onPageInit('profile', function (page) {
    myApp.showIndicator();
    $("#list_orders").empty();
    $.ajax({
        url: base_url+'get_profile_data',
        type: 'POST',
        crossDomain: true,
        data: {
            id: $(".profile_id").data('userid'),
        }
    }).done(function(res){
        if (res.status == 'success') {
            $("#profile_name").val(res.user_data.name);
            $("#profile_username").val(res.user_data.username);
            $("#profile_phone").val(res.user_data.contact_no);
            $("#profile_address").val(res.user_data.address);
            var html = '';
            if (res.order_details != 'No Data') {
                $.each(res.order_details, function(index, value){
                    html += '<li class="item-content">'+
                                    '<div class="item-media">'+
                                        '<img src="'+img_url+value.product_img+'" width="44">'+
                                    '</div>'+
                                    '<div class="item-inner">'+
                                        '<div class="item-title-row">'+
                                            '<div class="item-title">'+value.product_name+'</div>'+
                                        '</div>'+
                                        '<div class="item-subtitle">'+value.order_no+'</div>'+
                                    '</div>'+
                                '</li>';
                })
                $("#list_orders").html(html);
            } else {
                html = "<li class='item-content'>You haven't yet placed any order.</li>";
                $("#list_orders").html(html);
            }
            myApp.hideIndicator();
        } else {
            $("#profile_name").val('');
            $("#profile_username").val('');
            $("#profile_phone").val('');
            $("#profile_address").val('');
            myApp.hideIndicator();
            myApp.alert(res.msg);
        }
    }).error(function(){
        myApp.hideIndicator();
        myApp.alert('I think you loose your Internet connection, Get connected and again later.');
    })
})


myApp.onPageInit('sign_up', function (page) {
})

myApp.onPageInit('product_list', function (page) {
    myApp.showIndicator();
    $.ajax({
        url: base_url+'get_product_listing',
        type: 'POST',
        crossDomain: true,
    }).done(function(res){
        console.log(res);
        if (res.status == 'success') {
            $("#product_listing").empty();
            var html = '';
            $.each(res.data, function(index, value){
                html += '<li>'+
                            '<a href="#" class="item-link item-content product_info" onclick="load_product('+value.id+')">'+
                                '<div class="item-media"><img src="'+img_url+value.product_img+'" width="80"></div>'+
                                '<div class="item-inner">'+
                                    '<div class="item-title-row">'+
                                        '<div class="item-title">'+value.product_name+'</div>'+
                                        '<div class="item-after">'+value.prise+'</div>'+
                                    '</div>'+
                                    '<div class="item-subtitle">'+value.category+'</div>'+
                                    '<div class="item-text">'+value.product_description+'</div>'+
                                '</div>'+
                            '</a>'+
                        '</li>';
            });
            $("#product_listing").html(html);
            myApp.hideIndicator();
        } else if (res.status == 'failed') {
            myApp.hideIndicator();
            myApp.alert(res.msg);
        }
    }).error(function(){
        myApp.hideIndicator();
        myApp.alert('I think you loose your Internet connection, Get connected and again later.');
    })
})

myApp.onPageInit('product', function (page) {
	var product_id = page.query.product_id;
    $(".product_dynamic").empty();
    $.ajax({
        url: base_url+'get_product_details',
        type: 'POST',
        crossDomain: true,
        data: {
            id: product_id,
        }
    }).done(function(res){
        console.log(res);
        if (res.status == 'success') {
            var html =  '<div style="background-image:url('+img_url+res.data.product_img+')" valign="bottom" class="card-header color-white no-border">'+res.data.product_name+'</div>'+
                        '<div class="card-content">'+
                          '<div class="card-content-inner">'+
                            '<p>'+res.data.product_description+'</p>'+
                            '<p class="color-gray">Category: '+res.data.category+'</p>'+
                            '<p>Prise: '+res.data.prise+'</p>'+
                          '</div>'+
                        '</div>'+
                        '<div class="card-footer">'+
                          '<a href="#" data-popup=".popup-purchase" class="open-popup" class="link">Buy</a>'+
                        '</div>';
            $(".product_dynamic").html(html);
            $("#product_id").val(res.data.id);
            $("#product_name").val(res.data.product_name);
        } else if (res.status == 'failed') {
            $(".product_dynamic").html("Couldn't get data for you, Please try again later.");
            myApp.alert(res.msg);
        }
    }).error(function(){
        $(".product_dynamic").html("Couldn't get data for you, Please try again later.");
        myApp.alert('I think you loose your Internet connection, Get connected and again later.');
    })	
})

$$(document).on('pageInit', function (e) {
    // $('.navbar').show();
    var page = e.detail.page;
    if (page.name === 'about') {
        // myApp.alert('Here comes About page');
    }
})

$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // myApp.alert('Here comes About page');
})
