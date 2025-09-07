const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv')
const path = require('path');
const expressLayouts = require("express-ejs-layouts");
dotenv.config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(expressLayouts);
app.set("layout", "layout");

// MONGO DB
mongoose
.connect(process.env.MONGO_URL)
.then( ()=> console.log("DB connecton done"))
.catch( (err)=> console.log("DB Error:",err));

// Routes
const authRoutes = require("./routes/authRoutes");
const symptomRoutes = require("./routes/symptomRoutes");

app.use("/",authRoutes);
app.use("/",symptomRoutes);

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`Server on port:-{port}`)
});
