var playerMoney = 100.00;
var amount = 1;
displayMoney();

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('moneyBet').onchange = changeAmountHandler;
}, false);

// the matchList contains all the matches
// that are planned.
var matchList;
// add a variable to hold the next match
// format: [nbr, nbr]
// this, when completed, will hold the array to
// be added to the matchList
// when addMatch[1];
// matchList.push(addMatch);
// addMatch = [];
var addMatch = [];
setPoolMatches();
// !!! so far so good!!!
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
var currentbet = 0;
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
drawStats();

// those are used for the match
var round = 0;
var count = 100;
var turn = Math.floor(Math.random() * 2);
var dogs = changeDogs();
displayMatcheInfos();


///////////////////////////

///////////////////////
//test.

var match = setInterval(function() {
    if (round === 0 && matchCount !== 27) closeBet(matchCount);
    if (matchCount === 27 && count >= 0) {
        counter = document.getElementById("counter");
        if (count > 0) {
            counter.innerHTML = "Place your bets!!! " + count;
            count--;
        }
        if (count === 0) {
            closeBet(27);
            document.getElementById("counter").innerHTML = "";
        }
        if (count != 0) return;
    }


    if (dogs[0].life > 0 && dogs[1].life > 0) {
        if (document.getElementById("match_page").innerHTML.length === 0) {
            round += 1;
            document.getElementById("match_page").innerHTML = "";
            document.getElementById("match_page").innerHTML = "Round " + round;
        } else if (document.getElementById("match_page").innerHTML.length === 7 || document.getElementById("match_page").innerHTML.length === 8) {
            if (turn == 0) {
                turn = 1;
                attack(dogs[0], dogs[1]);
            } else {
                turn = 0;
                attack(dogs[1], dogs[0]);
            }
        } else {
            document.getElementById("match_page").innerHTML = "";
        }
    } else if (dogs[0].life === 0) {
        document.getElementById("match_page").innerHTML = dogs[1].name + " Wins in " + round + " rounds!";
        resetMatch(dogs[1], dogs[0]);
    } else if (dogs[1].life == 0) {
        document.getElementById("match_page").innerHTML = dogs[0].name + " Wins in " + round + " rounds!";
        resetMatch(dogs[0], dogs[1]);
    }
}, 200);