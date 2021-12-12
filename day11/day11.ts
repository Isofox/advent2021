import { count } from 'console';
import * as fs from 'fs';
import { setPriority } from 'os';

async function readFile(path): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            }
            const arr = data.toString().replace(/\r\n/g, '\n').split('\n');
            resolve(arr);
        });
    });
}


type pos = {
    x: number;
    y: number;
    value: number;
    blink: number;
    hasBlinked: boolean;
}

let cords: pos[] = [];

async function part1() {
    let input = await readFile('day11/input.txt');

    let x = 0;
    let y = 0;
    input.forEach(i => {
        x = 0;
        for (let c in [...i]) {
            cords.push({ x: x, y: y, value: Number(i[c]), blink: 0, hasBlinked: false });
            x++;
        }
        y++;
    });


    for (let i = 0; i < 10000; i++) {
        step();
        if(cords.filter(s => s.hasBlinked).length == cords.length){
            let answer2 = i+1;
            break;
        }
    }

    let blinks = cords.map(s => s.blink).reduce((a, b) => a + b);
}

function step() {
    cords.forEach(s => {
        s.value++;
        s.hasBlinked = false;
    });

    blink();

    cords.filter(s => s.hasBlinked).forEach(z => z.value = 0);
}


function blink() {
    let blinking = cords.filter(s => !s.hasBlinked && s.value > 9);

    blinking.forEach(e => {
        e.hasBlinked = true;
        e.blink++;
        increaseNeighbours(e)
    });

    let nextBlinking = cords.filter(s => !s.hasBlinked && s.value > 9);
    if (nextBlinking.length > 0) {
        blink();
    }
}

function increaseNeighbours(p: pos) {
    let neihgbours = cords.filter(c =>
        (c.x >= p.x - 1 && c.x <= p.x + 1) &&
        (c.y >= p.y - 1 && c.y <= p.y + 1) &&
        c != p);
    neihgbours.forEach(s => s.value++);
}

part1();