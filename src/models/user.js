import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, min: 4, max: 12 },
  photo: { type: String },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  privilege: { type: String, default: 'regular', enum: ['regular', 'admin'] },
  active: { type: Boolean, default: false },
  sign_up_date: { type: Date, default: Date.now() },
  last_login_date: { type: Date, default: Date.now() },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Posts' }]
})

module.exports = model('User', userSchema)
