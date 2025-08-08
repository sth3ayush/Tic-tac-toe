var boxes = document.querySelectorAll(".box");
var decWin = document.querySelector(".dec-winner");
var popup = document.querySelector(".pop-up");
var newBtn = document.querySelector(".new-btn");
var resetBtn = document.querySelector(".reset-btn");
var countPlay = 0;

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
    countPlay = 0;
});

newBtn.addEventListener("click", () => {
    for (const box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
        box.style.backgroundColor = "#E9ECEF";
        popup.classList.add("hidden");
        resetBtn.classList.remove("hidden");
    }
    countPlay = 0;
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

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO === true) {
            turnX = true;
            turnO = false;
            box.innerHTML = "O";
        } else {
            turnO = true;
            turnX = false;
            box.innerHTML = "X";
        }
        box.disabled = true;
        box.style.backgroundColor = "#DEE2E6"

        if (box.innerText === "X") {
            box.style.color = "#9D0208";
        } else {
            box.style.color = "#212529";
        }
        countPlay++;
        checkWinner();
    })
});

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
    checkDraw();
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

const checkDraw = () => {
    if (countPlay >= 9) {
        decWin.innerHTML = `It's a Draw. Try Again`;
        popup.classList.remove("hidden");
        resetBtn.classList.add("hidden");
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