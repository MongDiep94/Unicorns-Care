import express from 'express'
import { GetBestPets, GetOnePet, GetPets } from '../controllers/petController.js';

const petRouter = express.Router();

// RECUPERER TOUS LES THES
petRouter.get("/pets", GetPets)

// RECUPERER LE THE AVEC LE PLUS DE VENTES
petRouter.get("/bests-pets", GetBestPets)

// RECUPERER UN SEUL THE THE
petRouter.get("/pet/:id", GetOnePet)

export default petRouter
