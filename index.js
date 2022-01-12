import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import passport from "passport";
import passportConfig from "./config/passportConfig.js";

import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);
app.use(morgan("dev"));
app.use("/api", routes);

//connect till db
const CONNECTION_URL = process.env.CONNECTION_DB_URI;
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const connectDb = async () => {
  try {
    await mongoose.connect(CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};
connectDb();
