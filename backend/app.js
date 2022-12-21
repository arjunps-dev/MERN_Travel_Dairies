import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routing/user-routes";
import cors from "cors";

const app = express();
dotenv.config();
mongoose.set('strictQuery', false);

// middlewares
app.use(cors());
app.use(express.json())
app.use("/user", userRouter);


// connections
mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.tgdykbm.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() =>
      app.listen(5000, () =>
        console.log("Connection successful & Listening to localhost port 5000")
      )
    )
    .catch((err) => console.log(err));
