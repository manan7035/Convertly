import express from "express";
import { app as apiApp } from "./index";

const app = express();
const PORT = 3001;

app.use('/api', apiApp);

app.listen(PORT, () => {
  console.log(`Local server running on http://localhost:${PORT}`);
});