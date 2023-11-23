import express from "express";

const chatroomRouter = express.Router();

chatroomRouter.get("/chat", (req, res) => {
  res.send("Chatroom");
});

export default chatroomRouter;
