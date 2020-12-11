const diffs = document.querySelectorAll('.difference');

diffs.forEach(e => e.addEventListener('click', () => e.classList.add('finded')));

let cycleId;

function checkGameStatus() {
    let findeds = document.querySelectorAll('.finded');
    if (findeds.length === 10) {
        clearInterval(cycleId);
        alert('Вы победили!');
    }
}

cycleId = setInterval(checkGameStatus, 1000);