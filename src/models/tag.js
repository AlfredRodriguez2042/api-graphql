import { Schema, model} from 'mongoose'
import { ObjectID } from 'mongodb'

ObjectID.prototype.valueOf = function() {
    return this.toString()
  }


const tagsSchema = new Schema({
    name: { type: [String] }
})

export default model('Tags', tagsSchema)