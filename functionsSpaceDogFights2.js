// Comment!!!


// Returns an array of 4 arrays containing 4 number between 0 and 15 shuffled.
function shufflePools() {
    var range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    var count = range.length;
    var newRange = [
        [],
        [],
        [],
        []
    ];
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var random = Math.floor(Math.random() * (--count + 1));
            newRange[i].push(range.splice(random, 1));
        }
    }
    return newRange;
};

// pools has to be an array of arrays. This function returns an array of 24 arrays. All the matches per pool.
function setPoolMatches(pools) {
    var poolIndex = 0;
    var resultArray = [];
    while (poolIndex < pools.length) {
        resultArray.push([pools[poolIndex][0], pools[poolIndex][1]]);
        resultArray.push([pools[poolIndex][2], pools[poolIndex][3]]);
        resultArray.push([pools[poolIndex][3], pools[poolIndex][0]]);
        resultArray.push([pools[poolIndex][1], pools[poolIndex][2]]);
        resultArray.push([pools[poolIndex][2], pools[poolIndex][0]]);
        resultArray.push([pools[poolIndex][3], pools[poolIndex][1]]);
        poolIndex++;
    }
    return resultArray;
};

function displayPools() {
    document.getElementById("consolePools").innerHTML = "";
    for (var k = 0; k < 4; k++) {
        document.getElementById("consolePools").innerHTML += "<br>Pool " + (k + 1) + ":<br>";
        for (var l = 0; l < 4; l++) {
            document.getElementById("consolePools").innerHTML += chenil[pools[k][l]].name + " ";
        }
    }
};

// Query the pools variable, the demifinals variable, and the final variable. returns all the nexts matches that are known.
// !!! demiFinals needs to be at format [[,],[,]] and the first demi final match set.
function setNextsMatches() {
    var nexts = [];
    if (poolMatches[0]) {
        for (var i = 0; i < poolMatches.length; i++) {
            nexts.push(poolMatches[i]);
        }
    }
    if (demiFinals[0] && demiFinals[1]) {
        demiFinalMatches[0] = [demiFinals[0], demiFinals[1]];
        nexts.push(demiFinalMatches[0]);
    }
    if (demiFinals[2] && demiFinals[3]) {
        demiFinalMatches[1] = [demiFinals[2], demiFinals[3]];
        nexts.push(demiFinalMatches[1]);
    }
    if (finalMatch[1]) {
        nexts.push(finalMatch);
    }
    return nexts;
};

// reset match !!! In this function, decide when to find pool winner!!!
// reset the variables.
function resetMatch(winner, looser) {
    checkBets(matchCount, winner.id);
    winner.wins += 1;
    winner.odd = getOdds(winner);
    winner.encounter += 1;
    looser.encounter += 1;
    winner.life = 100;
    looser.life = 100;
    if (matchCount < 24) {
        winner.winsPools += 1;
        winner.rounds += round;
    }
    if (matchCount > 0 && matchCount < 24 && (matchCount + 1) % 6 === 0) {
        findWinner(pools[currentPool]);
        currentPool += 1;
    }
    if (matchCount === 24 || matchCount === 25) finalMatch.push(winner.id);
    if (matchCount === 26) {
        winner.medals += 1;
        resetChampionship();
        return;
    };
    // matchCount +1 id here!!!
    matchCount += 1;
    round = 0;
    turn = Math.floor(Math.random() * 2);
    nextMatches = setNextsMatches();
    displayNextMatches();
    closeBet(matchCount);
    setBet();
    // document.getElementById('called').innerHTML += "CloseBet in resetMatch called!";
    dogs = changeDogs();
};

// This one changes dogs and RETURNS the dogs, and does onlt that.
function changeDogs() {
    if (nextMatches[matchCount]) {
        var twoDogs = [];
        var matching = nextMatches[matchCount];
        twoDogs[0] = chenil[matching[0]];
        twoDogs[1] = chenil[matching[1]];
        return twoDogs;
    } else {
        document.getElementById('arena').innetHTML = "Something went wrong with the next Match... Doesn't exists.";
    }
};

function resetChampionship() {
    if (playerMoney === 0) {
        playerMoney = 100.00;
        var amount = 1;
        displayMoney();
    };
    championships += 1;
    pools = shufflePools();
    poolMatches = setPoolMatches(pools);
    displayPools();
    demiFinals = [];
    demiFinalMatches = [];
    finalMatch = [];
    nextMatches = setNextsMatches();
    currentPool = 0;
    // MatchCount starts at 0 !!!
    matchCount = 0;
    displayNextMatches();
    bets = [];
    currentBet = 0;
    betList = nextMatches.slice(1);
    //var matchBet = 1;
    displayBetList();
    setBet();
    round = 0;
    count = 100;
    turn = Math.floor(Math.random() * 2);
    dogs = changeDogs();
    document.getElementById('called').innerHTML = "";
};

// this function choose the winner of the current pool, and pushes him into the demiFinal/demiFinalMatch variables.
// It the resets the winsPools and rounds of all dogs.
function findWinner(anyPool) {
    var sortedPool = anyPool.sort(function(x, y) {
        if (chenil[x].winsPools > chenil[y].winsPools) {
            return -1;
        } else if (chenil[x].winsPools < chenil[y].winsPools) {
            return +1;
        } else if (chenil[x].winsPools === chenil[y].winsPools) {
            if (chenil[x].rounds < chenil[y].rounds) {
                return -1;
            } else if (chenil[x].rounds > chenil[y].rounds) {
                return +1;
            } else if (chenil[x].rounds === chenil[y].rounds) {
                var coin = Math.floor(Math.random() * 2);
                document.getElementById("console").innerHTML += "<br>coin: " + coin + "<br>";
                return (coin > 0) ? -1 : +1;
            }
        }
    });
    winner = sortedPool[0];
    demiFinals.push(winner);
    /*
    if (demiFinals.length === 2) demiFinalMatches.push(demiFinals);
    if (demiFinals.length === 4) {
    	var secondMatch = [demiFinals[2], demiFinals[3]];
    	demiFinalMatches.push(secondMatch);
    }
    */
    for (var d = 0; d < 16; d++) {
        chenil[d].rounds = 0;
        chenil[d].winsPools = 0;
    }
};

function closeBet(fromCurrentMatchIncluded) {
    //document.getElementById('called').innerHTML += "closeBet called!";
    if (nextMatches[fromCurrentMatchIncluded]) {
        betList = nextMatches.slice((fromCurrentMatchIncluded + 1));
        //document.getElementById('stats').innerHTML = "Bets closed for match " + fromCurrentMatchIncluded;
    }
    if (nextMatches.length === 27 && matchCount === 26) {
        betList[0] = nextMatches[26];
        setBet();
    }
    //actualizeBets();
    //setBet();
    //displayBetList();
};

function displayMatcheInfos() {
    document.getElementById("matchPlanning").innerHTML = "Championship : " + championships + "<br>";
    if (matchCount <= 26) document.getElementById("matchPlanning").innerHTML += "Current match : " + matchCount + "<br>" + dogs[0].name + " Vs " + dogs[1].name;

    if (matchCount < 23) document.getElementById('stats').innerHTML = "Next : pool " + currentPool + "<br>";
    if (matchCount === 23 || matchCount === 24) document.getElementById("stats").innerHTML = "Next : Demi-final :<br>";
    if (matchCount < 25) {
        document.getElementById("stats").innerHTML += chenil[nextMatches[matchCount + 1][0]].name + " (odds " + chenil[nextMatches[matchCount + 1][0]].odd + " )";
        document.getElementById("stats").innerHTML += " Vs ";
        document.getElementById("stats").innerHTML += chenil[nextMatches[matchCount + 1][1]].name + " (odds " + chenil[nextMatches[matchCount + 1][1]].odd + " )";
    }

    if (matchCount === 25) document.getElementById("stats").innerHTML = "Next : Final ! " + chenil[finalMatch[0]].name + " against...";
    /*
    if (matchCount === 26 && count >= 0) {
    	document.getElementById("stats").innerHTML = "Final match: " + chenil[finalMatch[0]].name + " Vs " +  chenil[finalMatch[1]].name + "<br>";
    }
    */
};

function displayResults() {
    document.getElementById("consoleResults").innerHTML += "Results :<br>";
    for (var r = 0; r < 16; r++) {
        document.getElementById("consoleResults").innerHTML += chenil[r].name + " medals: " + chenil[r].medals + " wins: " + chenil[r].wins + " Encounter: " + chenil[r].encounter + " Success rate : " + Math.round((chenil[r].wins / chenil[r].encounter) * 100) + "% Actual cote : " + chenil[r].odd + "<br>"
            //" Super Attacks: " + Math.round((chenil[r].sAttacks/chenil[r].coups)*100) + "% Attacks: " + Math.round((chenil[r].attacks/chenil[r].coups)*100) + "% lost turns: " + Math.round((chenil[r].lostTurn/chenil[r].coups)*100) + "% total: " + (Math.round((chenil[r].sAttacks/chenil[r].coups)*100)+Math.round((chenil[r].attacks/chenil[r].coups)*100)+Math.round((chenil[r].lostTurn/chenil[r].coups)*100)) + "<br>";
    }
};

function displayNextMatches() {
    document.getElementById("consoleNextMatches").innerHTML = "<br>Matches :<br>";
    for (var i = 0; i < nextMatches.length; i++) {
        document.getElementById("consoleNextMatches").innerHTML += chenil[nextMatches[i][0]].name + " / " + chenil[nextMatches[i][1]].name + " ";
        if (i === matchCount) document.getElementById("consoleNextMatches").innerHTML += "*";
        document.getElementById("consoleNextMatches").innerHTML += "<br>";
    };
    document.getElementById("consoleNextMatches").innerHTML += "<br>" + nextMatches.length + "<br>";
};

function getOdds(dog) {
    if (dog.encounter === 0) {
        return 2;
    } else {
        var percentage = Math.round((dog.wins / dog.encounter) * 100);
        var cote = 1 / (percentage / 100);
        if (cote <= 1) return 1.05;
        else return cote.toFixed(2);
    }
};

function attack(attackingDog, victim) {
    randomNumber = random(attackingDog) % 3;
    attackingDog.coups += 1;
    if (randomNumber === 0) {
        attackingDog.lostTurn += 1;
        document.getElementById("arena").innerHTML += "<br><br>" + attackingDog.name + " loooses turn.";
    } else if (randomNumber === 1) {
        attackingDog.sAttacks += 1;
        document.getElementById("arena").innerHTML += "<br><br>" + attackingDog.name + " makes Super Attack!";
        victim.life -= 20;
        if (victim.life < 0) victim.life = 0;
    } else {
        document.getElementById("arena").innerHTML += "<br><br>" + attackingDog.name + " attacks!";
        attackingDog.attacks += 1;
        victim.life -= 10;
        if (victim.life < 0) victim.life = 0;
    }
};

function random(Dog) {
    if (Dog.number) {
        Dog.number = (Dog.a * Dog.number + Dog.c) % Dog.m;
        return Dog.number;
    } else {
        var seed = new Date();
        seed = seed.valueOf();
        Dog.number = (Dog.a * seed + Dog.c) % Dog.m;
        return Dog.number;
    }
};

function displayBetList() {
    document.getElementById('betList').innerHTML = "";
    if (betList[0]) {
        for (var i = 0; i < betList.length; i++) {
            document.getElementById('betList').innerHTML += chenil[betList[i][0]].name + " / " + chenil[betList[i][1]].name;
            if (i === currentBet) document.getElementById("betList").innerHTML += "*";
            document.getElementById('betList').innerHTML += "<br>";
        }
    };

    document.getElementById("betList").innerHTML += "<br>" + betList.length + "<br>";
    //setBet();
};

function closeFinalBet() {
    betList = [];
    setBet();
};

function displayMoney() {
    document.getElementById('money').innerHTML = "Player's Money: " + playerMoney.toFixed(2) + " Kopecs<br>";
    if (playerMoney) document.getElementById('moneyBet').max = Math.round(playerMoney);
    else document.getElementById('moneyBet').max = 0;
};

function setBet() { // version 1
    //document.getElementById('called').innerHTML += "setBet called!";
    //if (betList.length !==0 && currentBet > 0 && currentBet < (betList.length-1)) currentBet++;

    if (betList.length === 0) {
        document.getElementById('currentBetDiv').innerHTML = "Nothing";
        document.getElementById('betOnDog1').style.display = "none";
        document.getElementById('betOnDog2').style.display = "none";
        //document.getElementById('betOnDog1').innerHTML = "Nothing";
        //document.getElementById('betOnDog2').innerHTML = "Nothing";
    } else if (currentBet > 0) {

        if (currentBet >= betList.length) {
            currentBet = (betList.length - 1);
        } else {
            currentBet--;
        }
    } else {
        document.getElementById('currentBetDiv').innerHTML = chenil[betList[currentBet][0]].name + "(Odds: " + chenil[betList[currentBet][0]].odd + ") Vs " + chenil[betList[currentBet][1]].name + "(Odds: " + chenil[betList[currentBet][1]].odd + ")";
        document.getElementById('betOnDog1').style.display = "inline";
        document.getElementById('betOnDog2').style.display = "inline";
        document.getElementById('betOnDog1').innerHTML = "Bet on " + chenil[betList[currentBet][0]].name;
        document.getElementById('betOnDog2').innerHTML = "Bet on " + chenil[betList[currentBet][1]].name;
        //nextOrPrevButtonPush = false;
    }
    displayBetList();
    displayCurrentBet();
};

function setPrevBet() {
    if (betList[currentBet - 1] && currentBet > 0) {
        currentBet--;
        document.getElementById('currentBetDiv').innerHTML = chenil[betList[currentBet][0]].name + "(Odds: " + chenil[betList[currentBet][0]].odd + ") Vs " + chenil[betList[currentBet][1]].name + "(Odds: " + chenil[betList[currentBet][1]].odd + ")";
        document.getElementById('betOnDog1').innerHTML = "Bet on " + chenil[betList[currentBet][0]].name;
        document.getElementById('betOnDog2').innerHTML = "Bet on " + chenil[betList[currentBet][1]].name;
        displayBetList();
        displayCurrentBet();
        //nextOrPrevButtonPush = true;
        //setBet();
    }
};

function setNextBet() {
    if (betList[currentBet + 1]) {
        currentBet++;
        document.getElementById('currentBetDiv').innerHTML = chenil[betList[currentBet][0]].name + "(Odds: " + chenil[betList[currentBet][0]].odd + ") Vs " + chenil[betList[currentBet][1]].name + "(Odds: " + chenil[betList[currentBet][1]].odd + ")";
        document.getElementById('betOnDog1').innerHTML = "Bet on " + chenil[betList[currentBet][0]].name;
        document.getElementById('betOnDog2').innerHTML = "Bet on " + chenil[betList[currentBet][1]].name;
        displayBetList();
        displayCurrentBet();
        //nextOrPrevButtonPush = true;
        //setBet();
    }
};

function changeAmountHandler(event) {
    // You can use “this” to refer to the selected element.
    amount = event.target.value;
    actualizeAmount()
};

function actualizeAmount() {
    document.getElementById('currentMoneyBet').innerHTML = "Bet: " + amount + " Kopecs";
};

function placeBetOnDog1() {
    if (playerMoney === 0) return;
    if (!betList[currentBet]) return;
    if (playerMoney < amount) {
        amount = playerMoney;
        playerMoney = 0;
    } else playerMoney -= amount;
    displayMoney();
    var presentBet = [championships, (matchCount + currentBet + 1), betList[currentBet][0], amount, chenil[betList[currentBet][0]].odd];
    if (presentBet[1] > 26) presentBet[1] = 26;
    bets.push(presentBet);
    //setNextBet();
    document.getElementById('called').innerHTML += "Bet for Match: " + presentBet[1] + " Winner: " + chenil[presentBet[2]].name + " value: " + presentBet[3] + " att odds: " + presentBet[4] + "<br>";
    //return true;
};

function placeBetOnDog2() {
    if (playerMoney === 0) return;
    if (!betList[currentBet]) return;
    if (playerMoney < amount) {
        amount = playerMoney;
        playerMoney = 0;
    } else playerMoney -= amount;
    displayMoney();
    var presentBet = [championships, (matchCount + currentBet + 1), betList[currentBet][1], amount, chenil[betList[currentBet][1]].odd];
    if (presentBet[1] > 26) presentBet[1] = 26;
    bets.push(presentBet);
    //setNextBet();
    document.getElementById('called').innerHTML += "Bet for match: " + presentBet[1] + " Winner: " + chenil[presentBet[2]].name + " value: " + presentBet[3] + " att odds: " + presentBet[4] + "<br>";
    //return true;
};

function displayCurrentBet() {
    document.getElementById('currentBetIndicator').innerHTML = "Current bet number: " + currentBet;
};

function checkBets(matchNumber, winnerNumber) {
    //document.getElementById('called').innerHTML += "CheckBets called with numbers: " + matchNumber + " " + winnerNumber;
    for (var i = 0; i < bets.length; i++) {
        if (bets[i][1] == matchNumber && bets[i][2] == winnerNumber) {
            var gain = (bets[i][3] * bets[i][4]);
            playerMoney += gain;
            document.getElementById('called').innerHTML += chenil[winnerNumber].name + " Wins!!! gain: " + gain + "<br>";
        }
    };
    displayMoney();
};