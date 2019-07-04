var draw;
var drawn;
var drawnID = "";
var sequanceOfDrawn = [1];

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

function whoWin(manChoice) {
    switch (true) {
        case manChoice == 1 && drawn == 1:
            clearInterval(startHoverSimulation);
            if (document.querySelector(`#${drawnID}`).classList.contains('hover_simulation')) {
                document.getElementById(drawnID).classList.remove('hover_simulation')
                document.getElementById(drawnID).classList.add('choosen')
            } else {
                document.getElementById(drawnID).classList.add('choosen')
            }
            document.getElementById('winnerInfo').innerHTML = "REMIS";
            document.getElementById('resultPicture').src = "images/rr.jpg";
            break;

        case manChoice == 2 && drawn == 2:
            clearInterval(startHoverSimulation);
            if (document.querySelector(`#${drawnID}`).classList.contains('hover_simulation')) {
                document.getElementById(drawnID).classList.remove('hover_simulation')
                document.getElementById(drawnID).classList.add('choosen')
            } else {
                document.getElementById(drawnID).classList.add('choosen')
            }
            document.getElementById('winnerInfo').innerHTML = "REMIS";
            document.getElementById('resultPicture').src = "images/pp.jpg";
            break;

        case manChoice == 3 && drawn == 3:
            clearInterval(startHoverSimulation);
            if (document.querySelector(`#${drawnID}`).classList.contains('hover_simulation')) {
                document.getElementById(drawnID).classList.remove('hover_simulation')
                document.getElementById(drawnID).classList.add('choosen')
            } else {
                document.getElementById(drawnID).classList.add('choosen')
            }
            document.getElementById('winnerInfo').innerHTML = "REMIS";
            document.getElementById('resultPicture').src = "images/ss.jpg";
            break;

        case manChoice == 1 && drawn == 2:
            clearInterval(startHoverSimulation);
            if (document.querySelector(`#${drawnID}`).classList.contains('hover_simulation')) {
                document.getElementById(drawnID).classList.remove('hover_simulation')
                document.getElementById(drawnID).classList.add('choosen')
            } else {
                document.getElementById(drawnID).classList.add('choosen')
            }
            document.getElementById('winnerInfo').innerHTML = "Computer WON !!!";
            document.getElementById('resultPicture').src = "images/rp.jpg";
            break;

        case manChoice == 1 && drawn == 3:
            clearInterval(startHoverSimulation);
            if (document.querySelector(`#${drawnID}`).classList.contains('hover_simulation')) {
                document.getElementById(drawnID).classList.remove('hover_simulation')
                document.getElementById(drawnID).classList.add('choosen')
            } else {
                document.getElementById(drawnID).classList.add('choosen')
            }
            document.getElementById('winnerInfo').innerHTML = "You WON !!!";
            document.getElementById('resultPicture').src = "images/rs.jpg";
            break;

        case manChoice == 2 && drawn == 1:
            clearInterval(startHoverSimulation);
            if (document.querySelector(`#${drawnID}`).classList.contains('hover_simulation')) {
                document.getElementById(drawnID).classList.remove('hover_simulation')
                document.getElementById(drawnID).classList.add('choosen')
            } else {
                document.getElementById(drawnID).classList.add('choosen')
            }
            document.getElementById('winnerInfo').innerHTML = "You WON !!!";
            document.getElementById('resultPicture').src = "images/pr.jpg";
            break;

        case manChoice == 2 && drawn == 3:
            clearInterval(startHoverSimulation);
            if (document.querySelector(`#${drawnID}`).classList.contains('hover_simulation')) {
                document.getElementById(drawnID).classList.remove('hover_simulation')
                document.getElementById(drawnID).classList.add('choosen')
            } else {
                document.getElementById(drawnID).classList.add('choosen')
            }
            document.getElementById('winnerInfo').innerHTML = "Computer WON !!!";
            document.getElementById('resultPicture').src = "images/ps.jpg";
            break;

        case manChoice == 3 && drawn == 1:
            clearInterval(startHoverSimulation);
            if (document.querySelector(`#${drawnID}`).classList.contains('hover_simulation')) {
                document.getElementById(drawnID).classList.remove('hover_simulation')
                document.getElementById(drawnID).classList.add('choosen')
            } else {
                document.getElementById(drawnID).classList.add('choosen')
            }
            document.getElementById('winnerInfo').innerHTML = "Computer WON !!!";
            document.getElementById('resultPicture').src = "images/sr.jpg";
            break;

        case manChoice == 3 && drawn == 2:
            clearInterval(startHoverSimulation);
            if (document.querySelector(`#${drawnID}`).classList.contains('hover_simulation')) {
                document.getElementById(drawnID).classList.remove('hover_simulation')
                document.getElementById(drawnID).classList.add('choosen')
            } else {
                document.getElementById(drawnID).classList.add('choosen')
            }
            document.getElementById('winnerInfo').innerHTML = "You WON !!!";
            document.getElementById('resultPicture').src = "images/sp.jpg";
            break;
    }
}

document.getElementById('r_man').addEventListener('click', function () {
    whoWin(1);
})

