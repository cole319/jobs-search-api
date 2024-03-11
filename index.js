//package imports
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";

//internal imports
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

//dotenv config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//port
const PORT = process.env.PORT || 8080;

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/test", authRoutes);

//validation middleware
app.use(errorMiddleware); //app will crash if specified before routes

//listen
app.listen(PORT, () => {
  console.log(
    `Node server running in ${process.env.DEV_MODE} mode on port: ${PORT}`
      .bgCyan.white
  );
});
