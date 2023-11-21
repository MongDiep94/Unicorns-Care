import express from "express";

const chatroomRouter = express.Router();

router.get("/chat", (req, res) => {
  res.send("Chatroom");
});

export default chatroomRouter;
