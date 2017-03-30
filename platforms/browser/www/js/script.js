var base_url = 'http://kreaserv-tech.com/asset-pie/index.php/krunal_api/';
function login(){
    if (!$("#login_username").val() && $("#login_password").val()) {
        myApp.alert('Please enter username and password to proceed.');
    } else {
        $.ajax({
            url: base_url+'signin',
            type: 'POST',
            crossDomain: true,
            data: {
                username: $("#login_username").val(), password: $("#login_password").val(),
            }
        }).done(function(res){
            console.log(res);
            if (res.status == 'success') {
                mainView.router.load({
                    url: 'product_list.html',
                    ignoreCache: false,
                });
            } else if (res.status == 'failed') {
                myApp.alert(res.msg);
            }
        }).error(function(){
            myApp.alert('I think you loose your Internet connection, Get connected and again later.');
        })
    }
}

function register(){
    if ($("#register_cpassword").val() != $("#register_password").val()) {
        myApp.alert('Password Mismatch, Please confirm your correct password you are willing set.');
    } else if (!$("#register_username").val() && !$("#register_name").val() && !$("#register_phone").val() && !$("#register_address").val()) {
        myApp.alert('We will require all the your all the details to create your account.');
    } else {
        $.ajax({
            url: base_url+'signup',
            type: 'POST',
            crossDomain: true,
            data: {
                username: $("#register_username").val(), password: $("#register_password").val(), name: $("#register_name").val(), contact_no: $("#register_phone").val(), address: $("#register_address").val()
            }
        }).done(function(res){
            console.log(res);
            if (res.status == 'success') {
                mainView.router.load({
                    url: 'product_list.html',
                    ignoreCache: false,
                });
            } else if (res.status == 'failed') {
                myApp.alert(res.msg);
            }
        }).error(function(){
            myApp.alert('I think you loose your Internet connection, Get connected and again later.');
        })
    }
}

$(".back").click(function(){
	console.log("backbutton Clicked");
	$('.navbar').show();
})


function load_product(id){
    mainView.router.load({
        url: 'product.html',
        ignoreCache: false,
        query: {
            product_id: id,
        },
    });
}

function showQuantity(value) {
    console.log(value);
    $(".quantity_count").html(value);
}