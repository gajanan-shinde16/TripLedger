const User = require("../models/user")
module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs")
}


module.exports.signup = async(req,res)=>{
    try{
        let {email,username,password} = req.body;
        let newUser = new User({email,username});
        let registeredUser = await User.register(newUser,password);
        // console.log(registeredUser);

        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }

            req.flash("success","Welcome to WanderLust!");
            res.redirect("/listings");
        })
        
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs")
}

module.exports.Login = async(req,res)=>{ // Actually it doesnt login it do only things that after login by passport so passport is e=what logins user
        req.flash("success",`Welcome Back @${req.body.username}`);
        const redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    }