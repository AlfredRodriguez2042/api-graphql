export default {
    Query: {
        
        Users: async (_,args,ctx)=>{
            const post = await ctx.Post.find({})
            const user = await ctx.User.find({}).populate('posts').exec()
            console.log(user)
            return user
        },
        
    },
    Mutation: {
       async createUser(_, { input }, ctx) {
           
           const user = await ctx.User.create(input)
         return user
        },
        async deleteUser(_, {_id},ctx) {
            const user = await ctx.User.findByIdAndDelete(_id)
            return user
        },
        
    
    }
}