export const adminMiddleware = (req, res, next)=>{
    const user = { ...req.session.user }
    if (user.role == 'admin') {
        next()
    } else {
        return res.send('Unauthorized')
    }
}

export const userMiddleware = (req, res, next)=>{
    const user = { ...req.session.user }
    if (user.role == 'user') {
        next()
    } else {
        return res.send('Unauthorized')
    }
}