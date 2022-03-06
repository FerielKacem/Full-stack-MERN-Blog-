const express = require("express");
const app = express();
const dotenv = require("dotenv") ;
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/category")
dotenv.config();
const cors = require("cors");
app.use(cors());


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL).then(console.log("connected to mongoDB")).catch(err=>(console.log(err)));






app.use("/server/auth", authRoute);

app.use("/server/users", userRoute);

app.use("/server/posts", postRoute );

app.use("/server/category",categoryRoute  );





app.listen(3001 , ()=>{
    console.log("backend is running");
})