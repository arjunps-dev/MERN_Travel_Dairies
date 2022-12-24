import { compareSync, hashSync } from "bcryptjs";
import User from "../models/User";

//get all users
export const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }
  if (!users) {
    return res.status(500).json({ message: "Unexpected Error Occurred" });
  }
  return res.status(200).json({ users });
};

//signup
export const signup = async (req, res, next) => {
  const { name, email, password} = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.length < 6
  ) {
    return res.status(422).json({ message: "Invalid Data" });
  }

  const hashedPassword = hashSync(password);   

  let user;
  try{ 
   user = new User({email,password: hashedPassword,name});
   await user.save();
   }catch(err){
     return console.log(err);
  }
  if(!user){
    return res.status(500).json({message:"Unexpected Error Occured"});
  }
  return res.status(201).json({user});
};

//login
export const login = async (req, res, next) => {
  const { email, password} = req.body;
  if (
    !email &&
    email.trim() === "" &&
    !password &&
    password.length < 6
  ) {
    return res.status(422).json({ message: "Invalid Data" });
  }
  let existingUser;
  try{
    existingUser = await User.findOne({email});
  }catch(err){
    return console.log(err);
  }
  if(!existingUser){
    return res.status(404).json({message:"User Not Found"});
  }
  const isPawwordCorrect = compareSync(password,existingUser.password);
  if(!isPawwordCorrect){
    return res.status(400).json({message:"Incorrect Password"});
  }
  return res.status(200).json({id:existingUser._id,message:"Login Successful"});
};  