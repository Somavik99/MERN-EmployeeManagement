import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

mongoose.set("strictQuery", false);

async function mongooseConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected successfully");
  } catch (err) {
    console.log("Error happened: " + err.message);
  }
}

app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(cookieParser());

mongooseConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening to the port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error in connecting : ${error.message}`);
  });
