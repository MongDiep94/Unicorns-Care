import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import Sitter from "../models/SitterModel.js";
import Pet from "../models/PetModel.js";

// -----------------------------------------------------
// LOGIN
// -----------------------------------------------------
/* Système classique de connexion avec envoie de la session et ou cookie */
export const Login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    // GUARD CLAUSE
    if (user) {
      if (!req.body.password === user.password) {
        return res.status(401).json({
          message: "Mot de passe incorrecte, veuillez revoir votre saisie",
        });
        // let checkPassword = bcrypt.compareSync(req.body.password, user.password);
        // if (!checkPassword) {
        //   return res.status(401).json({
        //     message: "Mot de passe incorrecte, veuillez revoir votre saisie",
        //   });
      }
      // Generate an access token
      const sessionToken = jwt.sign(
        { id: user.id },
        process.env.SESSION_TOKEN,
        {
          expiresIn: "24h",
        }
      );
      console.log("Generated Token:", sessionToken);
      res
        .cookie("sessionToken", sessionToken, {
          httpOnly: true,
          secure: false,
        })
        .status(200)
        .json({
          userId: user._id,
          userFirstName: user.firstName,
          sessionToken: sessionToken,
        });
    }
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(401).json({ message: "Utilisateur introuvable avec cet email" });
  }
};

// -----------------------------------------------------
// REGISTER
// -----------------------------------------------------
/* Système d'inscription avec vérification des doublons et de l'existant */
export const Register = async (req, res) => {
  //RegEx pwd. entre accepte tous les lettres minuscules et majuscules, les chiffres et caractères spéciaux, entre 8 et 30 caractères.
  const checkPwd =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/;

  try {
    // Je vérifie que l'email n'existe pas
    let checkMailExist = await User.findOne({ email: req.body.email });

    if (checkMailExist) {
      return res.status(400).json({ message: "Cet email est déjà enregistré" });
    }
    if (!checkPwd.test(req.body.password)) {
      return res.status(400).json({
        message: "Le mot de passe ne respecte pas les conditions",
      });
    }

    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      photo: "",
      phone:"",
      address: [
        {
          number: "",
          street: "",
          zipcode: "",
          city: "",
          location: "",
        },
      ],
      sitter: null,
      pet: [""],
      role: "user",
    });
    console.log("newUser", newUser);

    // Mon hook pre va s'excuter avant de sauvegarder dans la base de données (hachage de mot de passe)
    await newUser.save();
    console.log("new User save success");
    res.json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ message: "Impossible de créer un compte" });
  }
};

// -----------------------------------------------------
// LOGOUT
// -----------------------------------------------------

export const Logout = (req, res) => {
  res
    .clearCookie("accessToken", "firstName", "userId")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
};

// -----------------------------------------------------
// SHOW ALL USERS
// -----------------------------------------------------

// Afficher tous les users
export const AllUsers = async (req, res) => {
  try {
    let users = await User.find({}).populate("sitter");
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
      isAdmin: false,
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
    let user = await User.findById(userId).populate("sitter").populate("pets");
    res.json(user);
  } catch (err) {
    res.json({ message: "Impossible de trouver l'utilisateur" });
  }
};

// UPDATE USER
export const UpdateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    let updatedUser;

    if (req.file) {
      updatedUser = {
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
        photo: {
          src: req.file.filename,
        },
      };
    } else {
      updatedUser = {
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
        photo: {
          src: "",
        },
      };
    }

    await User.findByIdAndUpdate(userId, UpdateUser);
    console.log("updated user", updatedUser);
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: "Impossible de mettre à jour l'utilisateur" });
  }
};

// DELETE USER
export const DeleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("selected user", userId);

    const userDeleted = await User.findOneAndDelete({ _id: userId });
    console.log("deleted user", userDeleted);

    // si le user est déjà supprimé
    if (!userDeleted) {
      return res
        .status(404)
        .json({ message: "Utilisateur non trouvé avec cet ID." });
    }

    // Si le user est sitter, supprimer le sitter associé
    if (userDeleted.sitter) {
      await Sitter.findByIdAndDelete(userDeleted.sitter);
    }

    // Si le user a des pets, supprimer les pets
    if (userDeleted.pets.length > 0) {
      await Pet.deleteMany({ _id: { $in: userDeleted.pets } });
    }

    res.status(200).json({ message: "Utilisateur supprimé." });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({
      message: "Impossible de supprimer cet utilisateur",
    });
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
      image: req.body.image,
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
      species: [req.body.species],
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
