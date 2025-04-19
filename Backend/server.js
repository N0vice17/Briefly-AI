import express from "express"
import http from "http"
import cors from "cors"
import { Server } from "socket.io"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import router from "./routes/auth.js"
// import message from "./routes/message.js"

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: "*",
    },
})

app.use(cors());
app.use(express.json());

app.use("/api/auth", router);
// app.use("/api/messages", message);

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("join", (userId) => {
      socket.join(userId);
    });
    socket.on("send_message", (data) => {
      const { from, to, message } = data;
      io.to(to).emit("receive_message", { from, message, timestamp: Date.now() });
      const Message = require("./models/Message");
      const newMsg = new Message({ from, to, message });
      newMsg.save();
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
  
  server.listen(process.env.PORT ,() => {
    console.log(`Server running on port ${process.env.PORT}`)
    connectDB();
  });