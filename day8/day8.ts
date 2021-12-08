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


type Entry = {
    patterns: string[];
    values: string[];
}


async function part1() {

    let input = await readFile('day8/test.txt');
    let entries = input.map<Entry>(s => {
        let entryStr = s.split('|');
        let patterns = entryStr[0].trim().split(' ');
        let values = entryStr[1].trim().split(' ');
        return {
            patterns: patterns,
            values: values
        }
    }
    );

    let count: number = 0;
    entries.forEach(e => {
        e.values.forEach(v => {
            if (v.length == 2 || v.length == 4 || v.length == 3 || v.length == 7) {
                count++;
            }

        });
    });



}


async function part2() {

    let input = await readFile('day8/input.txt');
    let entries = input.map<Entry>(s => {
        let entryStr = s.split('|');
        let patterns = entryStr[0].trim().split(' ');
        let values = entryStr[1].trim().split(' ');
        return {
            patterns: patterns,
            values: values
        }
    }
    );

    let allLetters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    let count: number = 0;
    let outputs: number[] = [];
    entries.forEach(e => {
        let numberPatterns: string[] = [];
        let missingInNine: string;

        //decode all patterns
        numberPatterns[1] = e.patterns.filter(v => v.length == 2)[0];
        numberPatterns[7] = e.patterns.filter(v => v.length == 3)[0];
        numberPatterns[4] = e.patterns.filter(v => v.length == 4)[0];
        numberPatterns[8] = e.patterns.filter(v => v.length == 7)[0];

        numberPatterns[6] = e.patterns.filter(v => v.length == 6 && (v.includes(numberPatterns[1][0]) !== v.includes(numberPatterns[1][1])))[0];
        numberPatterns[9] = e.patterns.filter(v => v.length == 6 && (v.includes(numberPatterns[4][0]) && v.includes(numberPatterns[4][1]) && v.includes(numberPatterns[4][2]) && v.includes(numberPatterns[4][3])))[0];
        allLetters.forEach(letter => {
            if (!numberPatterns[9].includes(letter)) {
                missingInNine = letter;
            }
        });


        numberPatterns[0] = e.patterns.filter(v => v.length == 6 && !numberPatterns.includes(v))[0];
        numberPatterns[3] = e.patterns.filter(v => v.length == 5 && (v.includes(numberPatterns[1][0]) && v.includes(numberPatterns[1][1])))[0];

        numberPatterns[2] = e.patterns.filter(v => !numberPatterns.includes(v)).filter(s => s.length == 5 && s.includes(missingInNine))[0];
        numberPatterns[5] = e.patterns.filter(v => !numberPatterns.includes(v))[0];

        //compare each number to the decoded patterns
        let numbers: number[] = [];
        e.values.forEach(v => {
            for (let i = 0; i < numberPatterns.length; i++) {
                let allIsIncluded = true;
                for (let x = 0; x < numberPatterns[i].length; x++) {
                    let dasf = numberPatterns[i][x];
                    if (!v.includes(numberPatterns[i][x])) {
                        allIsIncluded = false;
                        break;
                    }

                }
                if (allIsIncluded && v.length == numberPatterns[i].length) {
                    numbers.push(i);
                    break;
                }
            }
        });

        //Add all 4 digits to a number and push to output number
        let numStr: string = "";
        numbers.forEach(n => {
            numStr += n.toString();
        });
        let num: number = Number(numStr);
        outputs.push(num)
    });


    let answer = outputs.reduce((a, b) => a + b, 0);
}


// 2 : 1
// 3 : 7
// 4 : 4
// 5 : 2, 3, 5
// 6 : 0, 9, 6
// 7 : 8

// 6 length
// 6 = one from 1 is on
// 9 = all from 4 is on
// 0 = last one

// 5 length
// 3 = both from 1 is on
// 5 = missing same as 9
// 2 = last one

part2();
