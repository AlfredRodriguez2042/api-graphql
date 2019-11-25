import mongoose from 'mongoose'

export async function Connect() {
  const url = 'mongodb://localhost:27017/graphqltest'

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    console.log('Connected successfully to server')
  } catch (error) {
    console.log(error)
  }
}
