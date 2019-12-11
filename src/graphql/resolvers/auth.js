import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../../models/user'
import { loginValidator } from '../../utils/validation'

const createToken = (payload, res) => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: '90d'
  })
  res.cookie('jwt', token, {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
  })
  return token
}

const authenticated = req => {
  if (req.isAuth) {
    throw new Error('fail')
  }
}
export default {
  Mutation: {
    Login: async (parent, { input }, { request: { res } }) => {
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
      const token = createToken(user._id, res)
      console.log(token)
      return { user, token }
    }
  }
}
