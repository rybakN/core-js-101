/* *******************************************************************************************
 *                                                                                           *
 * Please read the following tutorial before implementing tasks:                              *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date     *
 *                                                                                           *
 ******************************************************************************************* */


/**
 * Parses a rfc2822 string date representation into date value
 * For rfc2822 date specification refer to : http://tools.ietf.org/html/rfc2822#page-14
 *
 * @param {string} value
 * @return {date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'    => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT' => Date()
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 */
function parseDataFromRfc2822(value) {
  return Date.parse(value);
}

/**
 * Parses an ISO 8601 string date representation into date value
 * For ISO 8601 date specification refer to : https://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} value
 * @return {date}
 *
 * @example :
 *    '2016-01-19T16:07:37+00:00'    => Date()
 *    '2016-01-19T08:07:37Z' => Date()
 */
function parseDataFromIso8601(value) {
  return Date.parse(value);
}


/**
 * Returns true if specified date is leap year and false otherwise
 * Please find algorithm here: https://en.wikipedia.org/wiki/Leap_year#Algorithm
 *
 * @param {date} date
 * @return {bool}
 *
 * @example :
 *    Date(1900,1,1)    => false
 *    Date(2000,1,1)    => true
 *    Date(2001,1,1)    => false
 *    Date(2012,1,1)    => true
 *    Date(2015,1,1)    => false
 */
function isLeapYear(date) {
  if (date.getFullYear() % 4 > 0) return false;
  if (date.getFullYear() % 100 === 0) {
    if (date.getFullYear() % 400 === 0) return true;
    return false;
  } return true;
}


/**
 * Returns the string representation of the timespan between two dates.
 * The format of output string is "HH:mm:ss.sss"
 *
 * @param {date} startDate
 * @param {date} endDate
 * @return {string}
 *
 * @example:
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,11,0,0)   => "01:00:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,30,0)       => "00:30:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,20)        => "00:00:20.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,0,250)     => "00:00:00.250"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,15,20,10,453)   => "05:20:10.453"
 */
function timeSpanToString(startDate, endDate) {
  const millisecondQuantity = endDate - startDate;
  const hour = Math.trunc(millisecondQuantity / 3600000);
  const minutes = Math.trunc((millisecondQuantity % 3600000) / 60000);
  const seconds = Math.trunc(((millisecondQuantity % 3600000) % 60000) / 1000);
  const millisecond = millisecondQuantity - (3600000 * hour) - (minutes * 60000) - (seconds * 1000);
  return `${hour.toString().padStart(2, 0)}:${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}.${millisecond.toString().padStart(3, 0)}`;
}

/**
 * Returns the angle (in radians) between the hands of an analog clock
 * for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 *
 * SMALL TIP: convert to radians just once, before return in order to not lost precision
 *
 * @param {date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 */
function angleBetweenClockHands(date) {
  const dateFormat = new Date(date);
  let hours = dateFormat.getHours();
  if (hours - 3 < 0) hours = hours - 3 + 24;
  else hours -= 3;
  if (hours > 12) {
    switch (hours) {
      case 13:
        hours = 1;
        break;
      case 14:
        hours = 2;
        break;
      case 15:
        hours = 3;
        break;
      case 16:
        hours = 4;
        break;
      case 17:
        hours = 5;
        break;
      case 18:
        hours = 6;
        break;
      case 19:
        hours = 7;
        break;
      case 20:
        hours = 8;
        break;
      case 21:
        hours = 9;
        break;
      case 22:
        hours = 10;
        break;
      case 23:
        hours = 11;
        break;
      default:
        hours = 0;
        break;
    }
  }
  const minutes = dateFormat.getMinutes();
  let ugol = Math.abs(0.5 * (60 * hours + minutes) - 6 * minutes);
  if (ugol > 180) ugol /= 3;
  return ((Math.PI * ugol) / 180);
}


module.exports = {
  parseDataFromRfc2822,
  parseDataFromIso8601,
  isLeapYear,
  timeSpanToString,
  angleBetweenClockHands,
};
