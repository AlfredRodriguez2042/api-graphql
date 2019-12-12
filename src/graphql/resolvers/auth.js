import bcrypt from 'bcrypt'
import User from '../../models/user'
import { validationLogin } from '../../utils/validation'
import { createToken } from '../../utils/utils'

export default {
  Mutation: {
    Login: async (parent, { input }, { request: { req, res } }) => {
      const { email, password } = input
      const { error } = validationLogin(input)
      if (error) {
        throw new Error(` ${error.message}`)
      }
      const user = await User.findOne({ email })

      if (!user) {
        throw new Error('Invalid email/password, try again')
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        throw new Error('Invalid email/password, try again')
      }
      const token = createToken(user._id, res)
      console.log('cookie', req.cookie)
      return { user, token }
    }
  }
}
