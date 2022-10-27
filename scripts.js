var score = 0;
var max = 0;

var learn = false;

function toggleLearn() {
    if (learn) {
        learn = false;
        console.log("learn mode turned off");
    } else {
        learn = true;
        console.log("learn mode turned on");
    }
}

// sets the color of the box to a random rgb value
function setColor() {
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    var rgb = "rgb(" + r + ", " + g + ", " + b + ")";

    document.getElementById('color-box').style.backgroundColor = rgb;
    console.log(rgb);
    console.log(convertToGreyScale(rgb));
}

// checks the input guess with the correct greyscale value
function checkGuess() {
    document.getElementById('check').style.display = "none";
    document.getElementById('guess').disabled = "true";
    var guess = document.getElementById('range-val').innerHTML;

    var color = document.getElementById('color-box').style.backgroundColor;
    var greyscale = convertToGreyScale(color);
    document.getElementById('actual-range').value = greyscale;
    document.getElementById('actual').innerHTML = greyscale;
    document.getElementById('category').innerHTML = getCategory(greyscale);

    setGrey(greyscale);
    document.getElementById('next').style.display = "block";

    // scoring method 1: adding a point for a guess within 5 of the actual (higher score = better)
    var diff = Math.abs(greyscale-guess);
    var points = 0;

    if (diff <= 5) {
        points = 5;
    } else if (diff <= 15) {
        points = 3;
    } else if (diff <= 30) {
        points = 1;
    }
    max += 5;
    score += points;

    if (points == 1) {
        document.getElementById('points').innerHTML = "+" + points + " point";
    } else {
        document.getElementById('points').innerHTML = "+" + points + " points";
    }
    document.getElementById('score').innerHTML = "score: " + score + "/" + max;
}

// sets up for the next color
function next() {
    document.getElementById('right').style.visibility = "hidden";
    document.getElementById('next').style.display = "none";
    document.getElementById('actual').innerHTML = "";
    document.getElementById('points').innerHTML = "";
    document.getElementById('guess').value = 127;
    document.getElementById('range-val').innerHTML = 127;
    document.getElementById('check').style.display = "block";
    enableRange('guess');
    setColor();
}

// makes the right box visible and sets it to the calculated greyscale value
function setGrey(grey) {
    var str = "rgb(" + grey + "," + grey + "," + grey + ")";
    document.getElementById('grey-box').style.backgroundColor = str;
    document.getElementById('right').style.visibility = "visible";
}

// returns the greyscale value of the input rgb
function convertToGreyScale(color) {
    const split = color.split(",");

    // gets the individual values from the rgb string (ex: rgb(120, 8, 40))
    var r = split[0].slice(4);
    var g = split[1].slice(1);
    var b = split[2].slice(1,split[2].length-1);

    // generates the greyscale value using the weighted luminosity formula
    var grayscale = Math.floor(0.3*r + 0.59*g + 0.11*b);
    return grayscale;
}

// returns the category of the input greyscale value (very dark to very light)
function getCategory(grey) {
    if (grey <= 51) return "very dark";
    if (grey <= 102) return "dark";
    if (grey <= 136) return "medium";
    if (grey <= 187) return "light";
    return "very light";
}

// updates the text to the current range value
function updateRangeVal() {
    var val = document.getElementById('guess').value;
    document.getElementById('range-val').innerHTML = val;
    document.getElementById('category-guess').innerHTML = getCategory(val);
}

function enableRange(id) {
    console.log(id);
    document.getElementById(id).disabled = false;
}
