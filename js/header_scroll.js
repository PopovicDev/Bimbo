let header = document.getElementById('header');
let header_logo = header.getElementsByClassName('header-logo')[0];
let burger_icon = header.getElementsByClassName('burger-checkbtn')[0];
let cart_icon = header.getElementsByClassName('cart-checkbtn')[0];
let header_shop = document.getElementById('header-shop');
let header_about = document.getElementById('header-about');
let header_contact = document.getElementById('header-contact');
let cart_number = document.getElementById('cart-item-num');
let header_menu = document.getElementsByClassName('menu')[0];
let page = window.location.pathname.split("/").pop();
window.onload = function(){
        input.value = 0;
        if(page == "shop.html" || page == "cutting_boards.html" || page == "board1.html"){
                cart_number.style.color = 'var(--br)'
        }
        if(window.innerWidth < 768){
                header_menu.style.backgroundColor = 'var(--bg)';
        }
        info1.style.display = 'block';
        document.documentElement.style.setProperty('--vision1', "block");
}

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
        if(page == "shop.html" || page == "cutting_boards.html" || page == "board1.html"){
                cart_number.style.color = 'var(--bg)';
                if(window.innerWidth < 768){
                        header_menu.style.backgroundColor = 'var(--w)';
                }
        }
}

function WhiteStyle(){
        header.style.backgroundColor = 'unset';
        header_logo.style.color = 'var(--w)';
        burger_icon.style.color = 'var(--w)';
        cart_icon.style.color = 'var(--w)';
        header_shop.style.color = 'var(--w)';
        header_about.style.color = 'var(--w)';
        header_contact.style.color = 'var(--w)';
        if(page == "shop.html" || page == "cutting_boards.html" || page == "board1.html"){
                cart_number.style.color = 'var(--br)';
                if(window.innerWidth < 768){
                        header_menu.style.backgroundColor = 'var(--bg)';
                }
        }
}