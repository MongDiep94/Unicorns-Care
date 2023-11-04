import bcrypt from "bcrypt";
import User from "../models/UserModel.js";

// -----------------------------------------------------
// LOGIN
// -----------------------------------------------------
/* Système classique de connexion avec envoie de la session et ou cookie */
export const Login = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  // GUARD CLAUSE
  if (!user) {
    return res.json({ message: "Email introuvable" });
  }

  let checkPassword = bcrypt.compareSync(req.body.password, user.password);
  if (!checkPassword) {
    return res.json({
      message: "Mot de passe incorrecte, veuillez revoir votre saisie",
    });
  }

  if (user.isAdmin === true) {
    req.session.isAdmin = user._id;
  } else {
    req.session.isLogged = user._id;
  }
  res.cookie("user", JSON.stringify(req.session));
  res.json({ login: user.login, isAdmin: user.isAdmin, email: user.email });
};

// -----------------------------------------------------
// REGISTER
// -----------------------------------------------------
/* Système d'inscription avec vérification des doublons et de l'existant */
export const Register = async (req, res) => {
  try {
    // Je vérifie que l'email n'existe pas
    let checkMailExist = await User.findOne({ email: req.body.email });
    // Je vérifie que le login n'est pas utilisé
    let checkLoginExist = await User.findOne({ login: req.body.login });

    if (checkMailExist) {
      return res.json({ message: "Cet email est déjà enregistré" });
    }
    if (checkLoginExist) {
      return res.json({ message: "Ce login est déjà utilisé" });
    }

    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      address: [
        {
          number: req.body.number,
          street: req.body.street,
          city: req.body.city,
          zipcode: req.body.zipcode,
        },
      ],
      phone: req.body.phone,
      isAdmin: false
    });

    // Mon hook pre va s'excuter avant de sauvegarder dans la base de données (hachage de mot de passe)
    await newUser.save();

    res.json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    res.json({ message: "Impossible de créer un compte" });
  }
};

// -----------------------------------------------------
// LOGOUT
// -----------------------------------------------------

export const Logout = (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/login");
  });
};

// -----------------------------------------------------
// SHOW ALL USERS
// -----------------------------------------------------

// Afficher tous les users
export const AllUsers = async (req, res) => {
  try {
    let users = await User.find({});
    res.json(users);
  } catch (err) {
    res.json({ message: "Impossible de trouver la liste des utilisateurs" });
  }
};

// -----------------------------------------------------
// CRUD USER
// -----------------------------------------------------

// ADD USER
export const AddUser = async (req, res) => {
  try {
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      address: [
        {
          number: req.body.number,
          street: req.body.street,
          city: req.body.city,
          zipcode: req.body.zipcode,
        },
      ],
      phone: req.body.phone,
      isAdmin: false
    });
    await newUser.save();

    res.json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    res.json({ message: "Impossible de créer un compte" });
  }
};

// SHOW USER
export const GetOneUser = async (req, res) => {
  try {
    const { userId } = req.params;
    let user = await User.findById(userId);
    res.json(user);
  } catch (err) {
    res.json({ message: "Impossible de trouver l'utilisateur" });
  }
};

// UPDATE USER
export const UpdateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    let UpdateUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      address: [
        {
          number: req.body.number,
          street: req.body.street,
          city: req.body.city,
          zipcode: req.body.zipcode,
        },
      ],
      phone: req.body.phone,
      isAdmin: false,
    });

    let updatedUser = await User.findByIdAndUpdate(userId, UpdateUser);
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: "Impossible de mettre à jour l'utilisateur" });
  }
};

// -----------------------------------------------------
// PET
// -----------------------------------------------------
export const GetUserPets = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    console.log("user pets", user.pets);
  } catch (err) {
    res.json({
      message: "Impossible de trouver les créatures de ce propriétaire",
    });
  }
};

export const NewUserPet = async (req, res) => {
  try {
    const { userId } = req.params;
    // Créer un nouveau profil pet
    const newPet = new Pet({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      specie: req.body.specie,
      element: req.body.element,
      image: req.body.image
    });
    console.log("newPet", newPet);
    // Get user
    const user = await User.findById(userId);
    // Assigner user comme le owner du pet
    newPet.owner = user;
    // Save le pet
    await newPet.save();
    // Ajouter pet dans l'array de pets du user/owner
    user.pets.push(newPet);
    // save le user avec les modifications
    await user.save();
    res.json(newPet);
  } catch (err) {
    res.json({ message: "Impossible de créer un nouveau profil de créature" });
  }
};

// -----------------------------------------------------
// SITTER
// -----------------------------------------------------
// AFFICHER UN SITTER
export const GetUserSitter = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    console.log("user sitter", user.sitter);
  } catch (err) {
    res.json({
      message: "Impossible de trouver le sitter",
    });
  }
};

// CREER UN NOUVEAU SITTER
export const NewUserSitter = async (req, res) => {
  try {
    const { userId } = req.params;
    // Créer un nouveau profil sitter
    const newSitter = new Sitter({
      image: req.body.image,
      bio: req.body.bio,
      species: [req.body.species]
    });
    console.log("newSitter", newSitter);
    // Get user
    const user = await User.findById(userId);
    // Assigner user comme sitter
    newSitter.user = user;
    // Save le sitter
    await newSitter.save();
    // Ajouter sitter dans le profil du user
    user.sitters.push(newSitter);
    // save le user avec les modifications
    await user.save();
    res.json(newSitter);
  } catch (err) {
    res.json({ message: "Impossible de créer un nouveau profil de sitter" });
  }
};
