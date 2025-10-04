const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/user");


//signup route
router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));

//Login Route
router.route("/login")
.get(userController.renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect : "/login" , 
        failureFlash : true
    }),
    userController.Login
);


//Logout Route

router.get("/logout",(req,res)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }

        req.flash("success","Logged You out!");
        res.redirect("/listings");
    })
});
module.exports = router;