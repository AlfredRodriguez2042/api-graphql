export default {
  Query: {
    Post: async (_, { _id }, model) => {
      const post = await model.Post.findById(_id)
      return post
    },

    Posts: async (_, args, models) => {
      const posts = await models.Post.find()
        .populate('tags')
        .exec()
      return posts
    }
  },
  Mutation: {
    async createPost(
      _,
      { input: { title, slug, body, author, tags } },
      models
    ) {
      const tag = await models.Tag.create(tags)
      const post = await models.Post.create({
        title,
        slug,
        body,
        author,
        tags: tag
      })
      console.log(tags)
      return post
    },
    async deletePost(_, { _id }, models) {
      const post = await models.Post.findByIdAndDelete(_id)
      return post
    }
  },
  Post: {
    author: async ({ author }, args, ctx) => {
      const auth = await ctx.User.findById(author)
      return auth
    }
  }
}
