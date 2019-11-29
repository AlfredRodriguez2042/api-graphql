import mongoose from 'mongoose'

export async function Connect() {
  const test = 'mongodb://localhost:27017/graphqltest'
  const dev = 'mongodb://localhost:27017/graphqlapi'
  try {
    if (process.env.NODE_ENV === 'test') {
      await mongoose.connect(test, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
    } else {
      await mongoose.connect(dev, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
    }
    console.log('Connected successfully to server')
  } catch (error) {
    console.log(error)
  }
}
