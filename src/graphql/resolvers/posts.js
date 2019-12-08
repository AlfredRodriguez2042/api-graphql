import Post from '../../models/posts'
import User from '../../models/user'
import Tag from '../../models/tag'

export default {
  Query: {
    Post: async (_, { _id }) => {
      const post = await Post.findById(_id)
      return post
    },

    Posts: async () => {
      const posts = await Post.find()
        .populate('tags')
        .exec()
      return posts
    }
  },
  Mutation: {
    async createPost(_, { input: { title, slug, body, author, tags } }) {
      const tag = await Tag.create(tags)
      const post = await Post.create({
        title,
        slug,
        body,
        author,
        tags: tag
      })
      console.log(tags)
      return post
    },
    async deletePost(_, { _id }) {
      const post = await Post.findByIdAndDelete(_id)
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
