let round = 1;
let team1Score = 0;
let team2Score = 0;

const button1 = document.querySelector('#button1')
const button2 = document.querySelector('#button2')
const button3 = document.querySelector('#button3')
const text = document.querySelector("#text");
const roundText = document.querySelector("#roundText");
const team1Text = document.querySelector("#team1Text");
const team2Text = document.querySelector("#team2Text");
const screens = [
    {
        name: "first kick",
        "button text": ["left", "middle", "right"],
        "button functions": [kickLeft, kickMiddle, kickRight],
        text: "You're up first! Pick a direction to aim your kick. If the opposing goalie goes the same way they may save it!"
    },
    {
        name: "first save",
        "button text": ["left", "middle", "right"],
        "button functions": [saveLeft, saveMiddle, saveRight],
        text: "Now it's your turn to block a shot! Pick a direction for your goalie to dive."
    },
    {
        name: "next kick",
        "button text": ["left", "middle", "right"],
        "button functions": [kickLeft, kickMiddle, kickRight],
        text: "Your turn to shoot again. Pick a direction to aim your kick."
    },
    {
        name: "next save",
        "button text": ["left", "middle", "right"],
        "button functions": [saveLeft, saveMiddle, saveRight],
        text: "Your turn to block a shot again. Pick a direction for your goalie to dive."
    },
    {
        name: "team 1 wins",
        "button text": ["Play Again?", "Play Again?", "Play Again?"],
        "button functions": [letsPlay, letsPlay, letsPlay],
        text: "You win!"
    },
    {
        name: "team 2 wins",
        "button text": ["Play Again?", "Play Again?", "Play Again?"],
        "button functions": [letsPlay, letsPlay, letsPlay],
        text: "You lose!"
    }
]
const goalieMoves = ["left", "middle", "right"];
const takerShots = ["left", "middle", "right"];

function update(screen) {
  button1.innerText = screen["button text"][0];
  button2.innerText = screen["button text"][1];
  button3.innerText = screen["button text"][2];
  button1.onclick = screen["button functions"][0];
  button2.onclick = screen["button functions"][1];
  button3.onclick = screen["button functions"][2];
  text.innerText = screen.text;
}

function addOnUpdate(screen) {
  button1.innerText = screen["button text"][0];
  button2.innerText = screen["button text"][1];
  button3.innerText = screen["button text"][2];
  button1.onclick = screen["button functions"][0];
  button2.onclick = screen["button functions"][1];
  button3.onclick = screen["button functions"][2];
  text.innerText += `\n\n${screen.text}`;
}

//initialize buttons
button1.onclick = letsPlay;
button2.onclick = letsPlay;
button3.onclick = letsPlay;

function letsPlay() {
    update(screens[0]);
    round = 1;
    team1Score = 0;
    team2Score = 0;
    roundText.innerHTML = round;
    team1Text.innerHTML = team1Score;
    team2Text.innerHTML = team2Score;
}

function goalieDive() {
    return goalieMoves[Math.floor(Math.random()*goalieMoves.length)]
}

function shooterKick() {
    return takerShots[Math.floor(Math.random()*takerShots.length)]
}

function kickLeft() {
    let diveDirection = goalieDive();
    let kickDirection = "left";
    
    //checking for score or save
    checkForScore(diveDirection, kickDirection)
    
    //checking score
    checkScoreAfterFirstKick();
}

function kickMiddle() {
    let diveDirection = goalieDive();
    let kickDirection = "middle";
    
    //checking for score or save
    checkForScore(diveDirection, kickDirection)
    
    //checking score
    checkScoreAfterFirstKick();
}

function kickRight() {
    let diveDirection = goalieDive();
    let kickDirection = "right";
    
    //checking for score or save
    checkForScore(diveDirection, kickDirection)
    
    //checking score
    checkScoreAfterFirstKick();
}

function saveLeft() {
    //initialize the kick and dive directions
    let kickDirection = shooterKick();
    let diveDirection = "left";

    //checking for save or score
    checkForSave(kickDirection, diveDirection)

    //checking score
    checkScoreAfterRound();

    //incrementing round
    incrementRound();
}

function saveMiddle() {
    //initialize the kick and dive directions
    let kickDirection = shooterKick();
    let diveDirection = "middle";

    //checking for save or score
    checkForSave(kickDirection, diveDirection)

    //checking score
    checkScoreAfterRound();

    //incrementing round
    incrementRound();
}

function saveRight() {
    //initialize the kick and dive directions
    let kickDirection = shooterKick();
    let diveDirection = "right";

    //checking for save or score
    checkForSave(kickDirection, diveDirection)

    //checking score
    checkScoreAfterRound();

    //incrementing round
    incrementRound();
}

function checkForScore(diveDirection, kickDirection) {
    if (kickDirection == diveDirection) {
        text.innerText = `Save! The keeper went ${diveDirection} and stopped the shot.`;
    } else {
        text.innerText = `Score! The keeper went ${diveDirection} but you put it past him to the ${kickDirection}`;
        team1Score += 1;
        team1Text.innerText = team1Score;
    }
}

function checkForSave(kickDirection, diveDirection) {
    if (kickDirection == diveDirection) {
        text.innerText = `Save! You shot ${kickDirection} and the keeper stopped the shot.`;
    } else {
        text.innerText = `Score! You shot ${kickDirection} but the keeper dove ${diveDirection}.`;
        team2Score += 1;
        team2Text.innerText = team2Score;
    }
}

function checkScoreAfterRound() {
    if (round >= 5 && team1Score > team2Score) {
        update(screens[4]);
    } else if (round >= 5 && team2Score > team1Score) {
        update(screens[5]);
    } else if (round == 4 && team1Score > team2Score + 1) {
        update(screens[4]);
    } else if (round == 4 && team2Score > team1Score + 1) {
        update(screens[5]);
    } else if (round == 3 && team1Score > team2Score + 2) {
        update(screens[4]);
    } else if (round == 3 && team2Score > team1Score + 2) {
        update(screens[5]);
    } else {
        addOnUpdate(screens[2]);
    }
}

function checkScoreAfterFirstKick() {
    if (round >= 5 && team1Score > team2Score + 1) {
        update(screens[4]);
    } else if (round >= 5 && team2Score > team1Score) {
        update(screens[5]);
    } else if (round == 4 && team1Score > team2Score + 2) {
        update(screens[4]);
    } else if (round == 4 && team2Score > team1Score + 1) {
        update(screens[5]);
    } else if (round == 1) {
        addOnUpdate(screens[1]);
    } else {
        addOnUpdate(screens[3]);
    }
}


function incrementRound () {
    round += 1;
    roundText.innerText = round;
}