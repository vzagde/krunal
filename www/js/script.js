
function login(){
    mainView.router.load({
        url: 'product_list.html',
        ignoreCache: false,
    });
}

function register(){
    mainView.router.load({
        url: 'product_list.html',
        ignoreCache: false,
    });
}

$(".back").click(function(){
	console.log("backbutton Clicked");
	$('.navbar').show();
})