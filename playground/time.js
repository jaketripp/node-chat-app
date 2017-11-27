var moment = require('moment');

// var date = moment();
// date.add(1111, 'year').subtract(10, 'months');
// console.log(date.format('MMM Do, YYYY'));
// console.log(date.format('MMM Do, YYYY'));

// 10:35 am
// padded for minutes
// unpadded for minutes

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234;
var date = moment(someTimestamp);
console.log(date.format('h:mm a'));