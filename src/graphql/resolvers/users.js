export default {
    Query: {
        User: async (_,{_id},ctx)=>{
            const user = await ctx.User.findById(_id).populate().then(user=>user).catch(err=>err)
            console.log(user)
            return user 

        },
        
        Users: async (_,args,ctx)=>{ 
        const id = await ctx.Post.findById()

            const user = await ctx.User.find({}).populate('posts').exec()
            console.log(user)
            return user
        },
        
    },
    Mutation: {
        createUser: async (_, { input }, ctx)=> {
           
           const user = await ctx.User.create(input)
         return user
        },
        deleteUser: async (_, {_id},ctx)=> {
            const user = await ctx.User.findByIdAndDelete(_id)
            return user
        },   
    
    },
    User:{
        posts: async ({_id},args,ctx)=>(
            await ctx.Post.find({author:_id})
        )
    }
}