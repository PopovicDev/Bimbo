const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }
    })
});

const observer1 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('show1');
        }
    })
});

const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('show2');
        }
    })
});

const observer3 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('show3');
        }
    })
});


const hiddenElements = document.querySelectorAll('.hidden');
const hiddenElements1 = document.querySelectorAll('.hidden1');
const hiddenElements2 = document.querySelectorAll('.hidden2');
const hiddenElements3 = document.querySelectorAll('.hidden3');
hiddenElements.forEach((el) => observer.observe(el));
hiddenElements1.forEach((el) => observer1.observe(el));
hiddenElements2.forEach((el) => observer2.observe(el));
hiddenElements3.forEach((el) => observer3.observe(el));

