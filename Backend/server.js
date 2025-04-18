const express = require("express")
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")
const connectDB = require("./config/db")
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: "*",
    },
})

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/messages", require("./routes/message"));

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
  
  const PORT = process.env.PORT;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));