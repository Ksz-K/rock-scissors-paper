(function () {
    var draw;
    var drawn;
    var drawnID = "";
    var sequanceOfDrawn = [1];
    var manPoints = 0;
    var iaPoints = 0;
    var deuce = 0;

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
        console.log('draw ' + draw);
        console.log(drawn);
        console.log(sequanceOfDrawn.length);


        if (document.querySelector(`#${drawnID}`).classList.contains('hover_simulation')) {
            document.getElementById(drawnID).classList.remove('hover_simulation')
        } else {
            document.getElementById(drawnID).classList.add('hover_simulation');
            await resolveAfter1Seconds(1);
            document.getElementById(drawnID).classList.remove('hover_simulation');
        }
    }
    var startHoverSimulation = setInterval(simulateHover, 1100);
    simulateHover();

    function markChoices() {
        clearInterval(startHoverSimulation);
        if (document.querySelector(`#${drawnID}`).classList.contains('hover_simulation')) {
            document.getElementById(drawnID).classList.remove('hover_simulation')
            document.getElementById(drawnID).classList.add('choosen')
        } else {
            document.getElementById(drawnID).classList.add('choosen')
        }
    }

    function whoWin(manChoice) {
        switch (true) {
            case manChoice == 1 && drawn == 1:
                markChoices();
                document.getElementById('winnerInfo').innerHTML = "REMIS";
                document.getElementById('resultPicture').src = "images/rr.jpg";
                deuce = 1;
                break;

            case manChoice == 2 && drawn == 2:
                markChoices();
                document.getElementById('winnerInfo').innerHTML = "REMIS";
                document.getElementById('resultPicture').src = "images/pp.jpg";
                deuce = 1;
                break;

            case manChoice == 3 && drawn == 3:
                markChoices();
                document.getElementById('winnerInfo').innerHTML = "REMIS";
                document.getElementById('resultPicture').src = "images/ss.jpg";
                deuce = 1;
                break;

            case manChoice == 1 && drawn == 2:
                markChoices();
                document.getElementById('winnerInfo').innerHTML = "Computer WON !!!";
                document.getElementById('resultPicture').src = "images/rp.jpg";
                iaPoints++
                break;

            case manChoice == 1 && drawn == 3:
                markChoices();
                document.getElementById('winnerInfo').innerHTML = "You WON !!!";
                document.getElementById('resultPicture').src = "images/rs.jpg";
                manPoints++
                break;

            case manChoice == 2 && drawn == 1:
                markChoices();
                document.getElementById('winnerInfo').innerHTML = "You WON !!!";
                document.getElementById('resultPicture').src = "images/pr.jpg";
                manPoints++
                break;

            case manChoice == 2 && drawn == 3:
                markChoices();
                document.getElementById('winnerInfo').innerHTML = "Computer WON !!!";
                document.getElementById('resultPicture').src = "images/ps.jpg";
                iaPoints++
                break;

            case manChoice == 3 && drawn == 1:
                markChoices();
                document.getElementById('winnerInfo').innerHTML = "Computer WON !!!";
                document.getElementById('resultPicture').src = "images/sr.jpg";
                iaPoints++
                break;

            case manChoice == 3 && drawn == 2:
                markChoices();
                document.getElementById('winnerInfo').innerHTML = "You WON !!!";
                document.getElementById('resultPicture').src = "images/sp.jpg";
                manPoints++
                break;
        }

        var pointPoints;
        if (iaPoints > 1 || manPoints > 1) {
            pointPoints = 'Points';
        } else { pointPoints = 'Point' };

        document.getElementById('manScore').innerHTML = `You:${manPoints} ${pointPoints}`;
        document.getElementById('iaScore').innerHTML = `You:${iaPoints} ${pointPoints}`;
    }

    document.getElementById('r_man').addEventListener('click', function () {
        whoWin(1);
    })
    document.getElementById('p_man').addEventListener('click', function () {
        whoWin(2);
    })
    document.getElementById('s_man').addEventListener('click', function () {
        whoWin(3);
    })

    document.getElementById('reStart').addEventListener('click', function () {
        location.reload();
    });

    document.getElementById('continue').addEventListener('click', function () {
        document.getElementById(drawnID).classList.remove('choosen');
        document.getElementById('winnerInfo').innerHTML = "Rozgrywka w toku";


        startHoverSimulation = setInterval(simulateHover, 1100);
        simulateHover();
    });




})();