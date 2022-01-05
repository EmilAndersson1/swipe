import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  favorites: [],
  following: [],
});

const User = mongoose.model("User", userSchema);
export default User;
