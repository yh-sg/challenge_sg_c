const router = require("express").Router();
const User = require("../models/user.model")
const passport = require("../config/passportConfig");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const isLoggedIn = require("../config/loginBlocker");

router.get("/signup", (req,res)=>{
  res.render("auth/signup");
});

router.post("/signup", async (req, res) => {
  try{
    let {name,address,age,phone,password} = req.body;

    let hashedPassword = await bcrypt.hash(password, saltRounds);
    let user = new User({
      name,
      address,
      age,
      phone,
      password: hashedPassword,
    })

    let savedUser = await user.save();

    if(savedUser){
      res.redirect("/signin");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/signin", (req,res)=>{
  res.render("auth/signin");
})

//-- Login Route
router.post(
  "/auth/signin",
  passport.authenticate("local", {
    successRedirect: "/home", //after login success
    failureRedirect: "/auth/signin", //if fail
    failureFlash: "Invalid Username or Password",
    successFlash: "You have logged In!"
  })
);

//--- Logout Route
router.get("/auth/logout", (request, response) => {
  request.logout(); //clear and break session
  request.flash("success", "Dont leave please come back!");
  response.redirect("/auth/signin");
});

module.exports = router;