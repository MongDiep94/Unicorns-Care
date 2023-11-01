import express from 'express'

const userRouter = express.Router();

//Login form
userRouter.post("/login")

//Register form
userRouter.post("/register")

//Deconnexion
userRouter.get("/logout")

export default userRouter
