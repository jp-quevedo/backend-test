export const adminMiddleware = (req, res, next)=>{
    const { role } = req.body
    if(role != 'admin'){
        return res.send('Unauthorized')
    }
    next()
}

export const userMiddleware = (req, res, next)=>{
    const { role } = req.body
    if(role != 'user'){
        return res.send('Unauthorized')
    }
    next()
}