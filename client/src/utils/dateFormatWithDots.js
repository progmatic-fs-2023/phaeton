function dateFormatWithDots(inputDate) {
  const day = inputDate.substring(0, 2);
  const month = inputDate.substring(2, 4);
  const year = inputDate.substring(4, 8);
  return `${day}.${month}.${year}`;
}
export default dateFormatWithDots;
