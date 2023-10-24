let header = document.getElementById('header');
let header_logo = header.getElementsByClassName('header-logo')[0];
let burger_icon = header.getElementsByClassName('burger-checkbtn')[0];
let cart_icon = header.getElementsByClassName('cart-checkbtn')[0];
let header_shop = document.getElementById('header-shop');
let header_about = document.getElementById('header-about');
let header_contact = document.getElementById('header-contact');

window.onscroll = function(){
	if(window.pageYOffset > 50){
        GreenStyle();
	}
	else{
        WhiteStyle();
	}
}

function GreenStyle(){
        header.style.backgroundColor = 'var(--w)';
        header_logo.style.color = 'var(--g)';
        burger_icon.style.color = 'var(--g)';
        cart_icon.style.color = 'var(--g)';
        header_shop.style.color = 'var(--g)';
        header_about.style.color = 'var(--g)';
        header_contact.style.color = 'var(--g)';
}

function WhiteStyle(){
        header.style.backgroundColor = 'unset';
        header_logo.style.color = 'var(--w)';
        burger_icon.style.color = 'var(--w)';
        cart_icon.style.color = 'var(--w)';
        header_shop.style.color = 'var(--w)';
        header_about.style.color = 'var(--w)';
        header_contact.style.color = 'var(--w)';
}