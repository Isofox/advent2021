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

type Line = {
    from: Vector;
    to: Vector;
}

type Vector = {
    x: number;
    y: number;
}

async function part1() {

    let input = await readFile('day5/input.txt');
    let max = 0;
    let lines = input.map<Line>(i => {
        let split = i.split('->').map(s => s.split(',')).flat(1).map(x => Number(x));
        if (Math.max(...split) > max) {
            max = Math.max(...split);
        }
        return {
            from: { x: split[0], y: split[1] },
            to: { x: split[2], y: split[3] },
        }
    });

    let horizontal = lines.filter(l => l.from.y == l.to.y);
    let vertical = lines.filter(l => l.from.x == l.to.x);
    let diag = lines.filter(l => l.from.x != l.to.x && l.from.y != l.to.y);

    let grid: number[][] = [];

    for (let x = 0; x <= max; x++) {
        let tempArray: number[] = [];
        for (let y = 0; y <= max; y++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }

    horizontal.filter(f => f.from.x <= f.to.x).forEach(i => {
        for (let x = i.from.x; x <= i.to.x; x++) {
            grid[i.from.y][x]++;
        }
    });

    horizontal.filter(f => f.from.x > f.to.x).forEach(i => {
        for (let x = i.to.x; x <= i.from.x; x++) {
            grid[i.from.y][x]++;
        }
    });

    vertical.filter(f => f.from.y <= f.to.y).forEach(i => {
        for (let y = i.from.y; y <= i.to.y; y++) {
            grid[y][i.from.x]++;
        }
    });

    vertical.filter(f => f.from.y > f.to.y).forEach(i => {
        for (let y = i.to.y; y <= i.from.y; y++) {
            grid[y][i.from.x]++;
        }
    });


    diag.forEach(i => {

        let x = i.from.x;
        let y = i.from.y;
        grid[y][x]++;
        while (y != i.to.y) {

            if (x <= i.to.x) {
                x++;
            } else {
                x--;
            }

            if (y <= i.to.y) {
                y++;
            } else {
                y--;
            }
            grid[y][x]++;

        }
        let sdfds = 12;


    });

    let count: number = 0;
    for (let y of grid) {
        for (let x of y) {
            if (x > 1) {
                count++;
            }
        }
    }
}



part1();
