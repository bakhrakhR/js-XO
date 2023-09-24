const newGameBtn = document.getElementById('newGame');

const circle = `<svg class="circle">
<circle r="45" cx="58" cy="58" stroke-width="10" fill="none" stroke-linecap="round" />
</svg>`;
const cross = `<svg class="cross">
<line class="first" x1="15" y1="15" x2="100" y2="100"  stroke-width="10" stroke-linecap="round" />
<line class="second" x1="100" y1="15" x2="15" y2="100"  stroke-width="10" stroke-linecap="round" />
</svg>`;

const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const res = document.querySelector('.res');


let step = true;

let desk = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

let cellIndex;

board.addEventListener('click', isFinished);

function isFinished(event) {
    if (event.target.classList.contains('cell')) {
        cellIndex = Array.from(cells).indexOf(event.target);
        game(cellIndex, step);
        step = !step;

        const result = isSolved(desk);

        if (result === 2) {
            res.classList.remove('hide');
            res.innerText = 'O wins';
            board.classList.add('active');
            board.removeEventListener('click', isFinished);
            createConfetti();

        } else if (result === 1) {
            res.classList.remove('hide');
            res.innerText = 'X wins';
            board.classList.add('active');
            board.removeEventListener('click', isFinished);
            createConfetti();

        } else if (result === 0) {
            res.classList.remove('hide');
            res.innerText = 'Draw';
            board.removeEventListener('click', isFinished);
        }
    }
};

function game(cellIndex, step) {
    const target = cells[cellIndex];
    if (step) {
        target.innerHTML = cross;
        desk[Math.floor(cellIndex / 3)][cellIndex % 3] = 1;

    } else {
        target.innerHTML = circle;
        desk[Math.floor(cellIndex / 3)][cellIndex % 3] = 2;
    }
};

function isSolved(desk) {
    desk = desk.join('-').replace(/,/g, '');
    if (/222|2...2...2|2....2....2|2..2..2/.test(desk)) return 2;
    if (/111|1...1...1|1....1....1|1..1..1/.test(desk)) return 1;
    if (!/0/.test(desk)) return 0;
    return -1

};

newGameBtn.addEventListener('click', resetDesk);

function resetDesk() {
    res.classList.add('hide');
    step = true;
    cells.forEach((i) => {
        i.innerHTML = "";
    });
    board.classList.remove('active');
    desk = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    board.addEventListener('click', isFinished)
}

//confetti

function createConfetti() {
    const confettiContainer = document.querySelector('.game');

    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `${Math.random() * 100}%`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.backgroundColor = getRandomColor();
        confettiContainer.appendChild(confetti);
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}