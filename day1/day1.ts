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

async function part1() {
    let imputRows: string[] = await readFile('day1/input.txt');
    let depths: number[] = [];

    imputRows.forEach((s) => {
        depths.push(Number(s));
    });


    let increased: number = 0;
    let last: number = depths[0];
    depths.forEach((d) => {
        if (d > last) {
            increased++;
        }
        last = d;
    });

    console.log(increased);

}



async function part2() {
    let imputRows: string[] = await readFile('day1/input.txt');
    let depths: number[] = [];

    imputRows.forEach((s) => {
        depths.push(Number(s));
    });

    let windows = depths.slice(0, depths.length - 2).map((d, i) => {
        return d + depths[i + 1] + depths[i + 2];
    });

    let increased: number = 0;
    let last: number = windows[0];
    windows.forEach((d) => {
        if (d > last) {
            increased++;
        }
        last = d;
    });


    console.log(increased);

}

// part1();
part2();


