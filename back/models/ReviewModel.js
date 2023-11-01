import mongoose from "mongoose";

let reviewSchema = mongoose.Schema(
  {
    content: String,
    rating: Number,
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    sitter: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sitter",
      },
    ]
  },
  {
    timestamps: true,
  }
);

let Review = mongoose.model("Review", reviewSchema);

export default Review;
