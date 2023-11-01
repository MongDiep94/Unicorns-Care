import mongoose from "mongoose";

let conversationSchema = mongoose.Schema(
  {
    content: String,
    owner: [
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

let Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
