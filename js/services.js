let j = 1;
let services = [
    document.getElementById('service1'),
    document.getElementById('service2'),
    document.getElementById('service3'),
    document.getElementById('service4')
]

window.onload = () => {
    if(window.pageYOffset > 50){
        GreenStyle();
    }
    else{
        WhiteStyle();
    }
    if(window.innerWidth < 768){
        services[0].style.display = 'flex';
        Services();
    }
    else{
        for(a=0;a<services.length;a++){
            services[a].style.display = 'flex';
        }
    }
    if(window.innerWidth > 1024){
        arrowLeft.style.display = 'none';
        arrowRight.style.display = 'none';
        picture.style.display = 'none';
        for(c=0;c<pictures.length;c++){
            all_pics.innerHTML += `<img src=${pictures[c]} alt="">`
        }
    }
}

function Services(){
    setInterval(()=>{
        switch(j){
            case 0:
                services[0].style.display = 'flex';
                services[1].style.display = 'none';
                services[2].style.display = 'none';
                services[3].style.display = 'none';
                break;
            case 1:
                services[0].style.display = 'none';
                services[1].style.display = 'flex';
                services[2].style.display = 'none';
                services[3].style.display = 'none';
                break;
            case 2:
                services[0].style.display = 'none';
                services[1].style.display = 'none';
                services[2].style.display = 'flex';
                services[3].style.display = 'none';
                break;
            case 3:
                services[0].style.display = 'none';
                services[1].style.display = 'none';
                services[2].style.display = 'none';
                services[3].style.display = 'flex';
                break;
        }
        j++;
        if(j == 4){
            j=0;
        }
    }, 1500);
}