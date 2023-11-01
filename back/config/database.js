import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const connectDB = mongoose.connect(process.env.DB_URI)

mongoose.connection.on("open", ()=> {
  console.log("Connexion à la base de données effectuée avec succès")
})

mongoose.connection.on("error", ()=> {
  console.log("Impossible de se connecter à la BDD")
})
