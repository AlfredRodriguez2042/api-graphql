import jwt from 'jsonwebtoken'

export const createToken = (payload, res) => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: '90d'
  })
  res.cookie('jwt', token, {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
  })
  return token
}
export const catchAsync = fn => (parent, args, ctx, info) =>
  fn(parent, args, ctx, info).catch(e => {
    throw new Error(e.message)
  })
