"use strict";
(function() {
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
  var farewall = "";
  var playHistory = [];
  var r_man = function() {
    whoWin(1);
  };
  var p_man = function() {
    whoWin(2);
  };
  var s_man = function() {
    whoWin(3);
  };

  var maxPlays = parseFloat(
    window.prompt(
      "Czy chesz ustalić ilość rozgrywek ? \nJeśli tak wpisz ją - jeśli nie wpisz cokolwiek i włącz Training Mode."
    )
  );

  if (!isNaN(maxPlays)) {
    maxPlayToGame = maxPlays;
  } else {
    maxPlayToGame = 999999;
  }

  function computerPlay() {
    draw = Math.floor(Math.random() * 3 + 1);
    sequanceOfDrawn.push(draw);
    drawn = sequanceOfDrawn[sequanceOfDrawn.length - 2];
  }

  function resolveAfter1Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 888);
    });
  }

  async function simulateHover() {
    document
      .getElementById("continue")
      .removeEventListener("click", initializeContinue);
    computerPlay();
    if (drawn == 1) {
      drawnID = "r_ia";
    } else if (drawn == 2) {
      drawnID = "p_ia";
    } else {
      drawnID = "s_ia";
    }

    if (
      document
        .querySelector(`#${drawnID}`)
        .classList.contains("hover_simulation")
    ) {
      document.getElementById(drawnID).classList.remove("hover_simulation");
    } else {
      document.getElementById(drawnID).classList.add("hover_simulation");
      await resolveAfter1Seconds(1);
      document.getElementById(drawnID).classList.remove("hover_simulation");
    }
  }

  function markChoices() {
    clearInterval(startHoverSimulation);

    if (draw === 1) {
      drawID = "r_ia";
    } else if (draw === 2) {
      drawID = "p_ia";
    } else {
      drawID = "s_ia";
    }

    if (
      document
        .querySelector(`#${drawID}`)
        .classList.contains("hover_simulation")
    ) {
      document.getElementById(drawID).classList.remove("hover_simulation");
      document.getElementById(drawID).classList.add("choosen");
    } else {
      document.getElementById(drawID).classList.add("choosen");
    }
  }

  function setupBoardgameInfo() {
    var manPointPoints;
    if (manPoints > 1) {
      manPointPoints = "Points";
    } else {
      manPointPoints = "Point";
    }

    var iaPointPoints;
    if (iaPoints > 1) {
      iaPointPoints = "Points";
    } else {
      iaPointPoints = "Point";
    }

    for (let i = 0; i <= sequanceOfResult.length; i++) {
      if (i < sequanceOfResult.length) {
        if (sequanceOfResult[i] === "man") {
          manWon++;
          if (manWon > manWonSeries) {
            manWonSeries = manWon;
          }
        } else {
          manWon = 0;
        }

        if (sequanceOfResult[i] === "ia") {
          iaWon++;
          if (iaWon > iaWonSeries) {
            iaWonSeries = iaWon;
          }
        } else {
          iaWon = 0;
        }

        if (sequanceOfResult[i] === "deuce") {
          deuce++;
          if (deuce > deuceSeries) {
            deuceSeries = deuce;
          }
        } else {
          deuce = 0;
        }
      } else {
        manWon = 0;
        iaWon = 0;
        deuce = 0;
      }
    }

    document.getElementById(
      "manWonSeries"
    ).innerHTML = `Najdłuższa seria Twoich wygranych to: ${manWonSeries}`;
    document.getElementById(
      "iaWonSeries"
    ).innerHTML = `Najdłuższa seria wygranych AI to: ${iaWonSeries}`;
    document.getElementById(
      "deuceSeries"
    ).innerHTML = `Najdłuższa seria remisów to: ${deuceSeries}`;

    document.getElementById(
      "manScore"
    ).innerHTML = `You:${manPoints} ${manPointPoints}`;
    document.getElementById(
      "iaScore"
    ).innerHTML = `Computer:${iaPoints} ${iaPointPoints}`;
  }

  function recordHistory(manChoice, draw, manPoints, iaPoints) {
    manChoice === 1
      ? (manChoice = "Rock")
      : manChoice === 2
      ? (manChoice = "Paper")
      : (manChoice = "Scissor");

    draw === 1
      ? (draw = "Rock")
      : draw === 2
      ? (draw = "Paper")
      : (draw = "Scissor");

    playHistory.push({
      manMove: manChoice,
      iaMove: draw,
      score: sequanceOfResult[sequanceOfResult.length - 1],
      scoreNow: `${manPoints} : ${iaPoints}`
    });
  }
  function whoWin(manChoice) {
    silentPlayCards();
    document
      .getElementById("continue")
      .addEventListener("click", initializeContinue);

    switch (true) {
      case manChoice === 1 && draw === 1:
        markChoices();
        document.getElementById("winnerInfo").innerHTML = "REMIS";
        document.getElementById("resultPicture").src = "images/rr.jpg";
        sequanceOfResult.push("deuce");
        break;

      case manChoice === 2 && draw === 2:
        markChoices();
        document.getElementById("winnerInfo").innerHTML = "REMIS";
        document.getElementById("resultPicture").src = "images/pp.jpg";
        sequanceOfResult.push("deuce");
        break;

      case manChoice === 3 && draw === 3:
        markChoices();
        document.getElementById("winnerInfo").innerHTML = "REMIS";
        document.getElementById("resultPicture").src = "images/ss.jpg";
        sequanceOfResult.push("deuce");
        break;

      case manChoice === 1 && draw === 2:
        markChoices();
        document.getElementById("winnerInfo").innerHTML = "Computer WON !!!";
        document.getElementById("resultPicture").src = "images/rp.jpg";
        iaPoints++;
        sequanceOfResult.push("ia");
        break;

      case manChoice === 1 && draw === 3:
        markChoices();
        document.getElementById("winnerInfo").innerHTML = "You WON !!!";
        document.getElementById("resultPicture").src = "images/rs.jpg";
        manPoints++;
        sequanceOfResult.push("man");
        break;

      case manChoice === 2 && draw === 1:
        markChoices();
        document.getElementById("winnerInfo").innerHTML = "You WON !!!";
        document.getElementById("resultPicture").src = "images/pr.jpg";
        manPoints++;
        sequanceOfResult.push("man");
        break;

      case manChoice === 2 && draw === 3:
        markChoices();
        document.getElementById("winnerInfo").innerHTML = "Computer WON !!!";
        document.getElementById("resultPicture").src = "images/ps.jpg";
        iaPoints++;
        sequanceOfResult.push("ia");
        break;

      case manChoice === 3 && draw === 1:
        markChoices();
        document.getElementById("winnerInfo").innerHTML = "Computer WON !!!";
        document.getElementById("resultPicture").src = "images/sr.jpg";
        iaPoints++;
        sequanceOfResult.push("ia");
        break;

      case manChoice === 3 && draw === 2:
        markChoices();
        document.getElementById("winnerInfo").innerHTML = "You WON !!!";
        document.getElementById("resultPicture").src = "images/sp.jpg";
        manPoints++;
        sequanceOfResult.push("man");
        break;
    }
    recordHistory(manChoice, draw, manPoints, iaPoints);
    setupBoardgameInfo();
  }

  function initializePlayCards() {
    document.getElementById("r_man").addEventListener("click", r_man);
    document.getElementById("p_man").addEventListener("click", p_man);
    document.getElementById("s_man").addEventListener("click", s_man);
  }

  function silentPlayCards() {
    document.getElementById("r_man").removeEventListener("click", r_man);
    document.getElementById("p_man").removeEventListener("click", p_man);
    document.getElementById("s_man").removeEventListener("click", s_man);
  }

  document.getElementById("reStart").addEventListener("click", function() {
    location.reload();
  });

  function initializeContinue() {
    initializePlayCards();
    playNumber += 1;
    if (playNumber > maxPlayToGame) {
      gameEnd();
    }
    document.getElementById(
      "playNumber"
    ).innerHTML = `Rozgrywka numer: ${playNumber}`;
    document.getElementById(drawID).classList.remove("choosen");
    document.getElementById("winnerInfo").innerHTML = "Rozgrywka w toku";
    startHoverSimulation = setInterval(simulateHover, 1000);
    simulateHover();
  }

  function showModal() {
    document.getElementById("modal-overlay").classList.add("show");

    manPoints > iaPoints
      ? (farewall = "Zwycięstwo. GRATULACJE !!!")
      : iaPoints > manPoints
      ? (farewall = "Komputer lepszy. Potrenuj jeszcze.")
      : (farewall = "REMIS. Trzeba potrenować.");

    var data = [
      {
        content: `<p>Rozgrywka dobiegła końca. Rozegrano ${maxPlayToGame} rund.</p>`
      },
      { content: `<p>Twój wynik wynosi ${manPoints}.</p>` },
      { content: `<p>Wynik komputera to ${iaPoints}.</p>` },
      { content: `<p> ${farewall} </p>` }
      //{ content: `<p> Szczegółowy przebieg rozgrywki</p>` }
    ];

    for (let value of data) {
      document
        .getElementById("scoreBoard")
        .insertAdjacentHTML("beforeend", value.content);
    }
    /*
Code below creates SINGLE ROW table with PlayHistory - all the movements of players (man & ia)

    for (let val of playHistory) {
      document
        .getElementById("playCircle")
        .insertAdjacentHTML("beforeend", playHistory.indexOf(val) + 1 + "<br>");
      document
        .getElementById("manMove")
        .insertAdjacentHTML("beforeend", val.manMove + "<br>");
      document
        .getElementById("iaMove")
        .insertAdjacentHTML("beforeend", val.iaMove + "<br>");
      document
        .getElementById("winner")
        .insertAdjacentHTML("beforeend", val.score + "<br>");
    }
*/

    var table = document.getElementById("reviewGame");

    for (let val of playHistory) {
      var row = table.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      cell1.innerHTML = playHistory.indexOf(val) + 1;
      cell2.innerHTML = val.manMove;
      cell3.innerHTML = val.iaMove;
      cell4.innerHTML = val.score;
      cell5.innerHTML = val.scoreNow;
    }

    var createTD = document.getElementsByTagName("td");
    for (let ij = 0; ij < createTD.length; ij += 1) {
      let selected = createTD[ij];

      selected.innerText == "man"
        ? selected.parentElement.classList.add("green")
        : selected.innerText == "ia"
        ? selected.parentElement.classList.add("red")
        : "";
    }
  }

  function gameEnd() {
    var resetGame = document.getElementById("reStartGame");
    resetGame.addEventListener("click", function() {
      location.reload();
    });
    showModal();
  }

  var hideModal = function(event) {
    event.preventDefault();
    document.querySelector("#modal-overlay").classList.remove("show");
  };

  var closeButtons = document.querySelectorAll(".modal .close");

  for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener("click", hideModal);
  }

  var startHoverSimulation = setInterval(simulateHover, 1000);
  simulateHover();
  initializePlayCards();
})();
