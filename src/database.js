import mongoose from 'mongoose'

export async function Connect() {
  const test = process.env.DBTEST
  const dev = process.env.DBDEV

  mongoose.Promise = global.Promise
  if (process.env.NODE_ENV === 'test') {
    mongoose.connect(test, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log('Connected successfully to server Test')
  } else {
    mongoose.connect(dev, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log('Connected successfully to server Dev')
  }
}
