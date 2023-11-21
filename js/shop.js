let cart_check = document.getElementById('cart-check');
let cart = document.getElementById('cart');

function AddToCart(button){
    let product = {
        name: button.parentElement.getElementsByTagName('h1')[0].innerHTML,
        price: button.parentElement.getElementsByTagName('h2')[0].innerHTML.split('€')[0],
        quantity: input.value
    }
    localStorage.setItem(`${product.name}`, JSON.stringify(product));
    cart.innerHTML = ``;
    LoadCart();
}

function RemoveFromCart(item){
    localStorage.removeItem(`${item}`);
    LoadCart();
}

function Total(total){
    cart.innerHTML += `
    <div class="cart-total">
        <h1>Total: ${total}€</h1>
        <button id="my-cart">MY CART</button>
    </div>
    `;
}

function LoadCart(){
    cart.innerHTML = '';
    let total_price = 0;
    let products = [];
    Object.keys(localStorage).forEach((element)=>{
        products.push(element);
     });
     products.forEach((element)=>{
        cart.innerHTML += `
            <div id="product">
                <div class="product-info">
                    <h3>${JSON.parse(localStorage.getItem(element)).name}</h3>
                    <h3>${parseInt(JSON.parse(localStorage.getItem(element)).quantity) * parseInt(JSON.parse(localStorage.getItem(element)).price)}€ (${JSON.parse(localStorage.getItem(element)).quantity} * ${JSON.parse(localStorage.getItem(element)).price}€)</h3>
                </div>
                <img src="../images/${JSON.parse(localStorage.getItem(element)).name.split(" ")[0].toLowerCase()}_board.png" class="product-picture"></img>
                <div class="product-interact">
                    <h3 onclick="RemoveFromCart('${element}')">X</h3>
                    <a href="../pages/${JSON.parse(localStorage.getItem(element)).name.split(" ")[0].toLowerCase()}_board.html">See more</a>
                </div>
            </div>`;
            total_price += parseInt(JSON.parse(localStorage.getItem(element)).quantity) * parseInt(JSON.parse(localStorage.getItem(element)).price);
     })
    cart_number.innerHTML = `${localStorage.length}`;
    Total(total_price);
}

function ShowCart(element){
    if(element.dataset.state1 == 'off'){
        cart.style.display = "flex";
        element.dataset.state1 = 'on';
        console.log(element.dataset.state1)
    }
    else{
        cart.style.display = "none";
        element.dataset.state1 = 'off';
        console.log(element.dataset.state1)
    }
}