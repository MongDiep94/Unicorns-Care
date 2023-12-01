import express from 'express'
import { AddUser, AllUsers, DeleteUser, GetOneUser, GetUserPets, GetUserSitter, Login, Logout, NewUserPet, NewUserSitter, Register, UpdateUser } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();


//Login form
userRouter.post("/login", Login)

//Register form
userRouter.post("/register", Register)

//Deconnexion
userRouter.get("/logout", Logout)

//SHOW ALL USERS
userRouter.get("/users", AllUsers)

//ADD USER
userRouter.post("/user/add", AddUser)

//SHOW USER
userRouter.get("/user/:userId", GetOneUser)

//UPDATE USER
userRouter.patch("/user/update/:userId", upload.single('file'), UpdateUser)

//DELETE USER
userRouter.delete("/user/delete/:userId", DeleteUser)

//USER PETS
userRouter.get("/user/:userId/pet", GetUserPets)
userRouter.post("/user/:userId/new-pet", NewUserPet)

//USER SITTERS
userRouter.get("/user/:userId/sitter", GetUserSitter)
userRouter.post("/user/:userId/new-sitter", NewUserSitter)


export default userRouter
