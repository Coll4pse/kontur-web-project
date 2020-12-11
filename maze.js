import {mazeArray} from '/mazeArray.js'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const player = {
    x: 338,
    y: 797
};

const victoryHeight = 220;

let cycleId;

function render()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    for (let i = 0; i < mazeArray.length; i++) {
        let str = mazeArray[i];
        for (let j = 0; j < str.length; j++) {
            if (str[j] === 'b') {
                ctx.fillRect(j, i, 1, 1);
            }
        }
    }
    ctx.beginPath();
    ctx.arc(player.x, player.y, 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'rgb(255, 223, 0)';
    ctx.arc(player.x, player.y, 4, 0, 2 * Math.PI);
    ctx.fill();
}

function move(e) {
    if (e.code === 'KeyS' || e.code === 'ArrowDown') {
        if (mazeArray[player.y + 1][player.x] === 'w') {
            player.y += 1;
        }
    }
    if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        if (mazeArray[player.y][player.x + 1] === 'w') {
            player.x += 1;
        }
    }
    if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        if (mazeArray[player.y + 1][player.x] === 'w') {
            player.x -= 1;
        }
    }
    if (e.code === 'KeyW' || e.code === 'ArrowUp') {
        if (mazeArray[player.y - 1][player.x] === 'w') {
            player.y -= 1;
        }
    }

    if (player.y <= victoryHeight) {
        clearInterval(cycleId);
        document.removeEventListener('keydown' , move);
        alert('Вы победили!');
    }
}

function main() {
    document.addEventListener('keydown', move);
    cycleId = setInterval(render, 30);
}

main();