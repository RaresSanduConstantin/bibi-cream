import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  createdAd: {
    type: Date,
    default: Date.now,
  },
});

const UserGoogle = mongoose.model("UserGoogle", UserSchema);

export default UserGoogle;
