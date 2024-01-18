export default function dateFormatter(str) {
  const day = str.substring(0, 2);
  const month = str.substring(2, 4);
  const year = str.substring(4, 8);

  return new Date(year, month - 1, day);
}
