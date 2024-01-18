let cart_check = document.getElementById('cart-check');
let cart = document.getElementById('cart');
let checkout = document.getElementById('shopping-cart');
let save_info = document.getElementById('save-info');
let cancel_info = document.getElementById('cancel');
let credit_card = document.getElementById('card');
let cash_on_delivery = document.getElementById('cash-on-delivery');
let proceed;
let index = 0;
let rec_id;
let del_id;
let cr_pay = document.getElementById('cr-pay');
let cr_acc = false;
let cr_cardnumber = document.getElementById('card-number');
let cr_cardholder = document.getElementById('card-holder');
let cr_expiry = document.getElementById('expiry');
let cr_cvv = document.getElementById('cvv');
let ar1 = [];
let ar2 = [];
fetch('https://bimbo-company-3e6f6ed5b564.herokuapp.com/api/recipient_id_get').then(response=>response.json()).then(data=>rec_id = data);
fetch('https://bimbo-company-3e6f6ed5b564.herokuapp.com/api/delivery_id_get').then(response=>response.json()).then(data=>del_id = data);
let path = window.location.pathname.split("/").pop();

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
        id: button.parentElement.getElementsByTagName('h1')[0].dataset.id
    }
    for(let prod = 0;prod<input.value;prod++){
        localStorage.setItem(`${product.name + index}`, JSON.stringify(product));
        let lscr = JSON.parse(localStorage.getItem(`${product.name + index}`));
        lscr.index = index;
        localStorage.setItem(`${product.name + index}`, JSON.stringify(lscr));
        index++;
    }
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
    let pre = "";
    if(page == "index.html"){
        pre = ".";
    }
    else{
        pre = "..";
    }
    cart.innerHTML = '';
    let total_price = 0;
    let products = [];
    Object.keys(localStorage).forEach((element)=>{
        products.push(element);
    });
    let index = products.indexOf("recipient_id");
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
                    <h3>${1 * parseInt(JSON.parse(localStorage.getItem(element)).price)}€ (${1} * ${JSON.parse(localStorage.getItem(element)).price}€)</h3>
                </div>
                <img src="${pre}/images/${JSON.parse(localStorage.getItem(element)).name.split(" ")[0].toLowerCase()}_board.webp" class="product-picture"></img>
                <div class="product-interact">
                    <h3 onclick="RemoveFromCart('${element}')">X</h3>
                    <a href="../pages/${JSON.parse(localStorage.getItem(element)).name.split(" ")[0].toLowerCase()}_board.html">See more</a>
                </div>
            </div>`;
            total_price += 1 * parseInt(JSON.parse(localStorage.getItem(element)).price);
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
    checkout.innerHTML = `<div id="checkout-products">`;
    let total_price = 0;
    let products = [];
    Object.keys(localStorage).forEach((element)=>{
        products.push(element);
     });
    let index = products.indexOf("recipient_id");
    if (index > -1) {
        products.splice(index, 1);
    }
    products.forEach((element)=>{
        document.getElementById('checkout-products').innerHTML += `
            <div id="checkout-product">
                <div id="checkout-div">
                    <div class="checkout-product-info">
                        <h3>${JSON.parse(localStorage.getItem(element)).name}</h3>
                        <h3>${1 * parseInt(JSON.parse(localStorage.getItem(element)).price)}€ <br>(${1} * ${JSON.parse(localStorage.getItem(element)).price}€)</h3>
                    </div>
                    <img src="../images/${JSON.parse(localStorage.getItem(element)).name.split(" ")[0].toLowerCase()}_board.webp" class="checkout-product-picture"></img>
                    <div class="checkout-product-interact">
                    <h3 onclick="RemoveFromCart('${element}'); CheckOut();">X</h3>
                    <a href="../pages/${JSON.parse(localStorage.getItem(element)).name.split(" ")[0].toLowerCase()}_board.html">See more</a>
                    </div>
                </div>
                <div id="checkout-ddl">
                    <h3>Size:</h3>
                    <select name="${element}" onchange="Size(this);">
                        <option value="(Small) 20cm x 30cm">(Small) 20cm x 30cm</option>
                        <option value="(Medium) 30cm x 45cm">(Medium) 30cm x 45cm</option>
                        <option value="(Large) 40cm x 60cm">(Large) 40cm x 60cm</option>
                </select>
                </div>
            </div>`;
        total_price += 1 * parseInt(JSON.parse(localStorage.getItem(element)).price);
    })
    CheckOutTotal(total_price);
    LoadShippingAddress();
}

async function LoadShippingAddress(){
    Object.keys(localStorage).forEach((key)=>{
        ar1.push(key);
    });
    let indexx = ar1.indexOf("recipient_id");
    if (indexx > -1) {
        ar1.splice(indexx, 1);
    }
    ar1.forEach((element)=>{
        ar2.push(JSON.parse(localStorage.getItem(`${element}`)));
    });
    ar2.forEach(el=>{
        el.size = '(Small) 20cm x 30cm';
    })
    let inputz;
    if(localStorage.getItem("recipient_id") !== null){
        fetch('https://bimbo-company-3e6f6ed5b564.herokuapp.com/api/get-recid',{
            method:'POST',
            headers:{
                'Access-Control-Allow-Headers' : 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({ recid: localStorage.getItem("recipient_id") })
        })
        .then(response=>{
            if(!response.ok){
                throw new Error(`Error, status: ${response.status}`);
            }
            return response.json();
        })
        .then(data =>{
            console.log('Response from backend:', data);
        })
        .catch(error =>{
            console.error('Error during fetch:', error);
        });
        await fetch('https://bimbo-company-3e6f6ed5b564.herokuapp.com/api/db-fill-SA').then(response=>response.json()).then(data=>inputz = data);
        inputs.forEach((element)=>{
            if(inputz[0][`${element.name}`] == undefined){
                element.value = "";
            }
            else{
                element.value = inputz[0][`${element.name}`];
            }
        })
        inputz = '';
    }
    else{
        localStorage.setItem("recipient_id", rec_id);
        fetch('https://bimbo-company-3e6f6ed5b564.herokuapp.com/api/recipient_id_file_post',{
            method:'POST',
            headers:{
                'Access-Control-Allow-Headers' : 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({ recipient_id: localStorage.getItem("recipient_id") })
        })
        .then(response=>{
            if(!response.ok){
                throw new Error(`Error, status: ${response.status}`);
            }
            return response.json();
        })
        .then(data =>{
            console.log('Response from backend:', data);
        })
        .catch(error =>{
            console.error('Error during fetch:', error);
        });
        inputs.forEach((element)=>{
            element.value = "";
        })
        return;
    }
}

if(path == 'checkout.html'){
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
            fetch('https://bimbo-company-3e6f6ed5b564.herokuapp.com/api/recipient_id_post',{
                method:'POST',
                headers:{
                    'Access-Control-Allow-Headers' : 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    recipientid:localStorage.getItem("recipient_id"),
                    firstname:document.getElementById('first-name').value,
                    lastname:document.getElementById('last-name').value,
                    phonenumber:document.getElementById('phone-number').value,
                    email:document.getElementById('e-mail').value,
                    address:document.getElementById('address').value,
                    homenumber:document.getElementById('home-number').value,
                    city:document.getElementById('city').value,
                    postal:document.getElementById('postal-code').value
                })
            })
            .then(response=>{
                if(!response.ok){
                    throw new Error(`Error, status: ${response.status}`);
                }
                return response.json();
            })
            .then(data =>{
                console.log('Response from backend:', data);
            })
            .catch(error =>{
                console.error('Error during fetch:', error);
            });
            save_info.innerHTML = "Saved!";
            setTimeout(() => {
                save_info.innerHTML = "Save and Deliver Here";
            }, 2000);
        }
    }
    
    cancel_info.onclick = () => {
        fetch('https://bimbo-company-3e6f6ed5b564.herokuapp.com/api/recipient_id_cancel_post',{
            method:'POST',
            headers:{
                'Access-Control-Allow-Headers' : 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({recipientid:localStorage.getItem("recipient_id")})
        })
        .then(response=>{
            if(!response.ok){
                throw new Error(`Error, status: ${response.status}`);
            }
            return response.json();
        })
        .then(data =>{
            console.log('Response from backend:', data);
        })
        .catch(error =>{
            console.error('Error during fetch:', error);
        });
        inputs.forEach(el=>el.value = '');
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
            inputs[2].nextElementSibling.innerHTML = "Netacan unos!<br>Unos treba biti bez pocetne nule, imati od 8 do 9 cifara i treba biti bez razmaka!";
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
        cr_pay.style.display = 'flex';
        cr_pay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    }
    
    cash_on_delivery.onclick = () => {
        credit_card.dataset.selected = "false";
        cash_on_delivery.dataset.selected = "true";
        cash_on_delivery.innerHTML = "Cash On Delivery " + "<i class='fa-solid fa-check'></i>";
        credit_card.innerHTML = "Credit Card";
        credit_card.style.border = "none";
        cash_on_delivery.style.border = "1px solid var(--dg)";
    }
    
    function CreditCancel(){
        cr_pay.style.display = 'none';
    }
    
    function validateCardNumber(cardNumber) {
        var cardNumberError = document.getElementById('card-number-error');
        if (!/^\d{16}$/.test(cardNumber.value)) {
            cardNumberError.textContent = 'Invalid Card Number. Please enter a 16-digit number.';
            cardNumber.style.border = '1px solid red';
        } else {
            cardNumberError.textContent = '';
            cardNumber.style.border = '1px solid black';
        }
    }
    
    function validateExpiryDate(expiryDate) {
        var expiryError = document.getElementById('expiry-error');
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear() % 100;
        var currentMonth = currentDate.getMonth() + 1;
    
        var inputMonth = parseInt(expiryDate.value.substring(0, 2), 10);
        var inputYear = parseInt(expiryDate.value.substring(3, 5), 10);
    
        if (
            !/^\d{2}\/\d{2}$/.test(expiryDate.value) ||
            inputYear < currentYear ||
            (inputYear === currentYear && inputMonth < currentMonth) ||
            inputMonth > 12
        ) {
            expiryError.textContent = 'Invalid Expiry Date. Please enter a valid MM/YY forma';
            expiryDate.style.border = '1px solid red';
        } else {
            expiryError.textContent = '';
            expiryDate.style.border = '1px solid black';
        }
    }
    
    function validateCVV(cvv) {
        var cvvError = document.getElementById('cvv-error');
        if (!/^\d{3}$/.test(cvv.value)) {
            cvvError.textContent = 'Invalid CVV. Please enter a 3-digit number.';
            cvv.style.border = '1px solid red';
        } else {
            cvvError.textContent = '';
            cvv.style.border = '1px solid black';
        }
    }
    
    function CreditConfirm(){
        if(cr_cardnumber.value != "" && cr_cardholder.value != "" && cr_expiry != "" && cr_cvv != "" && cr_cardnumber.style.border != '1px solid red' && cr_cardholder.style.border !='1px solid red' && cr_expiry.style.border !='1px solid red' && cr_cvv.style.border != '1px solid red'){
            cr_acc = false;
        }
        else{
            cr_acc = true;
        }
        if(cr_acc == false){
            credit_card.dataset.selected = "true";
            cash_on_delivery.dataset.selected = "false";
            credit_card.innerHTML = "Credit Card " + "<i class='fa-solid fa-check'></i>";
            cash_on_delivery.innerHTML = "Cash On Delivery";
            credit_card.style.border = "1px solid var(--dg)";
            cash_on_delivery.style.border = "none";
            cr_pay.style.display = 'none';
        }
    }
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
        let payment_method = "";
        if(credit_card.dataset.selected == true){
            payment_method = "Credit Card";
        }
        else{
            payment_method = "Cash on Delivery";
        }
        fetch('https://bimbo-company-3e6f6ed5b564.herokuapp.com/api/payment_method', {
            method: 'POST',
            headers:{
                'Access-Control-Allow-Headers' : 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({paymentmethod:payment_method, recipient_id:localStorage.getItem("recipient_id")})
        })
        .then(response=>{
            if(!response.ok){
                throw new Error(`Error, status: ${response.status}`);
            }
            return response.json();
        })
        .then(data =>{
            console.log('Response from backend:', data);
        })
        .catch(error =>{
            console.error('Error during fetch:', error);
        });
        proceed.parentElement.href = "../pages/checkout_proceed.html";
        proceed.removeAttribute("disabled");
        localStorage.setItem("items", JSON.stringify(ar2));
    }
}

function Size(ddl){
    ar2.forEach(el=>{
        if(ddl.name == el.name+el.index){
            el.size = ddl.value;
        }
    })
}

function Proceeded(){
    let items = JSON.parse(localStorage.getItem("items"));
    if(localStorage.length < 2){
        document.getElementsByTagName('h1')[0].innerHTML = `Vec ste napravili porudzbinu, ili nista niste narucili!`;
    }
    else{
        items.forEach(element=>{
            fetch('https://bimbo-company-3e6f6ed5b564.herokuapp.com/api/delivery_id_post',{
                method:'POST',
                headers:{
                    'Access-Control-Allow-Headers' : 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    delivery_id:del_id,
                    recipient_id:localStorage.getItem("recipient_id"),
                    product_id:element.id,
                    product_size:element.size
                })
            })
            .then(response=>{
                if(!response.ok){
                    throw new Error(`Error, status: ${response.status}`);
                }
                return response.json();
            })
            .then(data =>{
                console.log('Response from backend:', data);
            })
            .catch(error =>{
                console.error('Error during fetch:', error);
            });
        })
        items = "";
        document.getElementsByTagName('h1')[0].innerHTML = `Vasa narudzbina je pod brojem: ${del_id}, proverite vas e-mail za vise detalja!`;
        let products = [];
        Object.keys(localStorage).forEach((element)=>{
            products.push(element);
         });
        let index = products.indexOf("recipient_id");
        if (index > -1) {
            products.splice(index, 1);
        }
        products.forEach((element)=>{
            localStorage.removeItem(`${element}`);
        });
        fetch('https://bimbo-company-3e6f6ed5b564.herokuapp.com/api/delivery_id_file_post',{
            method:'POST',
            headers:{
                'Access-Control-Allow-Headers' : 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({delivery_id:del_id})
        })
        .then(response=>{
            if(!response.ok){
                throw new Error(`Error, status: ${response.status}`);
            }
            return response.json();
        })
        .then(data =>{
            console.log('Response from backend:', data);
        })
        .catch(error =>{
            console.error('Error during fetch:', error);
        });
    }
}