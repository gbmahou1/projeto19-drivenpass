import dotenv from "dotenv";
import express, { json } from "express";
import router from './src/routers/index';
import "express-async-errors";

dotenv.config();

const app = express();
app.use(json());
app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})