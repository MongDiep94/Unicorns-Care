import mongoose from "mongoose";

let sitterSchema = mongoose.Schema(
  {
    image:  String,
    bio: String,
    species: [String],
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

let Sitter = mongoose.model("Sitter", sitterSchema);

export default Sitter;
