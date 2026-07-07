const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs"); 
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js")
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
const port = process.env.PORT || 8080;



const listingRouter = require("./routes/listing.js");
const reviewrouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const dbUrl = process.env.ATLASDB_URL;


main().then(()=>{ 
    console.log("connected to DB");
}).
catch(err => console.log(err));

async function main() { 
  await mongoose.connect(dbUrl);

}

app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views")); 
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
const secret = process.env.SECRET;
const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto : {
        secret
    },
    touchAfter : 24 * 3600,
})

store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE");
});

const sessionOptions = {
    store,
    secret,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
};

// app.get("/",(req,res)=>{
//     res.send("this is root");
// });



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    
    next();
});



app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewrouter); 
app.use("/",userRouter);

app.use((req,res,next)=>{ //not supported in latest  dont use route and replace .all to .use if no matches this will execute
    next(new ExpressError(404,"Page not found!"));
})

app.use((err,req,res,next)=>{
    let {statusCode=500,message="some error occured!"} = err;
    res.status(statusCode).render("error.ejs",{message});
}) 

app.listen(8080,()=>{
    console.log(`listening from port ${port}`); 
}); 
