let cart_check = document.getElementById('cart-check');
let cart = document.getElementById('cart');
let checkout = document.getElementById('shopping-cart');
let save_info = document.getElementById('save-info');
let cancel_info = document.getElementById('cancel');
let index = 0;
let inputs = [
    document.getElementById('first-name'),
    document.getElementById('last-name'),
    document.getElementById('phone-number'),
    document.getElementById('e-mail'),
    document.getElementById('address'),
    document.getElementById('home-number'),
    document.getElementById('city'),
    document.getElementById('postal-code')
]

function AddToCart(button){
    index++;
    let product = {
        name: button.parentElement.getElementsByTagName('h1')[0].innerHTML,
        price: button.parentElement.getElementsByTagName('h2')[0].innerHTML.split('€')[0],
        quantity: input.value
    }
    localStorage.setItem(`${product.name + index}`, JSON.stringify(product));
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
        <a href="../pages/checkout.html"><button id="my-cart">CHECKOUT</button></a>
    </div>
    `;
}

function CheckOutTotal(total){
    checkout.innerHTML += `
    <div class="checkout-cart-total">
        <h1>Total: ${total}€</h1>
        <a href="../pages/checkout.html"><button id="checkout-my-cart">PROCEED</button></a>
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
    let index = products.indexOf("shipping");
    if (index > -1) {
        cart_number.innerHTML = `${localStorage.length - 1}`;
        products.splice(index, 1);
    }
    else{
        cart_number.innerHTML = `${localStorage.length}`;
    }
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
    Total(total_price);
}

function ShowCart(element){
    if(element.dataset.state1 == 'off'){
        cart.style.display = "flex";
        element.dataset.state1 = 'on';
    }
    else{
        cart.style.display = "none";
        element.dataset.state1 = 'off';
    }
}

function CheckOut(){
    checkout.innerHTML = '';
    let total_price = 0;
    let products = [];
    Object.keys(localStorage).forEach((element)=>{
        products.push(element);
     });
    let index = products.indexOf("shipping");
    if (index > -1) {
        products.splice(index, 1);
    }
    products.forEach((element)=>{
        checkout.innerHTML += `
            <div id="checkout-product">
                <div class="checkout-product-info">
                    <h3>${JSON.parse(localStorage.getItem(element)).name}</h3>
                    <h3>${parseInt(JSON.parse(localStorage.getItem(element)).quantity) * parseInt(JSON.parse(localStorage.getItem(element)).price)}€ <br>(${JSON.parse(localStorage.getItem(element)).quantity} * ${JSON.parse(localStorage.getItem(element)).price}€)</h3>
                </div>
                <img src="../images/${JSON.parse(localStorage.getItem(element)).name.split(" ")[0].toLowerCase()}_board.png" class="checkout-product-picture"></img>
                <div class="checkout-product-interact">
                    <h3 onclick="RemoveFromCart('${element}'); CheckOut();">X</h3>
                    <a href="../pages/${JSON.parse(localStorage.getItem(element)).name.split(" ")[0].toLowerCase()}_board.html">See more</a>
                </div>
            </div>`;
            total_price += parseInt(JSON.parse(localStorage.getItem(element)).quantity) * parseInt(JSON.parse(localStorage.getItem(element)).price);
     })
     CheckOutTotal(total_price);
     LoadShippingAddress();
}

save_info.onclick = () => {
    let shipping = {
        firstname:document.getElementById('first-name').value,
        lastname:document.getElementById('last-name').value,
        phonenumber:document.getElementById('phone-number').value,
        email:document.getElementById('e-mail').value,
        address:document.getElementById('address').value,
        homenumber:document.getElementById('home-number').value,
        city:document.getElementById('city').value,
        postal:document.getElementById('postal-code').value
    }
    localStorage.setItem("shipping", JSON.stringify(shipping));
    save_info.innerHTML = "Saved!";
    setTimeout(() => {
        save_info.innerHTML = "Save and Deliver Here";
    }, 2000);
}

cancel_info.onclick = () => {
    localStorage.removeItem("shipping");
    LoadShippingAddress();
}

function LoadShippingAddress(){
    if(localStorage.getItem("shipping") != null){
        inputs.forEach((element)=>{
            element.value = JSON.parse(localStorage.getItem("shipping"))[`${element.name}`];
        })
    }
    else{
        inputs.forEach((element)=>{
            element.value = "";
        })
    }
}

