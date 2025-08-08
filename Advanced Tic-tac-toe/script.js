var boxes = document.querySelectorAll(".box");
var decWin = document.querySelector(".dec-winner");
var popup = document.querySelector(".pop-up");
var newBtn = document.querySelector(".new-btn");
var resetBtn = document.querySelector(".reset-btn");
var posX = [];
var posO = [];
var count = 0;
var temp;

popup.classList.add("hidden");

var turnO = true;
var turnX = false;

let offsetX, offsetY;

resetBtn.addEventListener("click", () => {
    for (const box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
        box.style.backgroundColor = "#E9ECEF";
        popup.classList.add("hidden");
    };
    count = 0;
    posX = [];
    posO = [];
});

newBtn.addEventListener("click", () => {
    for (const box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
        box.style.backgroundColor = "#E9ECEF";
        popup.classList.add("hidden");
        resetBtn.classList.remove("hidden");
    }
    count = 0;
    posX = [];
    posO = [];
});

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [2, 5, 8],
    [6, 7, 8],
    [2, 4, 6],
    [1, 4, 7],
    [3, 4, 5],
];

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (count <= 5) {
            play(box, index, count);
        } else {
            play(box, index, count);
        }
        count++;
        checkWinner();
    })
});

const play = (box, index, count) => {
    if (count <= 5) {
        if (turnO === true) {
            turnX = true;
            turnO = false;
            box.innerHTML = "O";
            posO.push(index);
        } else {
            turnO = true;
            turnX = false;
            box.innerHTML = "X";
            posX.push(index);
        }
    } else {
        if (turnO === true) {
            turnX = true;
            turnO = false;
            box.innerHTML = "O";
            let boxO = boxes[posO[0]];
            boxO.innerHTML = "";
            boxO.disabled = false;
            boxO.style.backgroundColor = "#E9ECEF"
            posO.shift();
            posO.push(index);
        } else {
            turnO = true;
            turnX = false;
            box.innerHTML = "X";
            let boxX = boxes[posX[0]];
            boxX.innerHTML = "";
            boxX.disabled = false;
            boxX.style.backgroundColor = "#E9ECEF"
            posX.shift();
            posX.push(index);
        }
    }
    box.disabled = true;
    box.style.backgroundColor = "#DEE2E6"

    if (box.innerText === "X") {
        box.style.color = "#9D0208";
    } else {
        box.style.color = "#212529";
    }
}

const checkWinner = () => {
    for (const pattern of winPattern) {
        let val1 = boxes[pattern[0]].innerHTML;
        let val2 = boxes[pattern[1]].innerHTML;
        let val3 = boxes[pattern[2]].innerHTML;

        if (val1 != "" && val2 != "" && val3 != "") {
            if (val1 === val2 && val1 === val3) {
                showWinner(val1);
                return;
            }
        }
    }
}

const showWinner = (val1) => {
    decWin.innerHTML = `Congrats! Winner is ${val1}`;
    popup.classList.remove("hidden");
    resetBtn.classList.add("hidden");
    for (const box of boxes) {
        box.disabled = true;
        box.style.backgroundColor = "#DEE2E6"
    }
}

popup.addEventListener("mousedown", (e) => {
    offsetX = e.clientX - popup.offsetLeft;
    offsetY = e.clientY - popup.offsetTop;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
});

function mouseMove(e) {
    popup.style.left = `${e.clientX - offsetX}px`;
    popup.style.top = `${e.clientY - offsetY}px`;
}

function mouseUp() {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
}