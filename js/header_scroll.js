let header = document.getElementById('header');
let header_logo = header.getElementsByClassName('header-logo')[0];
let burger_icon = header.getElementsByClassName('burger-checkbtn')[0];
let cart_icon = header.getElementsByClassName('cart-checkbtn')[0];
let header_shop = document.getElementById('header-shop');
let header_about = document.getElementById('header-about');
let header_contact = document.getElementById('header-contact');
let cart_number = document.getElementById('cart-item-num');
let header_menu = document.getElementsByClassName('menu')[0];
let cart = document.getElementById('cart');
let page = window.location.pathname.split("/").pop();
let page_regex = /board/;

window.addEventListener('load', ()=>{
        LoadCart();
        switch(page){
                case "shop.html":
                        header.style.backgroundColor = 'var(--g)';
                        break;
                case "cutting_boards.html":
                        header.style.backgroundColor = 'var(--g)';
                        break;
        }
        if(page.match(page_regex)){
                header.style.backgroundColor = 'var(--g)';
        }
        cart_number.innerHTML = `${localStorage.length}`;
        input.value = 1;
        if(window.innerWidth < 768){
                header_menu.style.backgroundColor = 'var(--bg)';
        }
        info1.style.display = 'block';
        document.documentElement.style.setProperty('--vision1', "block");
})

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
        if(page == "shop.html" || page == "cutting_boards.html" || page.match(page_regex)){
                header.style.backgroundColor = 'var(--g)';
                header_logo.style.color = 'var(--w)';
                burger_icon.style.color = 'var(--w)';
                cart_icon.style.color = 'var(--w)';
                header_shop.style.color = 'var(--w)';
                header_about.style.color = 'var(--w)';
                header_contact.style.color = 'var(--w)';
                if(window.innerWidth < 768){
                        header_menu.style.backgroundColor = 'var(--g)';
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
        if(page == "shop.html" || page == "cutting_boards.html" || page.match(page_regex)){
                header.style.backgroundColor = 'var(--g)';
                header_logo.style.color = 'var(--w)';
                burger_icon.style.color = 'var(--w)';
                cart_icon.style.color = 'var(--w)';
                header_shop.style.color = 'var(--w)';
                header_about.style.color = 'var(--w)';
                header_contact.style.color = 'var(--w)';
                if(window.innerWidth < 768){
                        header_menu.style.backgroundColor = 'var(--g)';
                }
        }
}