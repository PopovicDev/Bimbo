let cart_check = document.getElementById('cart-check');
let cart = document.getElementById('cart');
let checkout = document.getElementById('shopping-cart');
let save_info = document.getElementById('save-info');
let cancel_info = document.getElementById('cancel');
let credit_card = document.getElementById('card');
let cash_on_delivery = document.getElementById('cash-on-delivery');
let proceed;
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
    let product = {
        name: button.parentElement.getElementsByTagName('h1')[0].innerHTML,
        price: button.parentElement.getElementsByTagName('h2')[0].innerHTML.split('€')[0],
        quantity: input.value
    }
    index++;
    localStorage.setItem(`${product.name + index}`, JSON.stringify(product));
    cart.innerHTML = ``;
    LoadCart();
}

function RemoveFromCart(item){
    localStorage.removeItem(`${item}`);
    LoadCart();
}

function Total(total){
    if(page != "index.html"){
        cart.innerHTML += `
    <div class="cart-total">
        <h1>Total: ${total}€</h1>
        <a href="../pages/checkout.html"><button id="my-cart">CHECKOUT</button></a>
    </div>
    `;
    }
    else{
        cart.innerHTML += `
    <div class="cart-total">
        <h1>Total: ${total}€</h1>
        <a href="./pages/checkout.html"><button id="my-cart">CHECKOUT</button></a>
    </div>
    `;
    }
}

function CheckOutTotal(total){
    checkout.innerHTML += `
    <div class="checkout-cart-total">
        <h1>Total: ${total}€</h1>
        <a href="#"><button id="checkout-my-cart" onclick="ProceedCheck();">PROCEED</button></a>
    </div>
    `;
    proceed = document.getElementById('checkout-my-cart');
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
    let b = false;
    inputs.forEach((element)=>{
        if(element.value == ""){
            element.style.border = '1px solid red';
            element.nextElementSibling.innerHTML = "Ovo polje je obavezno!";
            b = true;
        }
    })
    if(b == false){
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
        ProceedCheck();
    }
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
    ProceedCheck();
}

inputs[0].addEventListener("focusout", () => {
    let firstNameRegex = /^[a-zA-Z]{3,30}$/;
    if(inputs[0].value.match(firstNameRegex)){
        inputs[0].style.border = '1px solid black';
        inputs[0].nextElementSibling.innerHTML = "";
    }
    else{
        inputs[0].style.border = '1px solid red';
        inputs[0].nextElementSibling.innerHTML = "Netacan unos!<br>Minimum 3 karatera, maksimum 30 karaktera, bez brojeva i karaktera!";
    }
})

inputs[1].addEventListener("focusout", () => {
    let firstNameRegex = /^[a-zA-Z]{3,30}$/;
    if(inputs[1].value.match(firstNameRegex)){
        inputs[1].style.border = '1px solid black';
        inputs[1].nextElementSibling.innerHTML = "";
    }
    else{
        inputs[1].style.border = '1px solid red';
        inputs[1].nextElementSibling.innerHTML = "Netacan unos!<br>Minimum 3 karatera, maksimum 30 karaktera, bez brojeva i karaktera!";
    }
})

inputs[2].addEventListener("focusout", () => {
    let PhoneNumberRegex = /^[1-9][0-9]{7,8}$/;
    if(inputs[2].value.match(PhoneNumberRegex)){
        inputs[2].style.border = '1px solid black';
        inputs[2].nextElementSibling.innerHTML = "";
    }
    else{
        inputs[2].style.border = '1px solid red';
        inputs[2].nextElementSibling.innerHTML = "Netacan unos!<br>Unos treba biti bez pocetne nule, imati od 7 do 8 cifara i treba biti bez razmaka!";
    }
})

inputs[3].addEventListener("focusout", () => {
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(inputs[3].value.match(emailRegex)){
        inputs[3].style.border = '1px solid black';
        inputs[3].nextElementSibling.innerHTML = "";
    }
    else{
        inputs[3].style.border = '1px solid red';
        inputs[3].nextElementSibling.innerHTML = "Netacan unos!<br>Unos treba biti u formatu npr.(johndoe@gmail.com)";
    }
})

inputs[4].addEventListener("focusout", ()=>{
    if(inputs[4].value != ""){
        inputs[4].style.border = '1px solid black';
        inputs[4].nextElementSibling.innerHTML = "";
    }
    else{
        inputs[4].style.border = '1px solid red';
        inputs[4].nextElementSibling.innerHTML = "Netacan unos!<br>";
    }
})

inputs[5].addEventListener("focusout", ()=>{
    let homenumberRegex = /^[0-9]+$/;
    if(inputs[5].value.match(homenumberRegex)){
        inputs[5].style.border = '1px solid black';
        inputs[5].nextElementSibling.innerHTML = "";
    }
    else{
        inputs[5].style.border = '1px solid red';
        inputs[5].nextElementSibling.innerHTML = "Netacan unos!<br>";
    }
})

inputs[6].addEventListener("focusout", ()=>{
    if(inputs[6].value != ""){
        inputs[6].style.border = '1px solid black';
        inputs[6].nextElementSibling.innerHTML = "";
    }
    else{
        inputs[6].style.border = '1px solid red';
        inputs[6].nextElementSibling.innerHTML = "Netacan unos!<br>";
    }
})

inputs[7].addEventListener("focusout", ()=>{
    let postalRegex = /^\d{5}$/;
    if(inputs[7].value.match(postalRegex)){
        inputs[7].style.border = '1px solid black';
        inputs[7].nextElementSibling.innerHTML = "";
    }
    else{
        inputs[7].style.border = '1px solid red';
        inputs[7].nextElementSibling.innerHTML = "Netacan unos!<br>";
    }
})

credit_card.onclick = () => {
    credit_card.dataset.selected = "true";
    cash_on_delivery.dataset.selected = "false";
    credit_card.innerHTML = "Credit Card " + "<i class='fa-solid fa-check'></i>";
    cash_on_delivery.innerHTML = "Cash On Delivery";
    credit_card.style.border = "1px solid var(--dg)";
    cash_on_delivery.style.border = "none";
}

cash_on_delivery.onclick = () => {
    credit_card.dataset.selected = "false";
    cash_on_delivery.dataset.selected = "true";
    cash_on_delivery.innerHTML = "Cash On Delivery " + "<i class='fa-solid fa-check'></i>";
    credit_card.innerHTML = "Credit Card";
    credit_card.style.border = "none";
    cash_on_delivery.style.border = "1px solid var(--dg)";
}

function ProceedCheck(){
    let b = false;
    inputs.forEach((element)=>{
        if(element.value == ""){
            b = true;
            element.style.border = '1px solid red';
            element.nextElementSibling.innerHTML = "Ovo polje je obavezno!";
            proceed.parentElement.href = "#";
            proceed.setAttribute("disabled", "disabled");
        }
    })
    if((b == false && credit_card.dataset.selected == "true" && cart_number.innerHTML != "0") || (b == false && cash_on_delivery.dataset.selected == "true" && cart_number.innerHTML != "0")){
        proceed.parentElement.href = "../pages/checkout_proceed.html";
        proceed.removeAttribute("disabled");
    }
}

function Proceeded(){
    document.getElementsByTagName('h1')[0].innerHTML = `Vasa narudzbina je pod brojem: XXX, proverite vas e-mail za vise detalja!`;
    let products = [];
    Object.keys(localStorage).forEach((element)=>{
        products.push(element);
     });
    let index = products.indexOf("shipping");
    if (index > -1) {
        products.splice(index, 1);
    }
    products.forEach((element)=>{
        localStorage.removeItem(`${element}`);
    })
}