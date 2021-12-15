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

type connection = {
    from: cave;
    to: cave;
}

type cave = {
    name: string;
    big: boolean;
}

let connections: connection[];
async function part1() {
    let input = await readFile('day12/test.txt');

    connections = input.map(c => {
        let split = c.split('-');

        let from: cave = {
            name: split[0],
            big: split[0][0] == split[0][0].toUpperCase() ? true : false,
        }
        let to: cave = {
            name: split[1],
            big: split[1][0] == split[1][0].toUpperCase() ? true : false,
        }
        return {
            from: from,
            to: to,
        }
    });


    let paths = findPaths(connections.filter(s => s.from.name == 'start'), []);

    let dsaf = 123;
}

function findPaths(cons: connection[], path: string[]): string[][] {
    let paths: string[][] = [];

    cons.forEach(c => {
        path.push(c.to.name);
        if (c.to.name == 'end') {
            paths.push(path);
        } else {
            paths = findPaths(connections.filter(s => (s.from.name == c.to.name || s.to.name == c.to.name) && s != c), path);
        }
    });
    return paths;
}


part1();