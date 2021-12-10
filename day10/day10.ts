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

class chunk {
    characters: string[];
    fail: string;
    score: number;
    opened: string[];
    complete : string[];
    completeScore:number;
}

async function part1() {
    let input = await readFile('day10/input.txt');
    let chunks = input.map<chunk>(s => {
        return {
            characters: [...s],
            fail: '',
            score: 0,
            opened: [],
            complete:[],
            completeScore:0,
        }
    });

    chunks.forEach(s => {
        // ( [ { < > } ] )
        let bucket: number[] = [0, 0, 0, 0];
        let opened: string[] = [];
        for (let i = 0; i < s.characters.length; i++) {
            if (s.characters[i] == '(') {
                opened.push('(');
                bucket[0]++;
            }
            if (s.characters[i] == '[') {
                opened.push('[');
                bucket[1]++;
            }
            if (s.characters[i] == '{') {
                opened.push('{');
                bucket[2]++;
            }
            if (s.characters[i] == '<') {
                opened.push('<');
                bucket[3]++;
            }
            if (s.characters[i] == ')') {
                bucket[0]--;
                let last = opened[opened.length - 1];
                if (last == '(') {
                    opened.pop();
                } else {
                    s.fail = s.characters[i];
                    s.score = 3;
                    break;
                }
            }
            if (s.characters[i] == ']') {
                bucket[1]--;
                let last = opened[opened.length - 1];
                if (last == '[') {
                    opened.pop();
                } else {
                    s.fail = s.characters[i];
                    s.score = 57;
                    break;
                }
            }
            if (s.characters[i] == '}') {
                bucket[2]--;
                let last = opened[opened.length - 1];
                if (last == '{') {
                    opened.pop();
                } else {
                    s.fail = s.characters[i];
                    s.score = 1197;
                    break;
                }
            }
            if (s.characters[i] == '>') {
                bucket[3]--;
                let last = opened[opened.length - 1];
                if (last == '<') {
                    opened.pop();
                } else {
                    s.fail = s.characters[i];
                    s.score = 25137;
                    break;
                }
            }
        }
        s.opened = opened;


    });

    let awnser1 = chunks.map(s => s.score).reduce((a, b) => a + b, 0);


    let d = chunks.filter(s => s.fail == '').forEach(f =>{
        let rev = Object.assign([],f.opened).reverse();
        rev.forEach(s => {
            f.completeScore *=5;
            if(s == '('){
                f.complete.push(')');
                f.completeScore += 1;
            }
            if(s == '['){
                f.complete.push(']');
                f.completeScore += 2;
            }
            if(s == '{'){
                f.complete.push('}');
                f.completeScore += 3;
            }
            if(s == '<'){
                f.complete.push('>');
                f.completeScore += 4;
            }
        });
    });

    let completeScores = chunks.filter(s => s.completeScore != 0).map(f => f.completeScore).sort((a,b) => a - b);
    let answer2 = completeScores[Math.floor(completeScores.length/2)];

}


part1();