import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { connectDB } from './config/database.js'
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from 'cookie-parser'

//Router
import userRouter from './routes/UserRouter.js'
import petRouter from './routes/PetRouter.js'
import sitterRouter from './routes/SitterRouter.js'
import chatroomRouter from './routes/ChatroomRouter.js'

const app = express()

dotenv.config()
// création dossier Public
app.use(express.static("public"))

// Création d'un serveur avec le module http qui englobe app
const server = createServer(app);

// middleware formulaire
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// appel du module cors pour lier les urls back et front
app.use(cors());

// middleware body parser pour lire les données des fichiers json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// permet de récupérer le cookie en string dans le HTTP en objet JS
app.use(cookieParser());

connectDB

// Paramètres web socket
//// Connect io with the front-react server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
  cors: {
    origin: process.env.BASE_URL_FRONT,
  },
});

app.use(petRouter)
app.use(sitterRouter)
app.use(userRouter)
app.use(chatroomRouter)

let users = [];
// Listen for when the client connects via socket.io-client
io.on("connection", (socket) => {
  console.log(`${socket.id} user just connected`);

  //Listens and logs the message to the console
  socket.on("message", (data) => {
    io.emit("messageResponse", data);
    console.log('message', data)
  });

  //Listens when a new user joins the server
  socket.on("newUser", (data) => {
    console.log('newUser', data )
    //Adds the new user to the list of users
    users.push(data);
    console.log('users array socket', users);
    //Sends the list of users to the client
    io.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log(`An user disconnected`);
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    // console.log(users);
    //Sends the list of users to the client
    io.emit("newUserResponse", users);
    socket.disconnect();
  });
});


///////////////////////////////////////////////////////////////////////////
// server = server io + app
server.listen(process.env.PORT,()=>{
  console.log(`le serveur est exécuté sur ${process.env.BASE_URL}`)
})
