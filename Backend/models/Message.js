const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    from: String,
    to: String,
    message: String,
    timestamp:{
        type: Date,
        default: Date.now,
    },
})

const message = mongoose.model("Message",MessageSchema);
export default message