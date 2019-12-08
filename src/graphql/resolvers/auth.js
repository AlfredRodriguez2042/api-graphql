import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../../models/user'

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
