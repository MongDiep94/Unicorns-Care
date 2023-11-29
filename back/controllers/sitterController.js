import Sitter from "../models/SitterModel.js";
import User from "../models/UserModel.js";

/* Récupération de tous les pet-sitters */
export const GetAllSitters = async (req, res) => {
  try {
    const sitters = await Sitter.find({}).populate("user").sort({ createdAt: -1 }).limit(30);
    res.json(sitters);
  } catch (error) {
    res.json({
      message: "Erreur, impossible de récupérer tous les pet-sitters",
    });
  }
};

/* Récupération des 3 derniers sitters créés en BDD */
export const GetLastSitters = async (req, res) => {
  try {
    const lastSitters = await Sitter.find().populate("user").sort({ createdAt: -1 }).limit(3);
    res.json(lastSitters);
  } catch (error) {
    res.json({
      message: "Impossible d'obtenir les 3 derniers sitters enregistrés",
    });
  }
};

/* Récupérer un seul sitter par son ID */
export const GetOneSitter = async (req, res) => {
  try {
    const { id } = req.params;

    let sitter = await Sitter.findById(id).populate("user");

    res.json(sitter);
  } catch (error) {
    res.json({ message: "Désolé, aucun sitter trouvé avec cet ID" });
  }
};

/* Récupérer un random sitter */
export const GetRandomSitter = async (req, res) => {
  try {
    // Use Mongoose to find a random sitter and populate the 'user' field
    let randomSitter = await Sitter.aggregate([{ $sample: { size: 2 } }])
    .lookup({ from: 'users', localField: 'user', foreignField: '_id', as: 'user' })
    .exec();

  // Check if a sitter was found
  if (randomSitter.length > 0) {
    res.json(randomSitter);
  }
  } catch (error) {
    res.json({ message: "Désolé, aucun random sitter trouvé" });
  }
};

// -----------------------------------------------------
// CREATION D'UN NEW SITTER AU USER
// -----------------------------------------------------

export const NewSitter = async (req, res) => {
  try {
    // Trouver l'actuel user
    const user = await User.findById(req.body.user);

    // Créer un nouveau Sitter
    const newSitter = new Sitter({
      image: req.body.image,
      bio: req.body.bio,
      species: [req.body.species]
    });
    // On n'a pas besoin du id user pour enregistrer un nouveau sitter, donc on l'enlève pour l'enregistrement du nouveau sitter
    //delete newSitter.owner;

    const sitter = new Sitter(newSitter);
    // réassigner l'user au nouveau sitter pour que l'userId apparaîsse dans le nouveau sitter
    sitter.user = user;

    await sitter.save();

    // Ajouter le nouveau sitter dans le profil du user
    user.sitters.push(sitter);
    // save le user avec les modifications
    await user.save();

    res.json(sitter);
  } catch (err) {
    res.json({
      message: "Impossible de créer un nouveau profil de pet sitter",
    });
  }
};

// -----------------------------------------------------
// UPDATE SITTER A L'USER
// -----------------------------------------------------

export const UpdateSitter = async (req, res) => {
  try {
    const { sitterId } = req.params;
    let UpdateSitter = new Sitter({
      image: req.body.image,
      bio: req.body.bio,
      species: [req.body.species],
    });

    let updatedSitter = await Sitter.findByIdAndUpdate(sitterId, UpdateSitter);
    res.json(updatedSitter);
  } catch (err) {
    res.json({
      message: "Impossible de mettre à jour le profil du pet sitter",
    });
  }
};

// -----------------------------------------------------
// DELETE SITTER A L'USER
// -----------------------------------------------------

export const DeleteSitter = async (req, res) => {
  try {
    const { sitterId } = req.params;
    // Chercher le sitter
    const sitter = await Sitter.findById(sitterId);
    if (!sitter) {
      return res.json({ message: "Impossible de trouver le pet sitter" });
    }
    const userId = sitter.user;
    // Chercher le user
    const user = await User.findById(userId);

    // supprimer le sitter de la collection Sitters
    await sitter.remove();
    // supprimer le sitter de la collection du user
    user.sitter.pull(sitter);
    await user.save();
  } catch (err) {
    res.json({ message: "Impossible de supprimer le sitter" });
  }
};
