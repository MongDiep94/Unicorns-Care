import express from 'express'
import { AddUser, AllUsers, GetOneUser, GetUserPets, GetUserSitter, Login, Logout, NewUserPet, NewUserSitter, Register, UpdateUser } from '../controllers/userController.js';

const userRouter = express.Router();

//Login form
userRouter.post("/login", Login)

//Register form
userRouter.post("/register", Register)

//Deconnexion
userRouter.get("/logout", Logout)

//SHOW ALL USERS
userRouter.get("/all-users", AllUsers)

//ADD USER
userRouter.post("/add-user", AddUser)

//SHOW USER
userRouter.get("/:userId", GetOneUser)

//UPDATE USER
userRouter.patch("/update/:userId", UpdateUser)

//USER PETS
userRouter.get("/user-pet/:userId", GetUserPets)
userRouter.post("/new-pet/:userId", NewUserPet)

//USER SITTERS
userRouter.get("/user-sitter/:userId", GetUserSitter)
userRouter.post("/new-sitter/:userId", NewUserSitter)


export default userRouter
