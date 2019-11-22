
export default {
    Query: {
        
        Posts:async (_, args, models )=>{
            console.log(models.Post)
            const post = await models.Post.find().populate('author').exec()
            
            return post
        }
    },
    Mutation: {
        async createPost(_, { input:{title, slug, body, author, tags} }, models){
            
        
           // const tag = await models.Tag.create(tags)
            console.log(tags)
            const post = await models.Post.create({ title, slug, body, author, tags})
            console.log(post)
            
         
            return post
        },
        async deletePost(_, { _id }, models){
            const post = await models.Post.findByIdAndDelete(_id)
            return post

        }
    
    }
}