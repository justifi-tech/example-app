import Justifi from "@justifi/justifi-node";
import express from "express";
import { configAppRoutes } from "./routes";

export interface JustifiContext {
  client: Justifi;
}

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
  throw new Error("CLIENT_ID and CLIENT_SECRET must be set")
}

const client = Justifi.client().withCredentials({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
})
const context: JustifiContext = { client };

const app = express();
app.use(express.json());

configAppRoutes(app, context).listen(process.env.PORT, () => {
  console.log(`Example api listening on port ${process.env.PORT}`);
});
