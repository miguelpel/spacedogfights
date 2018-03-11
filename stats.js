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

// var oddsvalues = {
//     douglas: [],
//     mistie: [],
//     carl: [],
//     prank: [],
//     gotlib: [],
//     arthur: [],
//     laika: [],
//     hrmm: [],
//     zorgator: [],
//     xhuhan: [],
//     bdah: [],
//     chloe: [],
//     rant: [],
//     pi: [],
//     mrh: [],
//     heinlein: []
// };

// ctx.strokeStyle = '#53823E';
// ctx.lineWidth = 2;

// max: 2; = 20 cellDim
// min: 1; = 10 cellDim
// ctx.moveTo(4, height - (values[0] * cellDim * 10));
// for (dog in oddsvalues) {
//     ctx.beginPath();
//     var cellLength = width / oddsvalues[dog].length;
//     ctx.moveTo(4, height - (oddsvalues[dog][0] * cellDim * 10));
//     for (var k = 1; k <= oddsvalues[dog].length; k++) {
//         ctx.lineTo(cellLength * k, height - (oddsvalues[dog][k] * cellDim * 10));
//     };
//     ctx.stroke();
// }



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
    drawStats();
};

function resetoddsvalues() {
    for (var l = 0; l < 16; l++) {
        oddsvalues[l] = [];
        oddsvalues[l].push(chenil[l].odd);
        oddsvalues[l].push(chenil[l].odd);
    }
    drawStats();
    console.log('resetOddValues called');

};

function highlightdog() {
    var lis = document.getElementById('dogs_list').querySelectorAll('li');
    // reset all
    for (var f = 0; f < lis.length; f++) {
        lis[f].classList.remove('active');
    }
    lis[activedognumber].classList.add('active');

}