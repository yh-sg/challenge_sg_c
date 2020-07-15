const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = Schema({
  name:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  age:{
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  usertype:{
    type: String,
    enum: ["senior", "helper"],
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

//before save, find the password and bcrypt the password
userSchema.pre("save", function(next) {
  let user = this;
  // Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  //hash the password
  let hash = bcrypt.hashSync(user.password, 10);

  // Override the cleartext password with the hashed one
  user.password = hash;
  next();
});

userSchema.methods.validPassword = function(password) {
  // Compare is a bcrypt method that will return a boolean,
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
