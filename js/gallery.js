let picture = document.getElementById('fifth-page-pic');
let all_pics = document.getElementById('all-pics');
let arrowLeft = document.getElementById('button-left');
let arrowRight = document.getElementById('button-right');
let fifth_page = document.getElementsByClassName('fifth-page')[0];

let i = 0;
let pictures = [
    "./images/random1.webp",
    "./images/random2.webp",
    "./images/random3.webp",
    "./images/random4.webp",
    "./images/random5.webp",
    "./images/random6.webp",
]

picture.src = pictures[0];

arrowRight.onclick = () => {
    i++;
    if(i>5){
        i=0;
    }
    picture.src = pictures[i];
}

arrowLeft.onclick = () => {
    i--;
    if(i<0){
        i=5;
    }
    picture.src = pictures[i];
}