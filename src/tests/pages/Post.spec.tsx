import {render, screen} from '@testing-library/react'
import { mocked } from 'jest-mock'
import { getSession } from 'next-auth/client'
import Post,{getServerSideProps} from '../../pages/posts/[slug]'
import { getPrismicClient } from '../../services/prismic'




const post ={
    slug: 'my-new-post',
    title: 'My new Post',
    content: '<p>post excerpt</p>',
    updatedAt: '10 de abril',
  }

jest.mock('next-auth/client')
jest.mock('../../services/prismic')


describe('Home Page',()=>{
  it('should render correctly',()=>{



    render(<Post post={post}/>)

    expect(screen.getByText("My new Post")).toBeInTheDocument()
    expect(screen.getByText("post excerpt")).toBeInTheDocument()

  })
  
  it('should redirects user if no subscription is found',async ()=>{
    const getSessionMocked = mocked(getSession)
   
    getSessionMocked.mockResolvedValueOnce(null)

    const response = await getServerSideProps({
      params:{
        slug:'my-new-post'
      }
    }as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/',
          
        })
      })
    )
  })

  it('should loads initial data', async ()=>{
    const getSessionMocked = mocked(getSession)
    const getPrismicMocked = mocked(getPrismicClient)

    getPrismicMocked.mockReturnValueOnce({
      getByUID:jest.fn().mockResolvedValueOnce({
        data:{
          title:[
            {type:'heading', text:'My new Post'}
          ],
          content:[
            {type:'paragraph', text:'post content'}
          ],
        },
        last_publication_date:'04-01-2022'
      })
    }as any)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription:'fake-active-subscription'
    }as any)

    const response = await getServerSideProps({
      params:{
        slug:'my-new-post'
      }
    }as any)

    expect(response).toEqual(
      expect.objectContaining({
        props:{
          post:{
            slug:'my-new-post',
            title:'My new Post',
            content: '<p>post content</p>',
            updatedAt:'01 de abril de 2022'
          }
        }
      })
    )
  })
  
})