import {
    emailFilter,
    githubFilter
} from '../services/session.service.js'

export const logout = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log('Error destroying session:', error)
        } else {
        res.redirect('/api/session/login')
        }
    })
}

export const localSignup = (req, res) => { res.render('signup') }

export const localLogin = (req, res) => { res.render('login') }

export const githubSignup = (req, res) => {
    passport.authenticate('github', { scope: ['user: email']}),
    async (req, res) => {}
}

export const githubLogin = (req, res) => {
    passport.authenticate('github', {
        failureRedirect: '/api/error'
    }),
    (req, res) => {
        req.session.user = req.user
        res.redirect('/api/session/current')
    }
}