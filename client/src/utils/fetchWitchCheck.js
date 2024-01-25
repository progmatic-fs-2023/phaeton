export default async function fetchWithCheck(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Something went wrong');
  }
  return response.json();
}
