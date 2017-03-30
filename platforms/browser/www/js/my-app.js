var myApp = new Framework7();
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: false
});

$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

myApp.onPageInit('index', function (page) {
})

myApp.onPageInit('about', function (page) {

})

myApp.onPageInit('sign_up', function (page) {
})

myApp.onPageInit('product_list', function (page) {
})

myApp.onPageInit('product', function (page) {
	var product_id = page.query.product_id;
	console.log(product_id);
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
