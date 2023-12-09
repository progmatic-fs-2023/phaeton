import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\x1b[33m[Server] listening on ${PORT}`, '\x1b[0m');
});
