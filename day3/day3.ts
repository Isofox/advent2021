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

let finalBits: number[] = [];
let oneBit: number[] = [];
let zeroBit: number[] = [];


async function part1() {

    var input = await readFile('day3/input.txt');
    for (let index = 0; index < input[0].length; index++) {
        finalBits.push(0);
    }

    input.forEach(i => {
        for (let index = 0; index < i.length; index++) {
            let bit = Number(i[index]);
            if (bit == 1) {
                finalBits[index]++;
            }
        }
    });



    for (let index = 0; index < finalBits.length; index++) {
        if (finalBits[index] >= input.length / 2) {
            oneBit[index] = 1;
            zeroBit[index] = 0;
        }
        else {
            oneBit[index] = 0;
            zeroBit[index] = 1;
        }
    }

    var gamma = parseInt(oneBit.join(""), 2);
    var epsilon = parseInt(zeroBit.join(""), 2);
    var anwser = gamma * epsilon;
    console.log(anwser);
}

function findBit(input: string[], index: number, high: boolean): string {

    var ones = input.filter(i => Number(i[index]) == 1);
    var zeros = input.filter(i => Number(i[index]) == 0);
    let selected: string[];
    if (high) {
        if (ones.length >= zeros.length) {
            selected = ones;
        } else {
            selected = zeros;
        }
    } else {
        if (zeros.length <= ones.length) {
            selected = zeros;
        } else {
            selected = ones;
        }
    }

    if (selected.length > 1) {
        return findBit(selected, index + 1, high);
    }

    return selected[0];
}

async function part2() {

    var input = await readFile('day3/input.txt');
    var bitLength = input[0].length;

    let oxygen = parseInt(findBit(input, 0, true), 2);
    let co2 = parseInt(findBit(input, 0, false), 2);

    let anwser = oxygen * co2;
}


part2();
