import * as dotenv from "dotenv";
dotenv.config();

export default {
  APP_ID: "brainio",
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: process.env.PORT ?? 4000,
  APP_SECRET: process.env.APP_SECRET,
  BASE_URL: process.env.BASE_URL ?? "http://localhost:4000",
};
