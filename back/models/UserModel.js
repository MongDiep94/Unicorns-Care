import mongoose from "mongoose";

let userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    lastName: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: [
      {
        number: Number,
        street: String,
        complement: String,
        zipcode: String,
      },
    ],
    phone: String,
    isAdmin: Boolean,
    sitter: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sitter",
      },
    ],
    pet: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
  },
  {
    timestamps: true,
  }
);

let User = mongoose.model("User", userSchema);

export default User;
