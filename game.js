let audioFiles = {
    blue: new Audio("sounds/blue.mp3"),
    green: new Audio("sounds/green.mp3"),
    red: new Audio("sounds/red.mp3"),
    yellow: new Audio("sounds/yellow.mp3"),
    wrong: new Audio("sounds/wrong.mp3")
};

let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

//On click sound
function playSound(color) {
    if (audioFiles[color]) {
        audioFiles[color].play();
    }
}

//On click animation
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Register the color the user clicked in an array and trigger sound and animation
$(".btn").on("click", function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern[userClickedPattern.length - 1]);
});

// Check if game was started and start it if a key is pressed
let gameStarted = false;
$(document).on("keypress", function() {
    if (!gameStarted) {
        nextSequence();
        gameStarted = true;
    }
});

// Compute and animate the next step in the sequence
let level = 0;
function nextSequence() {
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("h1").text(`Level ${level}`);
}

//Check if the correct sequence was followed and continue or end the game
function checkAnswer(currentLevel) {
    if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        gameStarted = false;
    }
}
