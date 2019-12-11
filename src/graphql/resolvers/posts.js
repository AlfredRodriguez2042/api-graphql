import Post from '../../models/posts'
import User from '../../models/user'
import Tag from '../../models/tag'
import { AuthToken, authenticated } from '../../utils/auth'

export default {
  Query: {
    Post: async (_, { _id }) => {
      const post = await Post.findById(_id)
      if (!post) {
        throw new Error(` The Post ${_id} doesn´t exist`)
      }
      return post
    },

    Posts: async () => {
      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate('tags')
        .exec()
      return posts
    }
  },
  Mutation: {
    async createPost(
      _,
      { input: { title, slug, body, author, tags } },
      { request: { req } }
    ) {
      const un = authenticated(req)
      console.log(req)
      console.log(un)
      const tag = await Tag.create(tags)
      const post = await Post.create({
        title,
        slug,
        body,
        author,
        tags: tag
      })
      return post
    },
    async deletePost(_, { _id }, { request: { req } }) {
      authenticated(req)
      const post = await Post.findOneAndDelete({ _id, author: req.user._id })
      if (!post) {
        throw new Error('Action not allowed')
      }
      return post
    }
  },
  Post: {
    author: async ({ author }) => {
      const postAuthor = await User.findById(author)
      return postAuthor
    }
  }
}
