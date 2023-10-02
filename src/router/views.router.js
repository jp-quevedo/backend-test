import { Router } from 'express';
import { usersManager } from '../UserManager.js';

const router = Router()

router.get('/vista1',(req,res)=>{
    res.render('vista1')
})

router.get('/',(req,res)=>{
    res.render('signup')
})

router.get('/signupresponse/:userId',async(req,res)=>{
    const {userId} = req.params;
    const user = await usersManager.getUserById(+userId);
    res.render("signupresponse",{user});
})

router.get("/allusers", async (req, res) => {
    const users = await usersManager.getUsers({});
    res.render("allusers",{users});
})

export default router