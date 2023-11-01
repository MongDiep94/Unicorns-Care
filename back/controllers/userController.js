import bcrypt from 'bcrypt'
import User from '../models/UserModel.js'

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 * Système classique de connexion avec envoie de la session et ou cookie
 */
export const Login = async (req, res) => {

    let user = await User.findOne({email: req.body.email})

    // GUARD CLAUSE
    if(!user){
       return res.json({message: "Email introuvable"})
    }

    let checkPassword = bcrypt.compareSync(req.body.password, user.password )
    if(!checkPassword){
       return  res.json({message:"Mot de passe incorrecte, veuillez revoir votre saisie"})
    }

    if(user.role === "Admin"){
        req.session.isAdmin = user._id
    }
    else{

        req.session.isLogged = user._id
    }
    res.cookie("user", JSON.stringify(req.session))
    res.json({login: user.login, role: user.role, email: user.email})

}

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 * Système d'inscription avec vérification des doublons et de l'existant
 */
export const Register = async (req, res) => {

    try{
        // Je vérifie que l'email n'existe pas
        let checkMailExist = await User.findOne({email: req.body.email})
        // Je vérifie que le login n'est pas utilisé
        let checkLoginExist = await User.findOne({login: req.body.login})

        if(checkMailExist){
            return res.json({message:"Cet email est déjà enregistré"})
        }
        if(checkLoginExist){
            return res.json({message:"Ce login est déjà utilisé"})
        }

        let newUser = new User({
            login: req.body.login,
            email: req.body.email,
            password: req.body.password
        })


        // Mon hook pre va s'excuter avant de sauvegarder dans la base de données (hachage de mot de passe)
        await newUser.save()

        res.json({message: "Utilisateur créé avec succès"})
    }catch(err){

        res.json({message:"Impossible de créer un compte"})
    }



}

// -----------------------------------------------------
// LOGOUT
// -----------------------------------------------------

export const Logout = (req, res) => {

  req.session.destroy((err)=>{
      res.redirect("/login")
  })

}
