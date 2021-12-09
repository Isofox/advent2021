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

type pos = {
    x: number;
    y: number;
    value: number;
    isLow: boolean;
    basinSize: number;
    searched: boolean;
    isBasin: boolean;
}

let cords: pos[] = [];
async function part1() {
    let input = await readFile('day9/input.txt');

    let x = 0;
    let y = 0;
    input.forEach(i => {
        x = 0;
        for (let c in [...i]) {
            cords.push({ x: x, y: y, value: Number(i[c]), isLow: false, basinSize: 0, searched: false, isBasin: false });
            x++;
        }
        y++;
    });

    cords.forEach(i => {
        let okNeighbour = 0;
        let up = cords.filter(s => s.x == i.x && s.y == i.y - 1);
        if (up.length == 0) {
            okNeighbour++;
        } else if (up[0].value > i.value) {
            okNeighbour++;
        }

        let down = cords.filter(s => s.x == i.x && s.y == i.y + 1);
        if (down.length == 0) {
            okNeighbour++;
        } else if (down[0].value > i.value) {
            okNeighbour++;
        }

        let left = cords.filter(s => s.x == i.x - 1 && s.y == i.y);
        if (left.length == 0) {
            okNeighbour++;
        } else if (left[0].value > i.value) {
            okNeighbour++;
        }

        let right = cords.filter(s => s.x == i.x + 1 && s.y == i.y);
        if (right.length == 0) {
            okNeighbour++;
        } else if (right[0].value > i.value) {
            okNeighbour++;
        }

        okNeighbour == 4 ? i.isLow = true : i.isLow = false;

    });

    let tas = 123;

    let anwser1 = cords.filter(s => s.isLow).map(d => d.value + 1).reduce((a, b) => a + b, 0);


    cords.filter(f => f.isLow).forEach(i => {

        basinSizeInDir(i, 0, 0);

        i.basinSize = cords.filter(s => s.isBasin).length;

        cords.forEach(e => {
            e.searched = false;
            e.isBasin = false;
        });
    });

    let sorted = cords.filter(s => s.isLow).sort((a, b) => {
        const s = b.basinSize - a.basinSize; if (s) return s;
    });



    let answer2 = sorted[0].basinSize * sorted[1].basinSize * sorted[2].basinSize;
}

function basinSizeInDir(i: pos, deltaX: number, deltaY: number) {
    let newI = cords.filter(f => f.x == i.x + deltaX && f.y == i.y + deltaY && f.value != 9 && !f.searched);
    i.searched = true;
    if (newI.length > 0) {
        newI[0].isBasin = true;
        basinSizeInDir(newI[0], 0, -1);
        basinSizeInDir(newI[0], 0, 1);
        basinSizeInDir(newI[0], -1, 0);
        basinSizeInDir(newI[0], 1, 0);
    }
    return;

}


part1();