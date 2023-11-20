import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { connectDB } from './config/database.js'

//Auth loging
// for hashing and comparing passwords
import bcrypt from 'bcrypt'
//for generating and verifying JSON web tokens
import jwt from 'jsonwebtoken'
// for storing user details (email and hashed password)
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

//Router
import userRouter from './routes/UserRouter.js'
import petRouter from './routes/PetRouter.js'
import sitterRouter from './routes/SitterRouter.js'

const app = express()

dotenv.config()
// création dossier Public
app.use(express.static("public"))

// middleware formulaire
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// appel du module cors pour lier les urls back et front
app.use(cors());

// middleware body parser pour lire les données des fichiers json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//log
const adapter = new FileSync("./database.json");
const db = low(adapter);

// Define a JWT secret key. This should be isolated by using env variables for security
const jwtSecretKey = process.env.SECRET

connectDB

app.use(petRouter)
app.use(sitterRouter)
app.use(userRouter)


///////////////////////////////////////////////////////////////////////////
app.listen(process.env.PORT,()=>{
  console.log(`le serveur est exécuté sur ${process.env.BASE_URL}`)
})
