import {render, screen} from '@testing-library/react'
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import PostPreview, {getStaticProps} from '../../pages/posts/preview/[slug]'
import { getPrismicClient } from '../../services/prismic'




const post = {
    slug: 'my-new-post',
    title: 'My new Post',
    content: '<p>post excerpt</p>',
    updatedAt: '10 de abril',
  }

jest.mock('next-auth/client')
jest.mock('next/router')
jest.mock('../../services/prismic')


describe('Post preview Page',()=>{
  it('should render correctly',()=>{
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])

    render(<PostPreview post={post} />)

    expect(screen.getByText("My new Post")).toBeInTheDocument()
    expect(screen.getByText("post excerpt")).toBeInTheDocument()
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument()

  })
  
  it('should redirects user to full post when user is subscribed',async ()=>{
    const useSessionMocked = mocked(useSession)
    const useRouterMocked = mocked(useRouter)
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce([
      {activeSubscription:'fake-active-subscription'},
      false
    ]as any)

    useRouterMocked.mockReturnValueOnce({
      push:pushMock
    } as any)
 
    render(<PostPreview post={post} />)
    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')
  })

  it('should loads initial data', async ()=>{
    
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



    const response = await getStaticProps({
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