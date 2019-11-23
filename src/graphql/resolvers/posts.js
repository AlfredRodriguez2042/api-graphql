
export default {
    Query: {
        Post: async (_,{_id},model)=>(
            await model.Post.findById(_id)
        ),  
        
        Posts:async (_, args, models )=>(
            await models.Post.find() 
        )
            
    },
    Mutation: {
        async createPost(_, { input:{title, slug, body, author, tags} }, models){
            
             const tag = await models.Tag.create(tags)
            const post = await models.Post.create({ title, slug, body, author, tags:tag})
            console.log(tag)
            return post
        },
        async deletePost(_, { _id }, models){
            const post = await models.Post.findByIdAndDelete(_id)
            return post

        }
    
    },
    Post: {
        author: async ({author}, args, ctx)=>(
            await ctx.User.findById(author)
        ),
        tags: async ({tags}, arg, ctx)=>(
            await ctx.Tag.findById(tags)
            //console.log(tags)
        ),
    }
}