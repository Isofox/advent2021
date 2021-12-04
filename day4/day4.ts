import * as fs from 'fs';
import { type } from 'os';
import { exit } from 'process';

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

class board {
    numbers: bingoNumber[] = [];
    bingo: boolean;
}

type bingoNumber = {
    x: number;
    y: number;
    value: number;
    drawn: boolean;
}


function inputToBoards(input: string[]): board[] {
    //add boards
    let boards: board[] = [];
    let tempBoard: board = new board();
    let boardIndex: number = 0;
    var inputStrings = input.slice(2);
    for (let index = 0; index < inputStrings.length; index++) {
        if (inputStrings[index] == '') {
            boardIndex = 0;
            boards.push(tempBoard);
            tempBoard = new board();
            continue;
        }
        var rowStrings = inputStrings[index].split(' ').filter(i => i != '').map(i => Number(i));

        for (let rowIndex = 0; rowIndex < rowStrings.length; rowIndex++) {

            tempBoard.numbers.push(
                {
                    x: rowIndex,
                    y: boardIndex,
                    drawn: false,
                    value: rowStrings[rowIndex],
                }
            );

        }
        boardIndex++;

    }
    boards.push(tempBoard);

    return boards;
}


function addToBoards(boards: board[], n: number) {
    boards.forEach(b => {
        b.numbers.filter(i => i.value == n).forEach(x => x.drawn = true);
    });
}

function checkBingo(boards: board[]): board {
    let board: board;

    boards.filter(x => !x.bingo).forEach(b => {
        let length = Math.sqrt(b.numbers.length);

        for (let index = 0; index < length; index++) {
            let horizontal = b.numbers.filter(n => n.x == index && n.drawn).length;
            let vertical = b.numbers.filter(n => n.y == index && n.drawn).length;
            if (horizontal >= length || vertical >= length) {
                board = b;
                b.bingo = true;
            }
        }
    });
    return board;
}

async function part1() {
    let input = await readFile('day4/input.txt');
    let numbers = input[0].split(',').map(n => Number(n));


    let boards = inputToBoards(input);



    numbers.forEach(n => {
        addToBoards(boards, n);
        let w = checkBingo(boards);




        if (w != null) {
            let sadf = boards.filter(b => !b.bingo).length;
            // console.log(sadf);

            //bingo
            let sum = w.numbers.filter(x => !x.drawn).map(s => s.value).reduce((a, b) => a + b, 0);
            let answer = sum * n;
            //console.log(answer);
            //part2
            if (boards.filter(b => !b.bingo).length == 0) {
                let finalBoardAnwser = answer;
                console.log(finalBoardAnwser);
            }
        }
    });
}

part1();
