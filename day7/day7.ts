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

class Crab {
    startPos: number;
    pos: number;

    constructor(start: number) {
        this.startPos = start;
        this.pos = start;
    }
}

function addSeq(input: number): number {
    let temp: number = 0;
    for (let i = 1; i <= input; i++) {
        temp += i;
    }
    return temp;
}


async function part1() {

    let input = await readFile('day7/test.txt');
    let crabs = input[0].split(',').map<Crab>(s => new Crab(Number(s)));

    let min = Math.min(...crabs.map(s => s.startPos));
    let max = Math.max(...crabs.map(s => s.startPos));


    let fuel: number[] = [];

    for (let i = min; i < max; i++) {
        let tempFuel: number = 0;
        crabs.forEach(c => {
            // tempFuel += Math.abs(i - c.startPos); // part 1
            tempFuel += addSeq(Math.abs(i - c.startPos)); // part2
        });
        fuel.push(tempFuel);
    }
    let answer = Math.min(...fuel);
}

part1();
