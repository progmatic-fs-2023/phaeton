import dateFormatter from './dateFormatter';

function getDaysBetweenDates(fromDate, toDate) {
  // One day in milliseconds
  const oneDay = 24 * 60 * 60 * 1000;

  // Calculate the difference in milliseconds
  const diffMilliseconds = Math.abs(dateFormatter(toDate) - dateFormatter(fromDate));

  // Convert back to days and return
  return Math.round(diffMilliseconds / oneDay);
}
export default getDaysBetweenDates;
