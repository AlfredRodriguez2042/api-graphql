// import Posts from '../src/graphql/resolvers/posts'
import Axios from 'axios'
import { apolloServer } from '../src/server'

apolloServer.listen(4000).then(({ url }) => {
  console.log(` >>> 🚀  Server ready at ${url}`)
})

describe('#Query', () => {
  it('should have Posts method', async () => {
    const res = await Axios.post('http://localhost:4000/graphql', {
      query: `
      {
        Posts{
          title
          slug
          body
        }
      }
      `
    })
    const { data } = res
    expect(data).toMatchObject({
      data: {
        Posts: []
      }
    })
  })
})
