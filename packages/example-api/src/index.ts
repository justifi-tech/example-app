import express from "express";
import { configAppRoutes } from "./routes";

const app = express();

configAppRoutes(app).listen(process.env.PORT, () => {
  console.log(`Example api listening on port ${process.env.PORT}`);
});
