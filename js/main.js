var playerMoney = 100.00;
var amount = 1;
displayMoney();

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('moneyBet').onchange = changeAmountHandler;
}, false);

// the matchList contains all the matches
// that are planned.
var matchList = [];
// var closed bets is a list of all the bets that are closed.
var closedBet = 0;
// a variable to hold the next match
// waiting to be added
var addMatch = [];
setPoolMatches();
// changed the currentPool from zero indexed to
// 1-indexed
var currentPool = 1;
var championships = 1;
var matchCount = 1;
// the bets is the list of all the bets
// from the player
// check everytima a match is done,
// reset when reset championship
var bets = [];
// The currentBet keeps track of the current bet loaded.
// The currentBet refers to the matchList.
// from 0 to 26 ZERO INDEXED!!!
var currentbet = 1;
var oddsvalues = {
    0: [2],
    1: [2],
    2: [2],
    3: [2],
    4: [2],
    5: [2],
    6: [2],
    7: [2],
    8: [2],
    9: [2],
    10: [2],
    11: [2],
    12: [2],
    13: [2],
    14: [2],
    15: [2]
};

// set the first bet
loadBet(1);
displayodds();

// those are used for the match
var round = 0;
var countdown = 10;
var countdownout = 5;
var turn = Math.floor(Math.random() * 2);
var dogs = changeDogs();
displayMatcheInfos();

document.getElementById('match_page').addEventListener('click', loadBet(matchCount));

var match = setInterval(function() {
    if (countdown === 0 && round === 0) {
        closeBet(matchCount)
        document.getElementById("matchcomment").innerHTML = "";
    }
    if (countdown > 0) {
        document.getElementById("matchcomment").innerHTML = "Place your bets!!!<br>" + countdown;
        countdown--;
        return;
    };
    if (countdown === 0) {
        if (dogs[0].life > 0 && dogs[1].life > 0) {
            if (document.getElementById("matchcomment").innerHTML.length === 0) {
                round += 1;
                document.getElementById("matchcomment").innerHTML = "";
                document.getElementById("matchcomment").innerHTML = "Round " + round;
            } else if (document.getElementById("matchcomment").innerHTML.length === 7 || document.getElementById("matchcomment").innerHTML.length === 8) {
                if (turn == 0) {
                    turn = 1;
                    attack(dogs[0], dogs[1], "expdog2");
                } else {
                    turn = 0;
                    attack(dogs[1], dogs[0], "expdog1");
                }
            } else {
                document.getElementById("matchcomment").innerHTML = "";
            }
        } else if (dogs[0].life === 0) {
            document.getElementById("matchcomment").innerHTML = dogs[1].name + " Wins in " + round + " rounds!";
            document.getElementById('dog1').style.backgroundImage = 'url(images/dogs/desintegrated.png)';
            if (countdownout > 0) {
                countdownout--;
                return;
            }
            resetMatch(dogs[1], dogs[0]);

        } else if (dogs[1].life === 0) {
            document.getElementById("matchcomment").innerHTML = dogs[0].name + " Wins in " + round + " rounds!";
            document.getElementById('dog2').style.backgroundImage = 'url(images/dogs/desintegrated.png)';
            if (countdownout > 0) {
                countdownout--;
                return;
            }
            resetMatch(dogs[0], dogs[1]);
        }
    }
}, 500);