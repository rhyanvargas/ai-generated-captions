// Example test from Next.js official documentation
// https://nextjs.org/docs/app/guides/testing/vitest

import { render, screen } from '@testing-library/react'
import Page from '../page'

describe('Home Page', () => {
  it('should render the heading', () => {
    render(<Page />)
    
    const heading = screen.getByRole('heading', { 
      level: 1, 
      name: /AI Video Caption Generator/i 
    })
    
    expect(heading).toBeDefined()
  })

  it('should render the description', () => {
    render(<Page />)
    
    const description = screen.getByText(/Simple, Open-Source Caption Generator/i)
    
    expect(description).toBeDefined()
  })
})
