import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/database.js'
import userRouter from './routes/UserRouter.js'
import petRouter from './routes/PetRouter.js'


const app = express()

dotenv.config()
// création dossier Public
app.use(express.static("public"))

// middleware formulaire
app.use(express.json())
app.use(express.urlencoded("extended:true"))

// appel du module cors pour lier les urls back et front
app.use(cors());

connectDB

app.use(petRouter)
app.use(userRouter)


///////////////////////////////////////////////////////////////////////////
app.listen(process.env.PORT,()=>{
  console.log(`le serveur est exécuté sur ${process.env.BASE_URL}`)
})
