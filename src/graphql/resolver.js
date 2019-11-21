import User from '../models/user'


export const resolver = {
    Query: {
        hello:()=>'hello',
        Users: async ()=>{
            const users = await User.find({})
            return users
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

        }
    
    }
}