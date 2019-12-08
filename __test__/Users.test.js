// import Posts from '../src/graphql/resolvers/posts'
import Axios from 'axios'

describe('#Query', () => {
  it('should have Posts method', async () => {
    const res = await Axios.post('http://localhost:3000/graphql', {
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
