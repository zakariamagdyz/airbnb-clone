import { render, screen } from '@testing-library/react'

import Home from './page'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home searchParams={{ category: '' }} />)

    expect(screen.getByRole('heading')).toHaveTextContent('Hello Aribnb')
  })
})
