import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../../models/user'
import { loginValidator } from '../../utils/validation'

const createToken = payload => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: '90d'
  })

  return token
}
export default {
  Mutation: {
    Login: async (parent, { input }) => {
      const { email, password } = input
      const { error } = loginValidator(input)
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
      const token = createToken(user._id)
      return { user, token }
    }
  }
}
