let decrease = document.getElementById('number-left');
let increase = document.getElementById('number-right');
let input = document.getElementById('number-quantity');
let pic_left = document.getElementById('button-left');
let pic_right = document.getElementById('button-right');
let main_pic = document.getElementById('article-mainpic');
let details = document.getElementById('details');
let shipping = document.getElementById('shipping');
let returns = document.getElementById('returns');
let info1 = document.getElementById('details-p');
let info2 = document.getElementById('shipping-p');
let info3 = document.getElementById('returns-p');
let gallery = [
    document.getElementById('pic1'),
    document.getElementById('pic2'),
    document.getElementById('pic3'),
    document.getElementById('pic4')
]
let value = 0;
let i = 0;

decrease.onclick = () => {
    if(value == 0){
        value = 0;
        input.value = value;
    }
    else{
        value--;
        input.value = value;
    }
}

increase.onclick = () => {
    value++;
    input.value = value;
}

pic_right.onclick = () => {
    i++;
    if(i>3){
        i=0;
    }
    Picture();
}

pic_left.onclick = () => {
    i--;
    if(i<0){
        i=3;
    }
    Picture();
}

function Picture(){
    switch(i){
        case 0:
            gallery[0].style.display = 'block';
            main_pic.style.display = 'flex';
            gallery[1].style.display = 'none';
            gallery[2].style.display = 'none';
            gallery[3].style.display = 'none';
            break;
        case 1:
            gallery[0].style.display = 'none';
            main_pic.style.display = 'none';
            gallery[1].style.display = 'block';
            gallery[2].style.display = 'none';
            gallery[3].style.display = 'none';
            break;
        case 2:
            gallery[0].style.display = 'none';
            main_pic.style.display = 'none';
            gallery[1].style.display = 'none';
            gallery[2].style.display = 'block';
            gallery[3].style.display = 'none';
            break;
        case 3:
            gallery[0].style.display = 'none';
            main_pic.style.display = 'none';
            gallery[1].style.display = 'none';
            gallery[2].style.display = 'none';
            gallery[3].style.display = 'block';
            break;
    }
}

details.onclick = () => {
    if(info1.style.display == 'block'){
        info1.style.display = 'none';
        document.documentElement.style.setProperty('--vision1', "none");
        info2.style.display = 'none';
        document.documentElement.style.setProperty('--vision2', "none");
        info3.style.display = 'none';
        document.documentElement.style.setProperty('--vision3', "none");
    }
    else{
        info1.style.display = 'block';
        document.documentElement.style.setProperty('--vision1', "block");
        info2.style.display = 'none';
        document.documentElement.style.setProperty('--vision2', "none");
        info3.style.display = 'none';
        document.documentElement.style.setProperty('--vision3', "none");
    }
}

shipping.onclick = () => {
    if(info2.style.display == 'block'){
        info1.style.display = 'none';
        document.documentElement.style.setProperty('--vision1', "none");
        info2.style.display = 'none';
        document.documentElement.style.setProperty('--vision2', "none");
        info3.style.display = 'none';
        document.documentElement.style.setProperty('--vision3', "none");
    }
    else{
        info1.style.display = 'none';
        document.documentElement.style.setProperty('--vision1', "none");
        info2.style.display = 'block';
        document.documentElement.style.setProperty('--vision2', "block");
        info3.style.display = 'none';
        document.documentElement.style.setProperty('--vision3', "none");
    }
}

returns.onclick = () => {
    if(info3.style.display == 'block'){
        info1.style.display = 'none';
        document.documentElement.style.setProperty('--vision1', "none");
        info2.style.display = 'none';
        document.documentElement.style.setProperty('--vision2', "none");
        info3.style.display = 'none';
        document.documentElement.style.setProperty('--vision3', "none");
    }
    else{
        info1.style.display = 'none';
        document.documentElement.style.setProperty('--vision1', "none");
        info2.style.display = 'none';
        document.documentElement.style.setProperty('--vision2', "none");
        info3.style.display = 'block';
        document.documentElement.style.setProperty('--vision3', "block");
    }
}

function Show(element){
    if(element.dataset.state == 'off'){
        element.querySelector('i').style.transform = 'rotateZ(-45deg) translate(-7px, -7px)';
        element.querySelector('#faq-content').style.display = 'block';
        element.dataset.state = 'on';
    }
    else{
        element.querySelector('i').style.transform = 'rotateZ(0deg)';
        element.querySelector('#faq-content').style.display = 'none';
        element.dataset.state = 'off';
    }
}