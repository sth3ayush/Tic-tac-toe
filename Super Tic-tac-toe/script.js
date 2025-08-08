var popup = document.querySelector(".pop-up");
var boxContainers = document.querySelectorAll(".box-container");
var decWin = document.querySelector(".dec-winner");
var wPattern = Array(boxContainers.length).fill("");
var newBtn = document.querySelector(".new-btn")
var resetBtn = document.querySelector(".reset-btn");
var turnDisplay = document.querySelector(".turn");
var cheer1 = document.querySelector("#cheer1");
var cheer2 = document.querySelector("#cheer2");
var draw = document.querySelector("#draw");
var smallCheer = document.querySelector("#smallCheer");
var turnSelect = document.querySelector(".turn-select")
var turnSelector = document.querySelector(".turn-selector")

var countPlay = 0;

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

var turnO = true;
var turnX = false;

turnSelect.addEventListener("change", () => {
    if (turnSelect.value === "O"){
        turnO = true;
        turnX = false;
        turnDisplay.innerHTML = "Turn 'O'";
        console.log("change");
        turnSelect.style.color = "#212529";
        turnDisplay.style.color = "#212529"
    } else {
        turnX = true;
        turnO = false;
        turnDisplay.innerHTML = "Turn 'X'";
        turnDisplay.style.color = "#9D0208"
        console.log("change");
        turnSelect.style.color = "#9D0208";
    }
    console.log("change");
})

popup.classList.add("hidden");

newBtn.addEventListener("click", () => {
    pauseCheers();
    pauseDraw();
    wPattern = Array(boxContainers.length).fill("");
    for (const boxContainer of boxContainers) {
        const boxes = boxContainer.querySelectorAll(".box");
        for (box of boxes) {
            box.innerHTML = "";
            box.disabled = false;
            box.style.backgroundColor = "#f8f9fa"
        }
    }
    popup.classList.add("hidden");
    resetBtn.classList.remove("hidden");
    countPlay = 0;
})

resetBtn.addEventListener("click", () => {
    wPattern = Array(boxContainers.length).fill("");
    for (const boxContainer of boxContainers) {
        const boxes = boxContainer.querySelectorAll(".box");
        for (box of boxes) {
            box.innerHTML = "";
            box.disabled = false;
            box.style.backgroundColor = "#f8f9fa"
        }
    }
    turnSelector.classList.remove("hidden");
    countPlay = 0;
})

boxContainers.forEach((boxContainer, index) => {
    const boxes = boxContainer.querySelectorAll(".box");

    boxes.forEach((box, boxIndex) => {
        box.addEventListener("click", () => {
            turnSelector.classList.add("hidden");
            if (turnO === true) {
                turnX = true;
                turnO = false;
                box.innerHTML = "O";
                turnDisplay.innerText = "Turn 'X'";
                turnDisplay.classList.add("red");
            } else {
                turnO = true;
                turnX = false;
                box.innerHTML = "X";
                turnDisplay.innerText = "Turn 'O'";
                turnDisplay.classList.remove("red");
            }
            box.disabled = true;
            box.style.backgroundColor = "#DEE2E6"

            if (box.innerText === "X") {
                box.style.color = "#9D0208";
            } else {
                box.style.color = "#212529";
            }
            checkPartWinner(boxContainer, index);
            checkWinner();
            checkDraw();
            var count = errorCheck(boxIndex);
            playGame(boxIndex, count);
        });
    });
});

const errorCheck = (boxIndex) => {
    var checker = 0;
    const boxContainer = boxContainers[boxIndex];
    const boxes = boxContainer.querySelectorAll(".box");
    for (const box of boxes) {
        if (box.innerHTML === "") {
            checker++;
        }
    }
    return checker;
}

const playGame = (boxIndex, count) => {
    const boxContainer = boxContainers[boxIndex];
    disableAll();
    const boxes = boxContainer.querySelectorAll(".box");
    for (const box of boxes) {
        if (box.innerHTML === "") {
            box.disabled = false;
            box.style.backgroundColor = "#f8f9fa"
        }
    }
    if (count === 0){
        for (const boxContainer of boxContainers) {
            const boxes = boxContainer.querySelectorAll(".box");
            for (box of boxes) {
                if(box.innerHTML === ""){
                    box.innerHTML = "";
                    box.disabled = false;
                    box.style.backgroundColor = "#f8f9fa"
                }
            }
        }
    }
}

const disableAll = () => {
    for (const boxContainer of boxContainers) {
        const boxes = boxContainer.querySelectorAll(".box");
        for (box of boxes) {
            box.disabled = true;
            box.style.backgroundColor = "#DEE2E6"
        }
    }
}

const checkPartWinner = (boxContainer, index) => {
    const boxes = boxContainer.querySelectorAll(".box");
    for (const pattern of winPattern) {
        let val1 = boxes[pattern[0]].innerHTML;
        let val2 = boxes[pattern[1]].innerHTML;
        let val3 = boxes[pattern[2]].innerHTML;

        if (val1 != "" && val2 != "" && val3 != "") {
            if (val1 === val2 && val1 === val3) {
                partWinner(val1, boxContainer, index);
                return;
            }
        }
    }
}

const partWinner = (val1, boxContainer, index) => {
    const boxes = boxContainer.querySelectorAll(".box");
    playSmallCheer();

    for (const box of boxes) {
        box.innerHTML = val1;
        box.disabled = true;
        if (val1 === "X") {
            box.style.color = "#9D0208";
        } else {
            box.style.color = "#212529";
        }
        box.style.backgroundColor = "#DEE2E6"
    }
    wPattern[index] = val1;
}

const checkWinner = () => {
    for (const pattern of winPattern) {
        let val1 = wPattern[pattern[0]];
        let val2 = wPattern[pattern[1]];
        let val3 = wPattern[pattern[2]];
        if (val1 != "" && val2 != "" && val3 != "") {
            if (val1 === val2 && val1 === val3) {
                showWinner(val1);
                return;
            }
        }
    }
}

const showWinner = (val1) => {
    for (const boxContainer of boxContainers) {
        const boxes = boxContainer.querySelectorAll(".box");
        for (box of boxes) {
            box.disabled = true;
            box.style.backgroundColor = "#DEE2E6"
        }
    }
    decWin.innerHTML = `Congrats! Winner is ${val1}`;
    playCheers();
    turnSelector.classList.remove("hidden");
    popup.classList.remove("hidden");
    resetBtn.classList.add("hidden");
}

const checkDraw = () => {
    countPlay = 0;
    for (const boxContainer of boxContainers) {
        const boxes = boxContainer.querySelectorAll(".box");
        for (box of boxes) {
            if (box.innerHTML !== "") {
                countPlay++;
            }
        }
    }
    if (countPlay >= 81) {
        decWin.innerHTML = `It's a Draw. Try Again`;
        popup.classList.remove("hidden");
        resetBtn.classList.add("hidden");
        playDraw();
        turnSelect.classList.remove("hidden");
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

const playCheers = () => {
    cheer1.currentTime = 0;
    cheer2.currentTime = 0;
    cheer1.play();
    setTimeout(() => {
        cheer2.play();
    }, 2000);
}

const playDraw = () => {
    draw.currentTime = 0;
    draw.play();
}

const playSmallCheer = () => {
    smallCheer.currentTime = 0;
    smallCheer.playbackRate = 1.5;
    smallCheer.play();
}

const pauseCheers = () => {
    cheer1.pause();
    cheer2.pause();
}

const pauseDraw = () => {
    draw.pause();
}

const pauseSmallCheer = () => {
    smallCheer.pause();
}