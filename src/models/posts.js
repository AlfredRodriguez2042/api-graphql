import { Schema, model } from 'mongoose'

const postSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  readingTime: { type: String, default: '3 min' },
  body: { type: String },
  lenguage: { type: String, default: 'es', enum: ['es', 'en'] },
  image: { type: String },
  published: { type: Boolean, default: false },
  createdAt: { type: String, default: new Date() },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tags' }]
})

export default model('Posts', postSchema)
