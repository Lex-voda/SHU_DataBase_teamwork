
const divideDayBy12 = [
    { hour: 8, minute: 0 },
    { hour: 8, minute: 55 },
    { hour: 10, minute: 0 },
    { hour: 10, minute: 55 },
    { hour: 13, minute: 0 },
    { hour: 13, minute: 55 },
    { hour: 15, minute: 0 },
    { hour: 15, minute: 55 },
    { hour: 18, minute: 0 },
    { hour: 18, minute: 55 },
    { hour: 20, minute: 0 },
    { hour: 20, minute: 55 },
]

let currentblock = 0;
const currentTime = new Date();
const currentHour = currentTime.getHours();
const currentMinute = currentTime.getMinutes();
for (let i = 0; i < divideDayBy12.length; i++) {
    let t = divideDayBy12[i].hour * 60 + divideDayBy12[i].minute;
    let c = currentHour * 60 + currentMinute;
    if (c < t) {
        currentblock = i;
        break;
    }
    if (i === divideDayBy12.length - 1) {
        currentblock = i + 1;
    }
}
if (process.env.NEXT_PUBLIC_TEST === "test") {
    currentblock = 1;
}

export const currentBlock=currentblock;