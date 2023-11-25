import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const verifyToken = (req, res, next) => {
  try {
    // Extraction du token du header Authorization de la requête entrante. Fonction split pour tout récupérer après l'espace après "Bearer" dans le header.
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
      return  res.json({message: "Vous n'êtes pas authentifié"})
  }
    // Fonction verify pour décoder le token.
    const decodedToken = jwt.verify(token, process.env.SESSION_TOKEN);
    // Extraction de l'ID utilisateur du token et le rajouter à l’objet Request afin que les différentes routes puissent l’exploiter.
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
      userFirstName: user.firstName,
      userFirstName: user.email,
      accessToken: sessionToken,
    };
    // Si tou est OK, exécution de la fonction
    next();
  } catch (error) {
    res.status(401).json({message: "Vous n'êtes pas autorisé à accéder à cette page"});
  }
};

export const isAdmin = async (req, res, next) => {

  const user = await User.findById(req.userId)

  if(!user){
      return res.json({message: "Aucun utilisateur trouvé avec cet ID"})
  }

  if(user.isAdmin !== true){
      return res.json({message: "Vous devez être administrateur pour accéder à cette ressource"})
  }

  next();
  return;

}
