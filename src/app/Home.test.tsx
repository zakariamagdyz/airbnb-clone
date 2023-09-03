import { render, screen } from '@testing-library/react'

import Home from './page'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    expect(screen.getByRole('heading')).toHaveTextContent('Hello Aribnb')
  })
})
