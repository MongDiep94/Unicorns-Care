import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const verifyToken = async (req, res, next) => {
  try {
    // Extraction du token du header Authorization de la requête entrante. Fonction split pour tout récupérer après l'espace après "Bearer" dans le header.
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Vous n'êtes pas authentifié" });
    }
    console.log("Token:", token);
    // Fonction verify pour décoder le token.
    const decodedToken = jwt.verify(token, process.env.SESSION_TOKEN);
    console.log("Decoded Token:", decodedToken);
    // Extraction de l'ID utilisateur du token et le rajouter à l’objet Request afin que les différentes routes puissent l’exploiter.
    const userId = decodedToken.userId;
    console.log("Decoded Token:", decodedToken);

    // Add the userId to the request object
    req.userId = userId;
    // Si tout est OK, exécution de la fonction
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    res
    .status(401)
    .json({ message: "Vous n'êtes pas autorisé à accéder à cette page" });
  }
  console.log("Headers back:", req.headers);
};

export const isAdmin = async (req, res, next) => {
  console.log("Checking if user is admin. User ID:", req.userId);

  const user = await User.findById(req.userId);

  if (!user) {
    console.log("No user found with ID:", req.userId);

    return res.json({ message: "Aucun utilisateur trouvé avec cet ID" });
  }
  console.log("User details:", user);


  if (user.isAdmin !== true) {
    console.log("User is not an admin. User details:", user);

    return res.json({
      message: "Vous devez être administrateur pour accéder à cette ressource",
    });
  }
  console.log("User is an admin. Proceeding to the next middleware.");

  next();
  return;
};
