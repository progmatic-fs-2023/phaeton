export default function dateFormatter(dateString) {
  try {
    const year = parseInt(dateString.substring(4, 8), 10);
    const month = parseInt(dateString.substring(2, 4), 10) - 1;
    const day = parseInt(dateString.substring(0, 2), 10);
    return new Date(year, month, day);
  } catch (err) {
    return err;
  }
}
