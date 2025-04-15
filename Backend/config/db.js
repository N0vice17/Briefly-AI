const mongoose = require("mongoose")
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://debojitganguly69:wbjeenoob12@cluster0.il7lahh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("DataBase Connected");
    }
    catch(err){
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;