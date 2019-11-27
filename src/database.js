import mongoose from 'mongoose'

export async function Connect() {
  const url =
    process.env.NODE_ENV === 'test'
      ? 'mongodb://localhost:27017/graphqltest'
      : 'mongodb://localhost:27017/graphqlapi'
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log(url)
    console.log('Connected successfully to server')
  } catch (error) {
    console.log(error)
  }
}
