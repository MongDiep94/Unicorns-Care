import express from 'express'
import { AddUser, AllUsers, GetOneUser, GetUserPets, GetUserSitter, Login, Logout, NewUserPet, NewUserSitter, Register, UpdateUser } from '../controllers/userController.js';
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
// userRouter.post("/user/add", verifyToken, isAdmin, AddUser)
userRouter.post("/user/add", AddUser)


//SHOW USER
// userRouter.get("/user/:userId", verifyToken, GetOneUser)
userRouter.get("/user/:userId", GetOneUser)


//UPDATE USER
// userRouter.patch("/user/:userId/update", verifyToken, isAdmin, UpdateUser)
userRouter.patch("/user/:userId/update", UpdateUser)


//USER PETS
// userRouter.get("/user/:userId/pet", verifyToken, GetUserPets)
// userRouter.post("/user/:userId/new-pet", verifyToken, isAdmin, NewUserPet)
userRouter.get("/user/:userId/pet", GetUserPets)
userRouter.post("/user/:userId/new-pet", NewUserPet)

//USER SITTERS
// userRouter.get("/user/:userId/sitter", verifyToken, GetUserSitter)
// userRouter.post("/user/:userId/new-sitter", verifyToken, isAdmin, NewUserSitter)
userRouter.get("/user/:userId/sitter", GetUserSitter)
userRouter.post("/user/:userId/new-sitter", NewUserSitter)


export default userRouter
