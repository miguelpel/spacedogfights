var statGraph = document.getElementById('statGraph');
// Magic to clear and reset the canvas element.
statGraph.width = statGraph.width;
var ctx = statGraph.getContext("2d");
// ctx.mozImageSmoothingEnabled = false;
// ctx.webkitImageSmoothingEnabled = false;
// ctx.msImageSmoothingEnabled = false;
// ctx.imageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = true;
ctx.msImageSmoothingEnabled = true;
ctx.imageSmoothingEnabled = true;
var width = statGraph.width,
    height = statGraph.height;
var cellDim = Math.round(height / 21);
var activedognumber = 0;
highlightdog();
// clear: #D6E894;
// medium clear:  #7DC53D;
// medium dark: #53823E;
// dark:  #1D412D;
ctx.lineWidth = 2;
ctx.strokeStyle = '#7DC53D';
ctx.moveTo(0, height);
var i = 0;
var j = 21;
while (i <= j) {
    ctx.moveTo(0, height - (cellDim * i));
    ctx.lineTo(width, height - (cellDim * i));
    i++;
}
ctx.stroke();

ctx.lineWidth = 4;
ctx.strokeStyle = '#1D412D';
ctx.beginPath();
ctx.moveTo(2, 0);
ctx.lineTo(2, height);
ctx.lineTo(width, height);
ctx.stroke();


function drawStats() {
    ctx.strokeStyle = '#53823E';
    ctx.lineWidth = 2;
    statGraph.width = statGraph.width;
    // clear: #D6E894;
    // medium clear:  #7DC53D;
    // medium dark: #53823E;
    // dark:  #1D412D;
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#7DC53D';
    ctx.moveTo(0, height);
    var i = 0;
    var j = 21;
    while (i <= j) {
        ctx.moveTo(0, height - (cellDim * i));
        ctx.lineTo(width, height - (cellDim * i));
        i++;
    }
    ctx.stroke();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#1D412D';
    ctx.beginPath();
    ctx.moveTo(2, 0);
    ctx.lineTo(2, height);
    ctx.lineTo(width, height);
    ctx.stroke();
    ctx.lineWidth = 2;
    for (dog in oddsvalues) {
        // if (dog == activedognumber) ctx.strokeStyle = '#1D412D';
        // else 
        ctx.strokeStyle = '#53823E';
        ctx.beginPath();
        var cellLength = Math.floor(width / (5 * ((championships % 2) + 1)));
        ctx.moveTo(4, height - (oddsvalues[dog][0] * cellDim * 5));
        for (var k = 1; k <= oddsvalues[dog].length; k++) {
            ctx.lineTo(cellLength * k, height - (oddsvalues[dog][k] * cellDim * 5));
        };
        ctx.stroke();
        ctx.strokeStyle = '#1D412D';
        ctx.beginPath();
        ctx.moveTo(4, height - (oddsvalues[activedognumber][0] * cellDim * 5));
        for (var k = 1; k <= oddsvalues[activedognumber].length; k++) {
            ctx.lineTo(cellLength * k, height - (oddsvalues[activedognumber][k] * cellDim * 5));
        };
        ctx.stroke();
    }
};

function changeactiveognumber(nbr) {
    activedognumber = nbr;
    highlightdog();
    // create a modal with:
    // - a picture of the dog (get the url from chenil),
    // - a short description (get the url from chenil),
    // - the NUMBERS and 'origin' of the dog
    // - the graph of the dog
    // <div class="modal">
    // <div class="dog" id="dog3"></div> // to get the animations
    // <p> description (30 words) his numbers are: 
    // a: <span id="a"></span>, b: <span id="b"></span>, and c:
    // <span id="c"></span>.</p>
    // <canvas id="statGraph">STh</canvas>
    // then, style the thing in css

    var modal = document.createElement("div");
    var span = document.createElement("span");
    var img = document.createElement("img");
    var clear = document.createElement("p");
    var x = document.createTextNode("close");
    var canvas = document.createElement('canvas');
    var name = chenil[activedognumber].name;
    var src = chenildex[name].image;
    modal.classList.add("dogmodal");
    modal.classList.add("gamegirl");
    canvas.id = "graph";
    span.classList.add("gamegirl");
    span.classList.add("close");
    img.classList.add("dog-portrait");
    // carful: case-sensitive
    img.src = src;
    span.appendChild(x);
    span.addEventListener("click", discardmodal);

    modal.appendChild(img);
    modal.innerHTML += chenildex[name].bio;
    clear.innerHTML = "<br>";
    modal.appendChild(clear);
    modal.appendChild(span);
    modal.appendChild(canvas);
    var page = document.getElementById('stats_page');
    page.appendChild(modal);


    drawStats2();
};

function discardmodal() {
    var mod = document.querySelectorAll("div .dogmodal");
    var page = document.getElementById('stats_page');
    for (var i = 0; i < mod.length; i++) page.removeChild(mod[i]);
}

function drawStats2() {
    var statGraph = document.getElementById('graph');
    var ctx = statGraph.getContext("2d");
    var width = statGraph.width,
        height = statGraph.height;
    var cellDim = Math.round(height / 10);
    var cellLength = Math.floor(width / 6);
    // clear: #D6E894;
    // medium clear:  #7DC53D;
    // medium dark: #53823E;
    // dark:  #1D412D;
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#7DC53D';
    ctx.moveTo(0, height);
    var i = 0;
    var j = 9;
    while (i <= j) {
        ctx.moveTo(0, height - (cellDim * i));
        ctx.lineTo(width, height - (cellDim * i));
        i++;
    }
    ctx.stroke();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#1D412D';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height);
    ctx.lineTo(width, height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(4, height - (oddsvalues[activedognumber][0] * cellDim * 2));
    for (var k = 1; k <= oddsvalues[activedognumber].length; k++) {
        ctx.lineTo(cellLength * k, height - (oddsvalues[activedognumber][k] * cellDim * 2));
    };
    ctx.stroke();
};

function resetoddsvalues() {
    // here, you really, really have to find a way to
    // have the 5 last odds!!!
    for (var l = 0; l < 16; l++) {
        oddsvalues[l] = [];
        oddsvalues[l].push(chenil[l].odd);
        oddsvalues[l].push(chenil[l].odd);
    }
    drawStats();
    console.log('resetOddValues called');

};

function highlightdog() {
    var lis = document.getElementById('stats_container').querySelectorAll('li');
    // reset all
    for (var f = 0; f < lis.length; f++) {
        lis[f].classList.remove('active');
    }
    lis[activedognumber].classList.add('active');

}