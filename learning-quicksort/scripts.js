const nums = document.getElementsByClassName("numbers");

var n;
var iterate = 0;

function start() {
    console.log(partition(0, 1, nums.length - 1));
}

function partition(pivot, lo, hi) {
    var pivotVal = parseInt(nums[pivot].innerHTML);
    var loVal = parseInt(nums[lo].innerHTML);
    var hiVal = parseInt(nums[hi].innerHTML);

    while (lo < nums.length && loVal <= pivotVal) {
        loVal = parseInt(nums[++lo].innerHTML);
    }

    while (hi >= 0 && hiVal > pivotVal) {
        hiVal = parseInt(nums[--hi].innerHTML);
    }

    if (lo < hi) {
        var temp = loVal;
        nums[lo].innerHTML = hiVal;
        nums[hi].innerHTML = temp;
        return partition(pivot, lo, hi);
    } else {
        nums[hi].style.backgroundColor = "black";
        nums[hi].style.color = "white";

        nums[pivot].innerHTML = hiVal;
        nums[hi].innerHTML = pivotVal;
        n = hi;
        return hi;
    }
}

function newNums() {
    for (var i=0; i < nums.length; i++) {
        nums[i].innerHTML = Math.floor(Math.random() * 100);
        nums[i].style.backgroundColor = "white";
        nums[i].style.color = "black";
    }
}
