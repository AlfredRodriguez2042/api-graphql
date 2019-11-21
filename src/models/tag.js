import { Schema, model} from 'mongoose'

const tagsSchema = new Schema({
    name: { type: [String], index: true }
})

export default model('Tags', tagsSchema)