// Returns an array of 4 arrays containing 4 number between 0 and 15 shuffled.
// returns the id number of the dogs

function shufflePools() {
    // here are all the ids
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
    var pools = shufflePools();
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
    //add the result array to the next matches
    matchList = resultArray;
    displayThePools();
};

// Query the addMatch, to see if there's a couple yet.
// if there is, pushes the couple into the next matches

function checksAddMatch() {
    if (addMatch[1]) {
        matchList.push(addMatch);
        addMatch = [];
        // put the class clickable to this match:
        if (matchCount === 12) {
            document.getElementById('demi-1').classList.add('clickable');
        }
        if (matchCount === 24) {
            document.getElementById('demi-2').classList.add('clickable');
        }
        if (matchCount === 26) {
            document.getElementById('final').classList.add('clickable');
        }
    }
};

// reset match. In this function, decide when to find pool winner!!!
// reset the variables.
function resetMatch(winner, looser) {
    checkBets(matchCount, winner.id);
    winner.wins += 1;
    winner.encounter += 1;
    looser.encounter += 1;
    winner.odd = getOdds(winner);
    looser.odd = getOdds(looser);
    displayodds();
    ////////////////////
    ////!!!!!!!!!!!!
    ///////////////////
    resetoddsvalues();
    oddsvalues[winner.id].push(winner.odd);
    oddsvalues[looser.id].push(looser.odd);
    winner.life = 60;
    looser.life = 60;
    if (matchCount < 25) {
        winner.winsPools += 1;
        winner.rounds += round;
    }
    if (matchCount > 1 && matchCount < 25 && matchCount % 6 === 0) {
        findWinner(currentPool);
        currentPool += 1;
    }
    if (matchCount === 25 || matchCount === 26) {
        addMatch.push(winner.id);
        if (addMatch[0]) document.getElementById("final-dog-1").innerHTML = chenil[addMatch[0]].name;
        if (addMatch[1]) document.getElementById("final-dog-2").innerHTML = chenil[addMatch[1]].name;
    }
    if (matchCount === 27) {
        winner.medals += 1;
        resetChampionship();
        return;
    };
    checksAddMatch();
    matchCount += 1;
    dogs = changeDogs();
    round = 0;
    countdown = 10;
    countdownout = 5;
    turn = Math.floor(Math.random() * 2);
    checkProgress();
    displayMatcheInfos();
};

// This one changes dogs and RETURNS the dogs, and does onlt that.
function changeDogs() {
    if (matchList[matchCount - 1]) {
        var twoDogs = [];
        var matching = matchList[matchCount - 1];
        twoDogs[0] = chenil[matching[0]];
        twoDogs[1] = chenil[matching[1]];
        var imgdog1 = chenil[matching[0]].image;
        var imgdog1 = chenil[matching[1]].image;
        document.getElementById('dog1').style.backgroundImage = 'url(' + chenil[matching[0]].image + ')';
        document.getElementById('dog2').style.backgroundImage = 'url(' + chenil[matching[1]].image + ')';
        return twoDogs;
    } else {
        document.getElementById('matchcomment').innetHTML = "Something went wrong with the next Match... Doesn't exists.";
    }
};

function resetChampionship() {
    if (playerMoney === 0) {
        playerMoney = 10.00;
        var amount = 1;
        displayMoney();
    };
    championships += 1;
    // get all the pools, and remove the non clickable class
    var poolMatches = document.querySelectorAll('.poolmatch');

    for (var i = 0; i < poolMatches.length; i++) {
        poolMatches[i].classList.remove("inactive");
    }
    // get the demi-finals match, and set them to inactive.
    document.getElementById("demi-1").classList.remove("clickable");
    document.getElementById("demi-2").classList.remove("clickable");
    // get the final container, and hide it.
    document.getElementById("final-container").style.display = 'none';
    document.getElementById('bet').style.visibility = 'visible';

    // remove the textx from demi-finals and final
    dogNms = document.querySelectorAll('.dogNm');
    for (var j = 0; j < dogNms.length; j++) {
        dogNms[j].innerHTML = "???";
    }
    matchList = [];
    addMatch = [];
    setPoolMatches();
    currentPool = 1
    matchCount = 1
    bets = [];
    currentbet = 1;
    closedBet = 0;
    round = 0;
    countdown = 10;
    countdownout = 5;
    count = 100;
    turn = Math.floor(Math.random() * 2);
    dogs = changeDogs();
    loadBet(1);
};

// this function choose the winner of the current pool, and pushes him into the demiFinal/demiFinalMatch variables.
// It the resets the winsPools and rounds of all dogs.
function findWinner(poolnbr) {
    var pool = [];
    var counter;
    if (poolnbr == 1) counter = 0;
    if (poolnbr == 2) counter = 6;
    if (poolnbr == 3) counter = 12;
    if (poolnbr == 4) counter = 18;
    for (var i = 0; i < 2; i++) {
        for (var k = 0; k < 2; k++) {
            pool.push(matchList[counter][k]);
        }
        counter++;
    };
    var sortedPool = pool.sort(function(x, y) {
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
                return (coin > 0) ? -1 : +1;
            }
        }
    });
    winner = sortedPool[0];
    addMatch.push(winner);
    // better!!! here!
    if (matchCount == 6) document.getElementById("demi-1-dog-1").innerHTML = chenil[addMatch[0]].name;
    if (matchCount == 12) document.getElementById("demi-1-dog-2").innerHTML = chenil[addMatch[1]].name;
    if (matchCount == 18) document.getElementById("demi-2-dog-1").innerHTML = chenil[addMatch[0]].name;
    if (matchCount == 24) {
        document.getElementById("demi-2-dog-2").innerHTML = chenil[addMatch[1]].name;
        document.getElementById("pool_container").style.display = 'none';
        document.getElementById("final-container").style.display = 'block';
    }
    // erase the rounds and winsPool
    for (var d = 0; d < 16; d++) {
        chenil[d].rounds = 0;
        chenil[d].winsPools = 0;
    }
};

function closeBet(fromCurrentMatchIncluded) {
    // add a condition
    closedBet = fromCurrentMatchIncluded;
    if (fromCurrentMatchIncluded < 25) {
        var poolMatches = document.querySelectorAll('.poolmatch');
        poolMatches[closedBet - 1].classList.add("inactive");
    }
    if (fromCurrentMatchIncluded === 25) {
        document.getElementById("demi-1").classList.remove("clickable");
    }
    if (fromCurrentMatchIncluded === 26) {
        document.getElementById('demi-2').classList.remove("clickable");
        /////////////////
        // disallow bet //
        ////////////////
    }
    if (fromCurrentMatchIncluded === 27) {
        document.getElementById("final").classList.remove("clickable");
        /////////////////
        // disallow bet //
        ////////////////
    };
    if (currentbet <= closedBet) {
        setNextBet();
    };
};

function displayMatcheInfos() {
    matchPlanning = document.getElementById("matchPlanning");
    matchPlanning.innerHTML = "Championship : " + championships + "<br>" + "current match : " + matchCount;
    if (matchCount <= 24) matchPlanning.innerHTML += " / pool : " + currentPool;
    if (matchCount === 25) matchPlanning.innerHTML += " / demi-final 1";
    if (matchCount === 26) matchPlanning.innerHTML += " / demi-final 2";
    if (matchCount === 27) matchPlanning.innerHTML += " / Final !!!";
    matchPlanning.innerHTML += "<br>";
    matchPlanning.innerHTML += chenil[matchList[matchCount - 1][0]].name + " vs " + chenil[matchList[matchCount - 1][1]].name;
};

function displayThePools() {
    // get the pool container, and make it diplay.
    var poolContainer = document.getElementById('pool_container');
    poolContainer.style.display = 'flex';
    // the poolmatches are all the matches in all the pools
    // maybe it all we need ??!!!
    var poolMatches = document.querySelectorAll('.poolmatch');
    // erase all the content of the pool matches.
    for (var i = 0; i < poolMatches.length; i++) {
        poolMatches[i].innerHTML = "";
        // the remove the inactive class of the poolMatch
        if (championships > 1) poolMatches[i].classList.remove("inactive");
    };
    for (var i = 0; i < matchList.length; i++) {
        poolMatches[i].innerHTML += chenil[matchList[i][0]].name + "<br> vs <br>" + chenil[matchList[i][1]].name;
    };
};

function getOdds(dog) {
    if (dog.encounter === 0) {
        return 2;
    } else {
        var percentage = Math.round((dog.wins / dog.encounter) * 100);
        var cote = 1 / (percentage / 100);
        if (cote <= 1) return 1.05;
        if (cote >= 4) return 4;
        else return cote.toFixed(2);
    }
};

function attack(attackingDog, victim, victimdiv) {
    randomNumber = random(attackingDog) % 3;
    attackingDog.coups += 1;
    exp = document.getElementById(victimdiv);
    if (randomNumber === 0) {
        attackingDog.lostTurn += 1;
        document.getElementById("matchcomment").innerHTML += "<br><br>" + attackingDog.name + " loooses turn.";
    } else if (randomNumber === 1) {
        attackingDog.sAttacks += 1;
        document.getElementById("matchcomment").innerHTML += "<br><br>" + attackingDog.name + " makes Super Attack!";
        victim.life -= 20;
        exp.style.backgroundImage = 'url(images/sexplosion.png)';
        exp.classList.remove("run-animation");
        void exp.offsetWidth;
        exp.classList.add("run-animation");
        if (victim.life < 0) victim.life = 0;
    } else {
        document.getElementById("matchcomment").innerHTML += "<br><br>" + attackingDog.name + " attacks!";
        attackingDog.attacks += 1;
        victim.life -= 10;
        exp.style.backgroundImage = 'url(images/explosion.png)';
        exp.classList.remove("run-animation");
        void exp.offsetWidth;
        exp.classList.add("run-animation");
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

function displayMoney() {
    document.getElementById('money').innerHTML = "Money: " + playerMoney.toFixed(2) + " Obols<br>";
    if (playerMoney) document.getElementById('moneyBet').max = Math.round(playerMoney);
    else document.getElementById('moneyBet').max = 0;
};

function setNextBet() {
    currentbet += 1;
    //check if it's possible to set the next bet
    // if not yet, disallow bets
    if (matchList[currentbet - 1]) {
        loadBet(currentbet);
    } else {
        disallowBets();
    }
};


function loadBet(betNbr) {
    // don't load bet if the bet is closed
    if (betNbr <= closedBet) {
        return
    }
    // check id there is this match in the list
    if (matchList[betNbr - 1]) {
        // we're in the scope.
        eraseBet();
        currentbet = betNbr;
        document.getElementById('currentBetMatch').innerHTML = "Bet for Match : " + (currentbet);
        document.getElementById('betdogname1').innerHTML = chenil[matchList[currentbet - 1][0]].name;
        document.getElementById('betdogodds1').innerHTML = "odds: " + chenil[matchList[currentbet - 1][0]].odd;
        document.getElementById('betdogname2').innerHTML = chenil[matchList[currentbet - 1][1]].name;
        document.getElementById('betdogodds2').innerHTML = "odds: " + chenil[matchList[currentbet - 1][1]].odd;
        document.getElementById('bet').style.visibility = 'visible';
    } else return;
};

function changeAmountHandler(event) {
    // You can use “this” to refer to the selected element.
    amount = event.target.value;
    actualizeAmount()
};

function actualizeAmount() {
    document.getElementById('currentMoneyBet').innerHTML = "Bet: " + amount + " Obols";
};

function placeBetOnDog(dog) {
    eraseBet();
    // check that the dog is accessible
    if (chenil[matchList[currentbet - 1][dog]]) {
        /* load The dog, attach the class,
        wait for contirmation */
        var dogDivs = document.querySelectorAll('.betdog');
        dogDivs[dog].classList.add("active");
        document.getElementById("betdogname").innerHTML = " on " + chenil[matchList[currentbet - 1][dog]].name;

    }
}

// eraseBet is here outside because it's used
// elsewhere, when the bet are refreshed
function eraseBet() {
    var dogDivs = document.querySelectorAll('.betdog');
    for (var i = 0; i < 2; i++) {
        dogDivs[i].classList.remove("active");
    }
    document.getElementById("betdogname").innerHTML = " on...";
}

function disallowBets() {
    eraseBet();
    document.getElementById('currentBetMatch').innerHTML = "";
    document.getElementById('betdogname1').innerHTML = "";
    document.getElementById('betdogodds1').innerHTML = "";
    document.getElementById('betdogname2').innerHTML = "";
    document.getElementById('betdogodds2').innerHTML = "";
    document.getElementById('bet').style.visibility = 'hidden';
}

function confirmBet() {
    if (currentbet > closedBet) {
        // ok, we're in the scope.
        var dogDivs = document.querySelectorAll('.betdog');
        var bt = -1;
        if (dogDivs[0].classList.contains("active")) bt = 0;
        if (dogDivs[1].classList.contains("active")) bt = 1;
        // confirm that there's a dog selected.
        if (bt >= 0) {
            if (playerMoney === 0) return;
            if (playerMoney < amount) {
                amount = playerMoney;
                playerMoney = 0;
            } else playerMoney -= amount;
            displayMoney();
            var presentBet = [championships, (currentbet), matchList[currentbet - 1][bt], amount, chenil[matchList[currentbet - 1][bt]].odd];
            bets.push(presentBet);
            var betJournal = document.getElementById('betJournal');
            var entry = document.createElement('li');
            // the entry has an id of the number of the match
            // this id will help us to erase it
            // when the match is passed.
            entry.setAttribute("id", ("" + presentBet[1]));
            var html = "Bet for Match: " + presentBet[1] + "// Winner: " + chenil[presentBet[2]].name + "// Obols: " + presentBet[3] + " att odds: " + presentBet[4] + "<br>";
            entry.innerHTML = html;
            betJournal.appendChild(entry);
            console.log(entry.id);
            // here it may be good to display
            // automatically the bet screen
            selectDiv(3);
        }
    }
}


function checkBets(matchNumber, winnerNumber) {
    //document.getElementById('called').innerHTML += "CheckBets called with numbers: " + matchNumber + " " + winnerNumber;
    for (var i = 0; i < bets.length; i++) {
        if (bets[i][1] == matchNumber && bets[i][2] == winnerNumber) {
            var gain = (bets[i][3] * bets[i][4]);
            gain = Math.round(gain);
            playerMoney += gain;
            // rajouter des lignes, des <p>
            document.getElementById('winning').innerHTML = chenil[winnerNumber].name + " Wins!!! in match: " + matchNumber + " gain: " + gain;
        }
        // effacer les anciennes lignes
    };
    displayMoney();
    var betJournal = document.getElementById('betJournal');
    var entries = betJournal.querySelectorAll('li');
    for (var j = 0; j < entries.length; j++) {
        if (entries[j].id < matchCount) {
            betJournal.removeChild(entries[j]);
        }
    }
};

function displayodds() {
    var doglist = document.getElementById('stats_container').querySelectorAll('li');
    for (var t = 0; t < doglist.length; t++) {
        doglist[t].innerHTML = chenil[t].name + "<br> odds: " + chenil[t].odd;
    }
};

function checkProgress() {
    // Green > 110
    if (playerMoney >= 110) {
        var gameboys = document.querySelectorAll(".gameboy");
        var gamegirls = document.querySelectorAll(".gamegirl");
        for (var i = 0; i < gameboys.length; i++) {
            //gameboys[i].style.backgroundColor = "#F3FF00";
            gameboys[i].style.WebkitBorderImage = "url(../images/border_gb_green_dark.png) 12 12 round";
            gameboys[i].style.OBorderImage = "url(../images/border_gb_green_dark.png) 12 12 round";
            gameboys[i].style.borderImage = "url(images/border_gb_green_dark.png) 12 12 round";
        }
        for (var j = 0; j < gamegirls.length; j++) {
            //gamegirls[j].style.backgroundColor = "#F3FF00";
            gamegirls[j].style.WebkitBorderImage = "url(../images/border_gb_green.png) 12 12 round";
            gamegirls[j].style.OBorderImage = "url(../images/border_gb_green.png) 12 12 round";
            gamegirls[j].style.borderImage = "url(../images/border_gb_green.png) 12 12 round";
        }
    }
    // Blue > 150
    if (playerMoney >= 150) {
        var gameboys = document.querySelectorAll(".gameboy");
        var gamegirls = document.querySelectorAll(".gamegirl");
        for (var i = 0; i < gameboys.length; i++) {
            //gameboys[i].style.backgroundColor = "#F3FF00";
            gameboys[i].style.WebkitBorderImage = "url(../images/border_gb_blue_dark.png) 12 12 round";
            gameboys[i].style.OBorderImage = "url(../images/border_gb_blue_dark.png) 12 12 round";
            gameboys[i].style.borderImage = "url(../images/border_gb_blue_dark.png) 12 12 round";
        }
        for (var j = 0; j < gamegirls.length; j++) {
            //gamegirls[j].style.backgroundColor = "#F3FF00";
            gamegirls[j].style.WebkitBorderImage = "url(../images/border_gb_blue.png) 12 12 round";
            gamegirls[j].style.OBorderImage = "url(../images/border_gb_blue.png) 12 12 round";
            gamegirls[j].style.borderImage = "url(../images/border_gb_blue.png) 12 12 round";
        }
    }
    // Violet > 200
    if (playerMoney >= 200) {
        var gameboys = document.querySelectorAll(".gameboy");
        var gamegirls = document.querySelectorAll(".gamegirl");
        for (var i = 0; i < gameboys.length; i++) {
            //gameboys[i].style.backgroundColor = "#F3FF00";
            gameboys[i].style.WebkitBorderImage = "url(../images/border_gb_violet_dark.png) 12 12 round";
            gameboys[i].style.OBorderImage = "url(../images/border_gb_violet_dark.png) 12 12 round";
            gameboys[i].style.borderImage = "url(../images/border_gb_violet_dark.png) 12 12 round";
        }
        for (var j = 0; j < gamegirls.length; j++) {
            //gamegirls[j].style.backgroundColor = "#F3FF00";
            gamegirls[j].style.WebkitBorderImage = "url(../images/border_gb_violet.png) 12 12 round";
            gamegirls[j].style.OBorderImage = "url(../images/border_gb_violet.png) 12 12 round";
            gamegirls[j].style.borderImage = "url(../images/border_gb_violet.png) 12 12 round";
        }
    }
    // Red > 400
    if (playerMoney >= 400) {
        var gameboys = document.querySelectorAll(".gameboy");
        var gamegirls = document.querySelectorAll(".gamegirl");
        for (var i = 0; i < gameboys.length; i++) {
            //gameboys[i].style.backgroundColor = "#F3FF00";
            gameboys[i].style.WebkitBorderImage = "url(../images/border_gb_red_dark.png) 12 12 round";
            gameboys[i].style.OBorderImage = "url(../images/border_gb_red_dark.png) 12 12 round";
            gameboys[i].style.borderImage = "url(../images/border_gb_red_dark.png) 12 12 round";
        }
        for (var j = 0; j < gamegirls.length; j++) {
            //gamegirls[j].style.backgroundColor = "#F3FF00";
            gamegirls[j].style.WebkitBorderImage = "url(../images/border_gb_red.png) 12 12 round";
            gamegirls[j].style.OBorderImage = "url(../images/border_gb_red.png) 12 12 round";
            gamegirls[j].style.borderImage = "url(../images/border_gb_red.png) 12 12 round";
        }
    }
}