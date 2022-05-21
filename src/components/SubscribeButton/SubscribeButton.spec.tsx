import {render, screen, fireEvent } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { signIn, useSession } from 'next-auth/client'
import {useRouter}  from 'next/router'
import { SubscribeButton } from '.'



jest.mock('next-auth/client')

jest.mock('next/router')

describe('SubscribeButton component',()=>{
  it('should render correctly',()=>{
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null,false])

    render(<SubscribeButton/>)
    
    expect(screen.getByText('Subscribe Now')).toBeInTheDocument()

  })

  it('should redirects user to sing in when not authenticated', ()=>{

    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null,false])

    const signInMocked = mocked(signIn)

    render(<SubscribeButton/>)

    const subscribedButton = screen.getByText('Subscribe Now')

    fireEvent.click(subscribedButton)

    expect(signInMocked).toHaveBeenCalled()
  })

  it('should redirect to posts when user has a subscription',()=>{
    
    const useRouterMocked = mocked(useRouter)
    const useSessionMocked = mocked(useSession)    

    

    useSessionMocked.mockReturnValueOnce([{
      user:{name:'John Doe', email:'john.doe@example.com'},
      expires:'fake-expires',
      activeSubscription:'fake-subscription'
    },false])
    

    const pushMock = jest.fn()

    useRouterMocked.mockReturnValueOnce({
      push:pushMock
    }as any)

    render(<SubscribeButton/>)

    const subscribedButton = screen.getByText('Subscribe Now')

    fireEvent.click(subscribedButton)

    expect(pushMock).toHaveBeenCalledWith('/posts')
  })

})

