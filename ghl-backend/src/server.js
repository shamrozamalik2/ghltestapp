import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";

const app = express();

(async () => {
  await connectDB();
  
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
})();