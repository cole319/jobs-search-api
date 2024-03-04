//imports
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRoutes.js";

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

//routes
// app.get("/", (req, res) => {
//   res.send("<h1>hello from Jobs API server</h1>");
// });

//routes
app.use("/api/v1/test", testRoutes);

//listen
app.listen(PORT, () => {
  console.log(
    `Node server running in ${process.env.DEV_MODE} mode on port: ${PORT}`
      .bgCyan.white
  );
});
