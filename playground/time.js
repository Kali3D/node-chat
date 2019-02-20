const moment = require("moment-timezone");

const date = moment().locale("fr").tz("America/Martinique");
console.log(date.format("dddd Do MMMM YYYY, HH:mm"));


const createdAt = Date.now();
const date2 = moment(createdAt);
console.log(date2.format("h:mm a"));