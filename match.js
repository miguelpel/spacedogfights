var playerMoney = 100.00;
var amount = 1;
displayMoney();

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('moneyBet').onchange = changeAmountHandler;
}, false);

var pools = shufflePools();
var poolMatches = setPoolMatches(pools);
displayPools();
var demiFinals = [];
var demiFinalMatches = [];
var finalMatch = [];
var nextMatches = setNextsMatches();
var currentPool = 0;
var championships = 1;
// MatchCount starts at 0 !!!
// You'll change that.
var matchCount = 0;
displayNextMatches();

var bets = [];
var currentBet = 0;
//var nextOrPrevButtonPush = false;
//var matchBet = 1;
var betList = nextMatches.slice(1);
displayBetList();
setBet();

var round = 0;
var count = 100;
var turn = Math.floor(Math.random() * 2);
var dogs = changeDogs();


//test.

var match = setInterval(function() {

    // for test
    // document.getElementById('bets').innerHTML = demiFinals.toString() + "<br>" + demiFinalMatches.toString() + "<br>" + finalMatch.toString();

    /*if (championships === 11) {
    	displayResults();
    	clearInterval(match);
    };*/
    if (round === 0 && matchCount !== 26) closeBet(matchCount);
    if (matchCount === 26 && count >= 0) {
        document.getElementById("arena").innerHTML = "";
        document.getElementById("stats").innerHTML = "Final match: " + chenil[finalMatch[0]].name + " Vs " + chenil[finalMatch[1]].name + "<br>";
        document.getElementById("stats").innerHTML += "Place your bets!!! " + count;
        //displayMatcheInfos();
        count--;
        if (count === 0) {
            closeFinalBet();
            displayBetList(); // !!! then it will need to be closed in this function, after matchCount actualisation.
            document.getElementById("stats").innerHTML += "CloseFinalBet called!";
        }
        if (count != 0) return;
    }
    displayMatcheInfos();

    if (dogs[0].life > 0 && dogs[1].life > 0) {
        if (document.getElementById("arena").innerHTML.length === 0) {
            round += 1;
            document.getElementById("arena").innerHTML = "";
            document.getElementById("arena").innerHTML = "Round " + round;
        } else if (document.getElementById("arena").innerHTML.length === 7 || document.getElementById("arena").innerHTML.length === 8) {
            if (turn == 0) {
                turn = 1;
                attack(dogs[0], dogs[1]);
            } else {
                turn = 0;
                attack(dogs[1], dogs[0]);
            }
        } else {
            document.getElementById("arena").innerHTML = "";
        }
    } else if (dogs[0].life === 0) {
        document.getElementById("arena").innerHTML = dogs[1].name + " Wins in " + round + " rounds!";
        //closeBet(matchCount);
        //displayBetList();
        resetMatch(dogs[1], dogs[0]);
    } else if (dogs[1].life == 0) {
        document.getElementById("arena").innerHTML = dogs[0].name + " Wins in " + round + " rounds!";
        //closeBet(matchCount);
        //displayBetList();
        resetMatch(dogs[0], dogs[1]);
    }
}, 300);