
let randomcolor = [];
for (let i = 0; i < 12; i++) {
    let temp1 = Math.floor(Math.random() * 208 + 48);
    let temp2 = Math.floor(Math.random() * 208 + 48);
    let temp3 = Math.floor(Math.random() * 208 + 48);
    randomcolor.push(`rgb(${temp1},${temp2},${temp3})`);
}

export const randomColor = randomcolor;