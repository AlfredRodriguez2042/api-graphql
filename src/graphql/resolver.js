import User from '../models/user'
import Post from '../models/posts'
import Tag  from '../models/tag'


export const resolver = {
    Query: {
        hello:()=>'hello',
        Users: async (_,args,{models})=>{
            console.log(models.Post)
            const users = await User.find({
                include: [{
                    model: ctx.Post,
                    as: 'post',
                }]
            })
            return users
        },
        Posts:(_, args, ctx )=>{
            console.log(ctx.Tag)
            const post = Post.find({})
            
            return post
        }
    },
    Mutation: {
       async createUser(_, { input }) {
          const user =  new User( input )
          const newuser = await user.save()
          return newuser
        },
        async deleteUser(_, {_id}) {
            return await User.findByIdAndDelete(_id)

        },
        async createPost(_, { input }){
            const post = new Post( {...input,}, )
            const newpost = await post.save()
            console.log(newpost)
            return null
        },
        async deletePost(_, { _id }){
            return await Post.findByIdAndDelete(_id)

        }
    
    }
}