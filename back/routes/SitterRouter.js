import express from 'express'
import { GetLastSitters, GetOneSitter, GetSitters } from '../controllers/sitterController.js';


const sitterRouter = express.Router();

// RECUPERER TOUTES LES CREATURES
sitterRouter.get("/sitters", GetSitters)

// RECUPERER LES 3 DERNIERES CREATURES ENREGISTREES
sitterRouter.get("/last-sitters", GetLastSitters)

// RECUPERER UNE SEULE CREATURE
sitterRouter.get("/sitter/:id", GetOneSitter)

export default sitterRouter
