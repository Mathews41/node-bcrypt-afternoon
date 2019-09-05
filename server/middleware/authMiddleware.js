module.exports = {
    usersOnly: (req,res,next) => {
        if(!req.session.user){
            return res.status(401).send('login you fool')
        }
        next()
    },
    adminsOnly: (req, res, next)=>{
        if(!req.session.user.isAdmin){
            return res.status(403).send('im the captain now')
        }
        next()
    }
}