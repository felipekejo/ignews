import {render, screen} from '@testing-library/react'
import { mocked } from 'jest-mock'
import Home, { getStaticProps } from '../../pages'
import { stripe } from '../../services/stripe'

jest.mock('next-auth/client',()=>{
  return{
    useSession:()=>[null,false]
  }
})
jest.mock('next/router')
jest.mock('../../services/stripe')

describe('Home Page',()=>{
  it('should render correctly',()=>{



    render(<Home product={{priceId:'fake-price-id',amount:'R$10,00'}}/>)

    expect(screen.getByText("for R$10,00 monthly")).toBeInTheDocument
  })

  it('should loads initial data',async ()=>{
    const retrieveStripeMocked =mocked(stripe.prices.retrieve)
    retrieveStripeMocked.mockResolvedValueOnce({
      id:'fake-price-id',
      unit_amount:1000,
    }as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props:{
          product:{
            priceId:'fake-price-id',
            amount:'$10.00'
          }
        }
      })
    )
  })
})