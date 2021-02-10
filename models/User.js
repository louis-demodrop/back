const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    musics: Object
})

// password hash before user registration
userSchema.pre('save', async function (next) {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10)
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.password, salt)
    // Re-assign hashed version over original, plain text password
    this.password = passwordHash
    next()
  } catch (error) {
    next(error)
  }
})

// adding validation password method to user
userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
}

// generating user model
const User = mongoose.model('users', userSchema)

module.exports = User