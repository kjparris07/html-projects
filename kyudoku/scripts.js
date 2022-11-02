var puzzles = ["642359538441173319[1]24587358731931636", "267442244599857158429549425882[5]62325"];

var inputList = document.getElementsByTagName('input');

var key;

var arr = new Array(36);

for (let i=0; i<36; i++) {
    arr[i] = inputList[i];
}

var lightred = "rgb(222, 95, 95)";

function toggle() {
    var color = event.target.style.backgroundColor;
    if (color == "") {
        event.target.style.backgroundColor = "gray";
    } else if (color == "gray") {
        event.target.style.backgroundColor = "lightgreen";
        // check(event.target);
    } else {
        event.target.style.backgroundColor = "";
    }
    check(event.target);
}

function enable() {
    for (let i=0; i<inputList.length-1; i++) {
        inputList[i].disabled = false;
    }
}

function disable() {
    for (let i=0; i<inputList.length-1; i++) {
        inputList[i].disabled = true;
    }
}

function fill() {
    reset();
    var nums = document.getElementById('fillBox').value;
    var listIndex = 0;

    if (key != null) {
        document.getElementsByTagName('div')[key].setAttribute("onclick", "toggle()");
    }

    for (let i=0; i<nums.length; i++) {
        if (nums.charAt(i) == '[') {
            i++;
            inputList[listIndex].value = nums.charAt(i);
            inputList[listIndex].style.backgroundColor = "gold";
            key = parseInt(listIndex + listIndex/6 + 1);
            document.getElementsByTagName('div')[parseInt(listIndex + listIndex/6 + 1)].onclick="";
            i++;
        } else {
            inputList[listIndex].value = nums.charAt(i);
        }
        listIndex++;
    }
    disable();
}

function check(target) {
    // 0  1  2  3  4  5
    // 6  7  8  9  10 11
    // 12 13 14 15 16 17
    // 18 19 20 21 22 23
    // 24 25 26 27 28 29
    // 30 31 32 33 34 35

    var item = getIndex(target);
    var focus = inputList[item];

    var sum = 0;
    var column = new Array();

    // above
    var index = item - 6;
    while (index >= 0) {
        var compare = inputList[index];
        if (compare.style.backgroundColor == "lightgreen") {
            sum += parseInt(compare.value);
            column.push(parseInt(index));
        }
        index -= 6;
    }

    // below
    index = item + 6;
    while (index < 36) {
        var compare = inputList[index];
        if (compare.style.backgroundColor == "lightgreen") {
            sum += parseInt(compare.value);
            column.push(index);
        }
        index += 6;
    }

    if (focus.style.backgroundColor == "lightgreen") {
        sum += parseInt(focus.value);
        column.push(item);
        if (sum > 9) {
            redBorderOn(column);
        }
    } else if (sum <= 9) {
        column.push(item);
        redBorderOff(column);
    }

    sum = 0;
    var row = new Array();

    // left
    index = item - 1;
    var mod = item % 6;

    while (mod > 0) {
        var compare = inputList[index];
        if(compare.style.backgroundColor == "lightgreen") {
            sum += parseInt(compare.value);
            row.push(parseInt(index));
        }
        mod--;
        index--;
    }

    // right
    index = item + 1;
    mod = 5 - (item % 6);

    while (mod > 0) {
        var compare = inputList[index];
        if (compare.style.backgroundColor == "lightgreen") {
            sum += parseInt(compare.value);
            row.push(parseInt(index));
        }
        mod--;
        index++;
    }

    if (focus.style.backgroundColor == "lightgreen") {
        sum += parseInt(focus.value);
        row.push(item);
        if (sum > 9) {
            redBorderOn(row);
        }
    } else if (sum <= 9) {
        row.push(item);
        redBorderOff(row);
    }
}

function getIndex(target) {
    for (let i=0; i<arr.length; i++) {
        if (target === arr[i]) return i;
    }
    return -1;
}

function redBorderOn(arr) {
    for (let i=0; i < arr.length; i++) {
        inputList[arr[i]].style.borderColor = lightred;
    }
}

function redBorderOff(arr) {
    for (let i=0; i < arr.length; i++) {
        inputList[arr[i]].style.borderColor = "gray";
    }
}

function reset() {
    for (let i=0; i < 36; i++) {
        if (inputList[i].style.backgroundColor != "gold") {
            inputList[i].style.backgroundColor = "";
            inputList[i].style.borderColor = "gray";
        }
    }
}
