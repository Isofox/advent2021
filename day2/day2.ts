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

enum Direction {
    horizontal,
    vertical,
}

type Instruction = {
    dir: Direction;
    value: number;
}

async function part1() {

    var input = await readFile('day2/input.txt');
    var instructions = input.map<Instruction>(i => {
        let dir = i.split(' ')[0][0];
        let val = Number(i.split(' ')[1]);

        return {
            dir: dir == 'f' ? Direction.vertical : Direction.horizontal,
            value: dir == 'u' ? -val : val,
        };
    });


    let horizontal: number = 0;
    let vertical: number = 0;


    instructions.forEach((i) => {
        i.dir == Direction.horizontal ? horizontal += i.value : vertical += i.value;
    });

    let answer = horizontal * vertical;
    console.log(answer);
}


async function part2() {

    var input = await readFile('day2/input.txt');
    var instructions = input.map<Instruction>(i => {
        let dir = i.split(' ')[0][0];
        let val = Number(i.split(' ')[1]);

        return {
            dir: dir == 'f' ? Direction.horizontal : Direction.vertical,
            value: dir == 'u' ? -val : val,
        };
    });


    let horizontal: number = 0;
    let depth: number = 0;
    let aim: number = 0;


    instructions.forEach((i) => {
        if (i.dir == Direction.horizontal) {
            horizontal += i.value;
            depth += i.value * aim;
        }
        else {
            aim += i.value;
        }
    });

    let answer = horizontal * depth;
    console.log(answer);
}


part2();
