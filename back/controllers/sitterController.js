import Sitter from "../models/SitterModel.js"

/**
 *
 * @param {*} req
 * @param {*} res
 * Récupération de tous les pet-sitters
 */
export const GetSitters = async (req, res) => {
    try {
        const sitters = await Sitter.find({}).sort({createdAt: -1}).limit(30)

        res.json(sitters)
    } catch (error) {
        res.json({message:"Erreur, impossible de récupérer les cpet-sitters"})

    }

}

/**
 *
 * @param {*} req
 * @param {*} res
 * Récupération des 3 derniers sitters créés en BDD
 */
export const GetLastSitters = async (req, res) => {

try {
    const lastSitters = await Sitters.find().sort({createdAt: -1}).limit(3)

    res.json(lastSitters)
} catch (error) {
    res.json({message:"Impossible d'obtenir les 3 derniers sitters enregistrés"})
}

}

/**
 *
 * @param {*} req
 * @param {*} res
 * Récupérer une seule créature par son ID
 */
export const GetOneSitter = async (req, res) => {

    try {
         const {id} = req.params

    let sitter = await Sitter.findById(id)

    res.json(sitter)
    } catch (error) {
        res.json({message:"Désolé, aucun sitter trouvé avec cet ID"})
    }


}
