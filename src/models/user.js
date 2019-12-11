import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  name: { type: String, required: true },
  username: {
    type: String,
    required: true,
    validate: {
      // eslint-disable-next-line
      validator: username => User.doesntExist({ username }),
      message: ({ value }) => `UserName ${value} has already been taken.`
    },
    unique: [true, 'An account already exists with this username'],
    min: 4,
    max: 12
  },
  photo: { type: String },
  password: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: {
      // eslint-disable-next-line
      validator: email => User.doesntExist({ email }),
      message: ({ value }) => `Email ${value} has already been taken.`
    },
    unique: [true, 'An account already exists with this email']
  },
  privilege: { type: String, default: 'regular', enum: ['regular', 'admin'] },
  active: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  last_login_date: { type: Date, default: new Date() },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Posts' }]
})

async function passwordEncrypt(next) {
  try {
    this.password = await bcrypt.hash(this.password, 12)

    return next()
  } catch (error) {
    next(error)
  }
}
userSchema.pre('save', passwordEncrypt)

userSchema.statics.doesntExist = async function validate(op) {
  return (await this.where(op).countDocuments()) === 0
}

const User = model('User', userSchema)

module.exports = User
