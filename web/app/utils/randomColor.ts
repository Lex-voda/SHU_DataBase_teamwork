
let randomcolor = [];
for (let i = 0; i < 1000; i++) {
    let temp1 = Math.floor(Math.random() * 88 + 168);
    let temp2 = Math.floor(Math.random() * 88 + 168);
    let temp3 = Math.floor(Math.random() * 88 + 168);
    if (i == 0) {
        temp1 = 21;
        temp2 = 255;
        temp3 = 0;
    }
    randomcolor.push(`rgb(${temp1},${temp2},${temp3})`);
}

export const randomColor = randomcolor;