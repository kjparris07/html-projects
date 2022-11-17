const nums = document.getElementsByClassName("numbers");

function start() {
    quicksort(0, nums.length-1);
}
function quicksort(lo, hi) {
    var pivot = lo++;
    if (lo <= hi) {
        var index = partition(pivot, lo, hi);
        quicksort(pivot, index - 1);
        quicksort(index + 1, hi);
    }
}

function partition(pivot, lo, hi) {
    var pivotVal = parseInt(nums[pivot].innerHTML);
    var loVal = parseInt(nums[lo].innerHTML);
    var hiVal = parseInt(nums[hi].innerHTML);

    while (lo < nums.length - 1 && loVal <= pivotVal) {
        loVal = parseInt(nums[++lo].innerHTML);
    }

    while (hi > 0 && hiVal > pivotVal) {
        hiVal = parseInt(nums[--hi].innerHTML);
    }

    if (lo < hi) {
        var temp = loVal;
        nums[lo].innerHTML = hiVal;
        nums[hi].innerHTML = temp;
        return partition(pivot, lo, hi);
    } else {
        nums[pivot].innerHTML = hiVal;
        nums[hi].innerHTML = pivotVal;
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
