import express from "express"
import http from "http"
import cors from "cors"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import router from "./routes/auth.js"

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use("/api/auth", router);
  
  server.listen(process.env.PORT ,() => {
    console.log(`Server running on port ${process.env.PORT}`)
    connectDB();
  });