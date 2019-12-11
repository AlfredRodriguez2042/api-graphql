import jwt from 'jsonwebtoken'

export const authenticated = req => {
  if (!req.isAuth) {
    throw new Error('fail, must be authenticated')
  }
}

export const AuthToken = req => {
  const IsAuth = req.headers.authorization
  if (!IsAuth) {
    throw new Error('You dont have authorization')
  }
  const token = IsAuth.split(' ')[1]
  if (!token) {
    throw new Error('Invalid/Expired token')
  }

  return jwt.verify(token, process.env.JWT_SECRET)
}
