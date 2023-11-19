import Pet from "../models/PetModel.js";
import User from "../models/UserModel.js";

/* Récupération de tous les pets */

export const GetAllPets = async (req, res) => {
  try {
    const pets = await Pet.find({}).sort({ createdAt: -1 }).limit(30);
    res.json(pets);
  } catch (error) {
    res.json({ message: "Erreur, impossible de récupérer les créatures" });
  }
};

/* Récupération des 3 dernières créatures créées en BDD */
export const GetLastPets = async (req, res) => {
  try {
    const lastPets = await Pet.find().sort({ createdAt: -1 }).limit(3);
    res.json(lastPets);
  } catch (error) {
    res.json({
      message: "Impossible d'obtenir les 3 dernières créatures enregistrées",
    });
  }
};

/* Récupérer une seule créature par son ID */
export const GetOnePet = async (req, res) => {
  try {
    const { petId } = req.params;

    let pet = await Pet.findById(petId).populate("owner");
    res.json(pet);
  } catch (error) {
    res.json({ message: "Désolé, aucune créature trouvée avec cet ID" });
  }
};

/* Récupérer un random sitter */
export const GetRandomPet = async (req, res) => {
  try {
    // Use Mongoose to find a random pet and populate the 'owner' field
    let randomPet = await Pet.aggregate([{ $sample: { size: 2 } }])
    .lookup({ from: 'users', localField: 'owner', foreignField: '_id', as: 'owner' })
    .exec();

  // Check if a sitter was found
  if (randomPet.length > 0) {
    res.json(randomPet);
  }
  } catch (error) {
    res.json({ message: "Désolé, aucun random pet trouvé" });
  }
};

// -----------------------------------------------------
// CREATION D'UN NEW PET AU OWNER
// -----------------------------------------------------

export const NewPet = async (req, res) => {
  try {
    // Trouver l'actuel user/owner
    const owner = await User.findById(req.body.owner);

    // Créer un nouveau Pet
    const newPet = new Pet({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      specie: req.body.specie,
      element: req.body.element,
      image: req.body.image,
    });
    // On a pas besoin du id owner pour enregistrer un nouveau pet, donc on l'enlève pour l'enregistrement du nouveau pet
    delete newPet.owner;

    const pet = new Pet(newPet);
    // réassigner l'owner au nouveau pet pour que l'ownerId apparaîsse dans le nouveau pet
    pet.owner = owner;

    await pet.save();

    // Ajouter le nouveau pet dans l'array de pets du user/owner
    owner.pets.push(pet);
    // save le user avec les modifications
    await owner.save();

    res.json(pet);
  } catch (err) {
    res.json({
      message:
        "Impossible de créer un nouveau profil de créature pour ce propriétaire",
    });
  }
};

// -----------------------------------------------------
// UPDATE PET AU OWNER
// -----------------------------------------------------

export const UpdatePet = async (req, res) => {
  try {
    const { petId } = req.params;
    let UpdatePet = new Pet({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      specie: req.body.specie,
      element: req.body.element,
      image: req.body.image,
    });

    let updatedPet = await Pet.findByIdAndUpdate(petId, UpdatePet);
    res.json(updatedPet);
  } catch (err) {
    res.json({
      message: "Impossible de mettre à jour la créature pour ce propriétaire",
    });
  }
};

// -----------------------------------------------------
// DELETE PET AU OWNER
// -----------------------------------------------------

export const DeletePet = async (req, res) => {
  try {
    const { petId } = req.params;
    // Chercher le pet
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.json({ message: "Impossible de trouver la créature" });
    }
    const ownerId = pet.owner;
    // Chercher le owner
    const owner = await User.findById(ownerId);

    // supprimer le pet de la collection Pets
    await pet.remove();
    // supprimer le pet de la liste du user/owner
    owner.pets.pull(pet);
    await owner.save();
  } catch (err) {
    res.json({ message: "Impossible de supprimer la créature" });
  }
};
