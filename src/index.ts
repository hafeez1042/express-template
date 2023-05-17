import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import { errorHandler } from "./errors/errorHandler";
import morgan from "morgan";
import router from "./routes";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import morganMiddleware from "./middlewares/morgan.middleware";
import logger from "./utils/logger";

dotenv.config();
const port = process.env.PORT || 4000;

if (!process.env.MONGO_URL) {
  throw new Error("Database not defined!...")
}

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  allowedHeaders: [
    "authorization",
    "content-type",
  ],
}))

const sessionOptions: session.SessionOptions = {
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 14 * 24 * 60 * 60 // = 14 days. Default
  }),
  secret: process.env.SESSION_SECRET || "3e81b6c4-4321-4264-bed5-ba9bcde9afe6",
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: false,
    secure: false,
  }
}

app.set('trust proxy', 1) // trust first proxy

app.use(session(sessionOptions))

await mongoose.connect(process.env.MONGO_URL);

app.use(morganMiddleware)

app.use('/', router);

app.use(errorHandler)

app.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
