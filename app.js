require('dotenv').config();

const express=require("express");
const path=require("path");
const ConnectTOMongoDb=require("mongoose");
const cookieParser = require('cookie-parser')

const userRoute=require("./routes/user");
const urlRoute=require("./routes/url")
const {CheckAuthenticationforuser,requireAuth}=require("./middlewares/authentication");

const app=express();
const PORT=process.env.PORT ||8000;

app.set("view engine","ejs");
app.set("views",path.resolve("views"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

// app.use((req, res, next) => {
//     res.locals.token = req.cookies.token || null;
//     next();
// });

app.use(CheckAuthenticationforuser("token"))

app.use("/user",userRoute);
app.use("/url",urlRoute);


app.get("/",(req,res)=>{
    return res.render("home",{
        user: res.locals.user,
    });
});

ConnectTOMongoDb.connect(process.env.MONGO_URL).then(()=>console.log(`MongoDb Started`));

app.listen(PORT,()=>console.log(`Server Started at Port:${PORT}`));