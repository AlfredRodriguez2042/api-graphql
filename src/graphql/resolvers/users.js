import User from '../../models/user'
import Post from '../../models/posts'
import { validation } from '../../utils/validation'

export default {
  Query: {
    User: async (_, { _id }) => {
      const user = await User.findById(_id)
        .populate()
        .then(user => user)
        .catch(err => err)
      if (!user) {
        throw new Error(` The User ${_id} doesn´t exist`)
      }
      return user
    },

    Users: async () => {
      const user = await User.find()
        .populate('posts')
        .populate('tags')
        .exec()
      console.log(user)
      return user
    }
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const { error } = validation(input)
      if (error) {
        throw new Error(`${error.message}`)
      }
      const user = await User.create(input)
      return user
    },
    deleteUser: async (_, { _id }) => {
      const user = await User.findByIdAndDelete(_id)
      return user
    }
  },
  User: {
    posts: async ({ _id }) => {
      const auth = await Post.find({ author: _id })
      return auth
    }
  }
}
