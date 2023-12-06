import usersManager from '../dao/usersManager.js'

export const emailFilter = (email) => {
    const emailResponse = usersManager.findByEmail(email)
    return emailResponse
}

export const githubFilter = (email) => {
    const githubResponse = usersManager.findGithub(email)
    return githubResponse
}