function AddToCart(button){
    let product = {
        name: button.parentElement.getElementsByTagName('h1')[0].innerHTML,
        price: button.parentElement.getElementsByTagName('h2')[0].innerHTML.split('€')[0],
        quantity: input.value
    }
    localStorage.setItem("product" + localStorage.length, JSON.stringify(product));
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
        <h1>Total: ${total}</h1>
        <button id="my-cart">MY CART</button>
    </div>
    `;
}

function LoadCart(){
    cart.innerHTML = '';
    let total_price = 0;
    if(localStorage.length >= 1){
        for(let p = parseInt(localStorage.key(0).split("product")[1]); p < localStorage.length; p++){
            cart.innerHTML += `
            <div id="product">
                <div class="product-info">
                    <h3>${JSON.parse(localStorage.getItem("product"+p)).name}</h3>
                    <h3>${parseInt(JSON.parse(localStorage.getItem("product"+p)).quantity) * parseInt(JSON.parse(localStorage.getItem("product"+p)).price)}$ (${JSON.parse(localStorage.getItem("product"+p)).quantity} * ${JSON.parse(localStorage.getItem("product"+p)).price})</h3>
                </div>
                <div class="product-interact">
                    <h3 onclick="RemoveFromCart('${"product"+p}')">X</h3>
                    <a href="../pages/${JSON.parse(localStorage.getItem("product"+p)).name.split(" ")[0].toLowerCase()}_board.html">See more</a>
                </div>
            </div>`;
            total_price += parseInt(JSON.parse(localStorage.getItem("product"+p)).quantity) * parseInt(JSON.parse(localStorage.getItem("product"+p)).price);
        }
    }
    cart_number.innerHTML = `${localStorage.length}`;
    Total(total_price);
}