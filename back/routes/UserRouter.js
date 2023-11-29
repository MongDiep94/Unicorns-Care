import express from 'express'
import { AddUser, AllUsers, DeleteUser, GetOneUser, GetUserPets, GetUserSitter, Login, Logout, NewUserPet, NewUserSitter, Register, UpdateUser } from '../controllers/userController.js';
import { isAdmin, verifyToken } from '../middlewares/auth.js';

const userRouter = express.Router();


//Login form
userRouter.post("/login", Login)

//Register form
userRouter.post("/register", Register)

//Deconnexion
// userRouter.get("/logout", verifyToken, Logout)
userRouter.get("/logout", Logout)


//SHOW ALL USERS
userRouter.get("/users", AllUsers)

//ADD USER
userRouter.post("/user/add", AddUser)


//SHOW USER
userRouter.get("/user/:userId", GetOneUser)

//UPDATE USER
userRouter.patch("/user/update/:userId", UpdateUser)

//DELETE USER
userRouter.delete("/user/delete/:userId", DeleteUser)

//USER PETS
userRouter.get("/user/pet/:userId", GetUserPets)
userRouter.post("/user/new-pet/:userId", NewUserPet)

//USER SITTERS
userRouter.get("/user/sitter/:userId", GetUserSitter)
userRouter.post("/user/new-sitter/:userId", NewUserSitter)


export default userRouter
