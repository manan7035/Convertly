import express from "express";
import { app as apiApp } from "./index";

const app = express();
const PORT = 3000;

app.use('/', apiApp);

app.listen(PORT, () => {
  console.log("Local server running on http://localhost:3000");
});