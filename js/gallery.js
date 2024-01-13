let picture = document.getElementById('fifth-page-pic');
let all_pics = document.getElementById('all-pics');
let arrowLeft = document.getElementById('button-left');
let arrowRight = document.getElementById('button-right');
let fifth_page = document.getElementsByClassName('fifth-page')[0];

let i = 0;
let pictures = [
    "./images/walnut_board.webp",
    "./images/acacia_board.webp",
    "./images/maple_board.webp",
    "./images/bamboo_board.webp",
    "./images/teak_board.webp",
    "./images/mahogany_board.webp",
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