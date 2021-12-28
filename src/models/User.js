import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

//userdata schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  name: { type: String, required: true },
  avatarUrl: String,
  location: String,
});

//유저가 create한 password를 저장하기전에 hash화한다.
//bcryptjs.hash(this.password, saltRound)
userSchema.pre("save", async function () {
  //여기서 this는 lexical 하게 이 함수가 호출된 scope에서의 this를 의미.
  this.password = await bcryptjs.hash(this.password, 5);
});

//schema model object
const User = mongoose.model("User", userSchema);

export default User;
