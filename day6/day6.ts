import { count } from 'console';
import * as fs from 'fs';

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



type Fish = {
    timer: number;
}

// first try toooooooo slow

// let day = 0;
// while (day < 256) {

//     fishes.forEach(s => {
//         if (s.timer == 0) {
//             s.timer = 6;
//             fishes.push({ timer: 8});
//         }
//         else{
//             s.timer--;
//         }
//     });
//     day++;
// }


async function part1() {

    let input = await readFile('day6/input.txt');
    let fishes = input[0].split(',').map<Fish>(s => { return { timer: Number(s) } });

    let allFishes: number[] = []
    for (let i = 0; i <= 8; i++) {
        allFishes[i] = 0;
    }

    fishes.forEach(s => allFishes[s.timer]++);

    for (let d = 0; d < 256; d++) {
        let tempFishes: number[] = []
        for (let i = 0; i <= 8; i++) {
            tempFishes[i - 1] = allFishes[i];
        }
        tempFishes[8] = allFishes[0];
        tempFishes[6] = tempFishes[6] + allFishes[0];

        allFishes = tempFishes;
    }
    let total = allFishes.reduce((s, c) => s + c, 0);
}

part1();
