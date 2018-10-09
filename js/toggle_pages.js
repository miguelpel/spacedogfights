let divs = document.querySelectorAll('.togglediv'),
    btns = document.querySelectorAll('.togglebtn'),
    btn1 = document.querySelector('#togglebtn_1'),
    btn2 = document.querySelector('#togglebtn_2'),
    btn3 = document.querySelector('#togglebtn_3'),
    btn4 = document.querySelector('#togglebtn_4')
    //current = 0;
    // Clear all divs
function reset() {
    for (let i = 0; i < divs.length; i++) {
        divs[i].style.display = 'none';
        btns[i].style.top = '-1px';
    }
}
// Init div
function startSlide() {
    reset();
    divs[0].style.display = 'block';
    btns[0].style.top = '2px';
}

// Seclect div to display
function selectDiv(nbr) {
    reset();
    divs[nbr - 1].style.display = 'inline-block';
    // trying to move this here
    btns[nbr - 1].style.top = '2px';
}

btn1.addEventListener('click', function() {
    selectDiv(1);
});
btn2.addEventListener('click', function() {
    selectDiv(2);
});
btn3.addEventListener('click', function() {
    selectDiv(3);
});
btn4.addEventListener('click', function() {
    selectDiv(4);
});
startSlide();