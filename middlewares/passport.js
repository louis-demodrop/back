const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')

const cookieExtractor = req => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies['access_token']
  }
  return token
}

// JWT strategy
passport.use(new JwtStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
  passReqToCallback: true
}, async (req, payload, done) => {
  try {
    // Find the user specified in token
    const user = await User.findById(payload.sub)

    // If user doesn't exists, handle it
    if (!user) {
      return done(null, false)
    }

    // Otherwise, return the user
    req.user = user
    done(null, user)
  } catch(error) {
    done(error, false)
  }
}))

// local strategy
passport.use(new LocalStrategy({
  usernameField: 'username'
}, async (username, password, done) => {
  try {
    // does user exist ?
    const user = await User.findOne({ "username": username })
    
    if (!user) {
      return done(null, false)
    }
  
    // is password correct ?
    const isValidPassword = await user.isValidPassword(password)
  
    if (!isValidPassword) {
      return done(null, false)
    }
  
    // return user
    done(null, user)
  } catch(error) {
    done(error, false)
  }
}))
