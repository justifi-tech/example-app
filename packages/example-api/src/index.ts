import Justifi from "@justifi/justifi-node";
import express from "express";
import cors from "cors";
import { configAppRoutes } from "./routes";
import morgan from "morgan";
import { InMemoryCache } from "./cache";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export interface JustifiContext {
  client: Justifi;
  cache: InMemoryCache;
}

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
  throw new Error("CLIENT_ID and CLIENT_SECRET must be set")
}

const client = Justifi.client().withCredentials({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
})
const cache = InMemoryCache.getInstance();
const context: JustifiContext = { client, cache };
const { auth } = require('express-oauth2-jwt-bearer');
const jwtCheck = auth({
  audience: process.env.AUTH_AUDIENCE,
  issuerBaseURL: process.env.AUTH_DOMAIN
});

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors({ origin: "*" }));

configAppRoutes(app, context, jwtCheck).listen(process.env.PORT, () => {
  console.log(`Example api listening on port ${process.env.PORT}`);
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '/../../example-ui/build')));
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../example-ui/build/index.html'))
})