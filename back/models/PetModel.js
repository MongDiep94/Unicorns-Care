import mongoose, { Mongoose } from "mongoose";

let petSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    age: Number,
    gender: String,
    specie: String,
    element: String,
    image: String,
    bio: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

let Pet = mongoose.model("Pet", petSchema);

export default Pet;
