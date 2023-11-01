import Pet from "../models/PetModel.js"

/**
 *
 * @param {*} req
 * @param {*} res
 * Récupération de tous les pets
 */
export const GetPets = async (req, res) => {
    try {
        const pets = await Pet.find({}).sort({createdAt: -1}).limit(30)

        res.json(pets)
    } catch (error) {
        res.json({message:"Erreur, impossible de récupérer les créatures"})

    }

}

/**
 *
 * @param {*} req
 * @param {*} res
 * Récupération des 3 dernières créatures créées en BDD
 */
export const GetLastPets = async (req, res) => {

try {
    const lastPets = await Pet.find().sort({createdAt: -1}).limit(3)

    res.json(lastPets)
} catch (error) {
    res.json({message:"Impossible d'obtenir les 3 dernières créatures enregistrées"})
}

}

/**
 *
 * @param {*} req
 * @param {*} res
 * Récupérer une seule créature par son ID
 */
export const GetOnePet = async (req, res) => {

    try {
         const {id} = req.params

    let pet = await Pet.findById(id)

    res.json(pet)
    } catch (error) {
        res.json({message:"Désolé, aucune créature trouvée avec cet ID"})
    }


}
