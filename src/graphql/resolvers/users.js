import User from '../../models/user'
import Post from '../../models/posts'

export default {
  Query: {
    User: async (_, { _id }) => {
      const user = await User.findById(_id)
        .populate()
        .then(user => user)
        .catch(err => err)
      console.log(user)
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
