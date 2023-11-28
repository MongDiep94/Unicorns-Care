import express from "express";
import {
  GetLastPets,
  GetOnePet,
  GetAllPets,
  NewPet,
  UpdatePet,
  DeletePet,
  GetRandomPet,
} from "../controllers/petController.js";
import { verifyToken } from '../middlewares/auth.js';


const petRouter = express.Router();

// RECUPERER TOUTES LES CREATURES
petRouter.get("/pets", GetAllPets);

// RECUPERER LES 3 DERNIERES CREATURES ENREGISTREES
petRouter.get("/last-pets", GetLastPets);

// RECUPERER UNE SEULE CREATURE
petRouter.get("/pet/:petId", GetOnePet);

// RECUPERER RANDOM CREATURE
petRouter.get("/random-pets", GetRandomPet);

// CREER UNE CREATURE
petRouter.post("/pet/create", verifyToken, NewPet);

// METTRE A JOUR UNE CREATURE
petRouter.patch("/pet/update/:petId", verifyToken, UpdatePet);

// SUPPRIMER UNE CREATURE
petRouter.delete("/pet/delete/:petId", verifyToken, DeletePet);

export default petRouter;
