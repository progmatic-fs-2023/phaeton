export default function logger(req, res, next) {
  console.log(`(${req.ip}) ${req.method} ${req.url}`);
  next();
}
