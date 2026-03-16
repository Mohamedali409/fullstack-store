import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "User name is required "] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },

      select: false,
    },
    confirmPassword: {
      type: String,
      required: function () {
        return this.isNew;
      },
      select: false,
    },
    googleId: { type: String },
    role: {
      type: String,
      enum: ["Admin", "user"],
      default: "user",
    },
  },
  { timestamps: true },
);

userSchema.index({ email: 1 });
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  if (this.password !== this.confirmPassword) {
    throw new Error("Password not match with confirm password");
  }

  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.models.user || mongoose.model("User", userSchema);

export default User;
