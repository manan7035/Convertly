import express from "express";
import apiApp from "./index.js";

const app = express();
const PORT = 3001;

app.use('/api', apiApp);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Local server running on http://localhost:${PORT}`);
});
