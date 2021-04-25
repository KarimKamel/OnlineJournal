const dateFormat = require("dateformat");
const oldDate = new Date("2021-04-14T11:31:08.859Z");
const oldDate2 = Date.parse("2021-04-14T11:31:08.859Z");
// old;
console.log(oldDate.setHours(0, 0, 0, 0));
console.log(dateFormat(oldDate));

const dayInMS = 1000 * 60 * 60 * 24;
let oldDate3 = oldDate - dayInMS;
console.log(dateFormat(oldDate3));
console.log(dateFormat());

// let newDate = new Date(oldDateString);
// console.log(newDate);
// let newDate2 = dateFormat(oldDateString);
// console.log(newDate2);
// console.log(newDate);
// const newDate = dateFormat(oldDate);

// console.log(newDate);
// console.log(oldDate.getDate() - 2);
