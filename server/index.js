import express from 'express';
import 'dotenv/config';

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
