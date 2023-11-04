import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { connectDB } from './config/database.js'
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

connectDB

app.use(petRouter)
app.use(sitterRouter)
app.use(userRouter)


///////////////////////////////////////////////////////////////////////////
app.listen(process.env.PORT,()=>{
  console.log(`le serveur est exécuté sur ${process.env.BASE_URL}`)
})
