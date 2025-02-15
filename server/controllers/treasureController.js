module.exports = {
    dragonTreasure: async (req,res)=>{
        const db = req.app.get('db')

        let result = await db.get_dragon_treasure(1)

        res.status(200).send(result)

    },

    getUserTreasure: async (req,res) => {
        const userTreasure = await req.app.get('db').get_user_treasure([req.session.user.id])
        return res.status(200).send(userTreasure)
    },
    addUserTreasure: async (req, res) => {
        const {treasureURL} = req.body
        const {id} = req.session.user
        const db = req.app.get('db')
        let userTreasure = await db.add_user_treasure(treasureURL, id)
        return res.status(200).send(userTreasure)
    },
    getAllTreasure: async (req,res) => {
        const db = req.app.get('db')
        let response = await db.get_all_treasure()
        return res.status(200).send(response)
    }
 }