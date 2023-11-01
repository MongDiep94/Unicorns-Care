import express from 'express'
import { GetLastPets, GetOnePet, GetPets } from '../controllers/petController.js';

const petRouter = express.Router();

// RECUPERER TOUTES LES CREATURES
petRouter.get("/pets", GetPets)

// RECUPERER LES 3 DERNIERES CREATURES ENREGISTREES
petRouter.get("/last-pets", GetLastPets)

// RECUPERER UNE SEULE CREATURE
petRouter.get("/pet/:id", GetOnePet)

export default petRouter
