const JWT = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const User = require('../models/User')

signToken = user => {
    return JWT.sign({
        iss: 'user',
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day
    }, JWT_SECRET)
}

module.exports = {
    register: async (req, res) => {
      const { username, password } = req.value.body

      // user exists ?
      const userFound = await User.findOne({ "username": { $exists: true, $eq: username }})
      if (userFound) { 
        return res.status(200).json({ error: 'Username is already in use.'})
      }
      
      // create user
      const newUser = new User({ 
        username,
        password
      })
  
      await newUser.save()
  
      // generate jsom web token
      const token = signToken(newUser)
      
      // send cookie with JWT
      res.cookie('access_token', token, {
        httpOnly: true
      })
      res.status(200).json({ result: { username } })
    },
    login: async (req, res) => {
      // Generate token
      const token = signToken(req.user)
      res.cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      })
      res.status(200).json({ success: true })
    },
    checkLoginStatus: (req, res) => {
      let payload = { isConnected: false }
      if (req.cookies['access_token']) {
        const token = req.cookies['access_token']
        const { sub } = JWT.verify(token, JWT_SECRET)
        payload = { isConnected: true, user: sub }
      }
      res.status(200).json({ ...payload })
    },
    logout: async (req, res) => {
      res.clearCookie('access_token')
      res.status(200).json({ success: true })
    }
}