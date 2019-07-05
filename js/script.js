"use strict";
(function () {
    var playNumber = 1;
    var draw;
    var drawn;
    var drawnID = "";
    var drawID = "";
    var sequanceOfDrawn = [1];
    var sequanceOfResult = [];
    var manPoints = 0;
    var iaPoints = 0;
    var manWon = 0;
    var iaWon = 0;
    var deuce = 0;
    var manWonSeries = 0;
    var iaWonSeries = 0;
    var deuceSeries = 0;
    var maxPlayToGame;
    var r_man = function () { whoWin(1) };
    var p_man = function () { whoWin(2) };
    var s_man = function () { whoWin(3) };
    var takeCare = "Brawo. U won !";


    var maxPlays = parseFloat(window.prompt("Czy chesz ustalić maksymalną ilość rozgrywek ? \nJeśli tak wpisz ją - jeśli nie wpisz cokolwiek bądź kliknij anuluj."));

    var startHoverSimulation = setInterval(simulateHover, 1100);
    simulateHover();
    initializePlayCards()


    if (!isNaN(maxPlays)) {
        maxPlayToGame = maxPlays;
    } else {
        maxPlayToGame = 999999;
    }

    function resolveAfter1Seconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, 1000);
        });
    }

    function computerPlay() {
        draw = Math.floor((Math.random() * 3) + 1);
        sequanceOfDrawn.push(draw);
        drawn = sequanceOfDrawn[sequanceOfDrawn.length - 2];
    }

    async function simulateHover() {
        computerPlay();
        if (drawn == 1) {
            drawnID = "r_ia";
        } else if (drawn == 2) {
            drawnID = "p_ia";
        } else {
            drawnID = "s_ia";
        };

        if (document.querySelector(`#${drawnID}`).classList.contains('hover_simulation')) {
            document.getElementById(drawnID).classList.remove('hover_simulation')
        } else {
            document.getElementById(drawnID).classList.add('hover_simulation');
            await resolveAfter1Seconds(1);
            document.getElementById(drawnID).classList.remove('hover_simulation');
        }
    }




    function markChoices() {
        clearInterval(startHoverSimulation);

        if (draw == 1) {
            drawID = "r_ia";
        } else if (draw == 2) {
            drawID = "p_ia";
        } else {
            drawID = "s_ia";
        };

        if (document.querySelector(`#${drawID}`).classList.contains('hover_simulation')) {
            document.getElementById(drawID).classList.remove('hover_simulation')
            document.getElementById(drawID).classList.add('choosen')
        } else {
            document.getElementById(drawID).classList.add('choosen')
        }
    }

    function setupBoardgameInfo() {

        var manPointPoints;
        if (manPoints > 1) {
            manPointPoints = 'Points';
        } else { manPointPoints = 'Point' };

        var iaPointPoints;
        if (iaPoints > 1) {
            iaPointPoints = 'Points';
        } else { iaPointPoints = 'Point' };


        for (let i = 0; i <= sequanceOfResult.length; i++) {
            if (i < sequanceOfResult.length) {

                if (sequanceOfResult[i] == 'man') {
                    manWon++;
                    if (manWon > manWonSeries) { manWonSeries = manWon; }
                } else { manWon = 0; }

                if (sequanceOfResult[i] == 'ia') {
                    iaWon++;
                    if (iaWon > iaWonSeries) { iaWonSeries = iaWon; }
                } else { iaWon = 0; }

                if (sequanceOfResult[i] == 'deuce') {
                    deuce++;
                    if (deuce > deuceSeries) { deuceSeries = deuce; }
                } else { deuce = 0; }
            } else {
                manWon = 0;
                iaWon = 0;
                deuce = 0;
            }
        };

        document.getElementById('manWonSeries').innerHTML = `Najdłuższa seria Twoich wygranych to: ${manWonSeries}`;
        document.getElementById('iaWonSeries').innerHTML = `Najdłuższa seria wygranych AI to: ${iaWonSeries}`;
        document.getElementById('deuceSeries').innerHTML = `Najdłuższa seria remisów to: ${deuceSeries}`;

        document.getElementById('manScore').innerHTML = `You:${manPoints} ${manPointPoints}`;
        document.getElementById('iaScore').innerHTML = `Computer:${iaPoints} ${iaPointPoints}`;
    }

    function whoWin(manChoice) {
        silentPlayCards();
        switch (true) {
            case manChoice == 1 && draw == 1:
                markChoices();
                document.getElementById('winnerInfo').innerHTML = "REMIS";
                document.getElementById('resultPicture').src = "images/rr.jpg";
                sequanceOfResult.push('deuce');
                break;

            case manChoice == 2 && draw == 2:
                markChoices();
                document.getElementById('winnerInfo').innerHTML = "REMIS";
                document.getElementById('resultPicture').src = "images/pp.jpg";
                sequanceOfResult.push('deuce');
                break;

            case manChoice == 3 && draw == 3:
                markChoices();
                document.getElementById('winnerInfo').innerHTML = "REMIS";
                document.getElementById('resultPicture').src = "images/ss.jpg";
                sequanceOfResult.push('deuce');
                break;

            case manChoice == 1 && draw == 2:
                markChoices();
                document.getElementById('winnerInfo').innerHTML = "Computer WON !!!";
                document.getElementById('resultPicture').src = "images/rp.jpg";
                iaPoints++
                sequanceOfResult.push('ia');
                break;

            case manChoice == 1 && draw == 3:
                markChoices();
                document.getElementById('winnerInfo').innerHTML = "You WON !!!";
                document.getElementById('resultPicture').src = "images/rs.jpg";
                manPoints++
                sequanceOfResult.push('man');
                break;

            case manChoice == 2 && draw == 1:
                markChoices();
                document.getElementById('winnerInfo').innerHTML = "You WON !!!";
                document.getElementById('resultPicture').src = "images/pr.jpg";
                manPoints++
                sequanceOfResult.push('man');
                break;

            case manChoice == 2 && draw == 3:
                markChoices();
                document.getElementById('winnerInfo').innerHTML = "Computer WON !!!";
                document.getElementById('resultPicture').src = "images/ps.jpg";
                iaPoints++
                sequanceOfResult.push('ia');
                break;

            case manChoice == 3 && draw == 1:
                markChoices();
                document.getElementById('winnerInfo').innerHTML = "Computer WON !!!";
                document.getElementById('resultPicture').src = "images/sr.jpg";
                iaPoints++
                sequanceOfResult.push('ia');
                break;

            case manChoice == 3 && draw == 2:
                markChoices();
                document.getElementById('winnerInfo').innerHTML = "You WON !!!";
                document.getElementById('resultPicture').src = "images/sp.jpg";
                manPoints++
                sequanceOfResult.push('man');
                break;
        }

        setupBoardgameInfo();

    }


    function initializePlayCards() {
        document.getElementById('r_man').addEventListener('click', r_man);
        document.getElementById('p_man').addEventListener('click', p_man);
        document.getElementById('s_man').addEventListener('click', s_man);
        document.getElementById('r_man').classList.add('manCard');
        document.getElementById('p_man').classList.add('manCard');
        document.getElementById('s_man').classList.add('manCard');

    }

    function silentPlayCards() {
        document.getElementById('r_man').removeEventListener('click', r_man);
        document.getElementById('p_man').removeEventListener('click', p_man);
        document.getElementById('s_man').removeEventListener('click', s_man);
        document.getElementById('r_man').classList.remove('manCard');
        document.getElementById('p_man').classList.remove('manCard');
        document.getElementById('s_man').classList.remove('manCard');
    }

    document.getElementById('reStart').addEventListener('click', function () {
        location.reload();
    });

    document.getElementById('continue').addEventListener('click', function () {
        initializePlayCards();
        playNumber++;
        if (playNumber > maxPlayToGame) {
            if (manPoints <= iaPoints) { takeCare = "Następnym razem będzie lepiej :)" }
            gameEnd();
        }
        document.getElementById('playNumber').innerHTML = `Rozgrywka numer: ${playNumber}`;
        document.getElementById(drawID).classList.remove('choosen');
        document.getElementById('winnerInfo').innerHTML = "Rozgrywka w toku";
        startHoverSimulation = setInterval(simulateHover, 1100);
        simulateHover();
    });

    function gameEnd() {
        window.alert("Rozgrywka dobiegła końca. Rezegrano " + maxPlayToGame + " rund." + "\nTwój wynik wynosi " + manPoints + "\nWynik komputera to " + iaPoints + "\n" + takeCare);
        location.reload();
    }


})();