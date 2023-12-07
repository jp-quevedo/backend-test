import passport from 'passport'
import usersManager from './dao/managers/usersManager.js'
import { Strategy as localStrategy } from 'passport-local'
import { Strategy as githubStrategy } from 'passport-github2'
import { hashData, compareData } from './utils.js'

// LOCAL

passport.use('signup', new localStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        try {
            const userInDB = await usersManager.findByEmail(email)
            if (userInDB) {
                return done(null, false)
            }
            const hashedPassword = await hashData(password)
            const userCreated = await usersManager.createOne({
                ...req.body,
                password: hashedPassword,
                isAdmin: email == 'adminCoder@coder.com' ? true : false,
            })
            done(null, userCreated)
        } catch (error) {
            done(error)
        }
    }
))

passport.use('login', new localStrategy(
    {
    usernameField: 'loginEmail',
    passwordField: 'loginPassword'
    },
    async (loginEmail, loginPassword, done) => {
        try {
            const userInDB = await usersManager.findByEmail(loginEmail)
            if(!userInDB) {
                return done(null, true)
            }
            const comparePassword = await compareData(loginPassword, userInDB.password)
            if (!comparePassword) {
                return done(null, true)
            }
            done(null, userInDB)
        } catch (error) {
            done(error)
        }
    }
))

// GITHUB

passport.use('github', new githubStrategy(  
    {
        clientID: 'Iv1.e979cc04ca7e3dac',
        clientSecret: '74af7b2e55e2f1e30529accbadc066d252ba3a5e',
        callbackURL: 'http://localhost:8080/api/session/github',
        scope: ['user:email']
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile.emails[0].value)
        try {
            const userInDB = await usersManager.findGithub({ email: profile.emails[0].value })
            if (!userInDB) {
                const newUser = {
                    name: profile._json.name,
                    email: profile.emails[0].value,
                    password: '1234',
                    isFromGithub: true
                }
                const response = await usersManager.createOne(newUser)
                done(null, response)
            } else {
                if (userInDB.isFromGithub) {
                    return done(null, userInDB)
                } else {
                    return done(null, false)
                }
            }            
        } catch (error) {
            done(error)
        }
    }
))

// SERIALIZACION

passport.serializeUser(function (user, done) {
    done(null, user._id)
})

passport.deserializeUser(async function (id, done) {
    try {
        const user = await usersManager.findById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})
