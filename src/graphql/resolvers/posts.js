import Post from '../../models/posts'
import User from '../../models/user'
import Tag from '../../models/tag'
import { authenticated, checkAdmin } from '../../utils/auth'
import { validationPost } from '../../utils/validation'

const POST_ADDED = 'POST_ADDED'

export default {
  Query: {
    Post: async (_, { _id }) => {
      const post = await Post.findById(_id)
      const { error } = post
      console.log(error)
      if (!post) {
        throw new Error(` The Post ${_id} doesn't exist`)
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
      { pubsub }
    ) {
      // authenticated(req)
      const { error } = validationPost({ title, slug, body, author, tags })
      if (error) {
        throw new Error(`${error.message}`)
      }
      const tag = await Tag.create(tags)
      const post = await Post.create({
        title,
        slug,
        body,
        author,
        tags: tag
      })
      pubsub.publish(POST_ADDED, { newPost: post })
      return post
    },
    async deletePost(_, { _id }, { request: { req } }) {
      authenticated(req)
      const post = await Post.findOneAndDelete({ _id, author: req.user._id })
      if (!post) {
        throw new Error('Action not allowed')
      }
      return post
    },
    async deletePosts(_, { _id }, { request: { req } }) {
      authenticated(req)
      checkAdmin(req)
      const post = await Post.findByIdAndDelete(_id)
      return post
    }
  },
  Post: {
    author: async ({ author }) => {
      const postAuthor = await User.findById(author)
      return postAuthor
    }
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => {
        return pubsub.asyncIterator(POST_ADDED)
      }
    }
  }
}
