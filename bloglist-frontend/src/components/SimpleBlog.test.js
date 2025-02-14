import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
    const blog = {
        title: 'test',
        author: 'eray kaya',
        likes: 3
    }

    const component = render(
        <SimpleBlog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'Testi-title'
    )

    expect(component.container).toHaveTextContent(
        'Perttu Punakallio'
    )

    expect(component.container).toHaveTextContent(
        'blog has 10 likes'
    )
})

test('clicking the button twice calls event handler twice', () => {
    const blog = {
        title: 'test',
        author: 'eray kaya',
        likes: 3,
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('like')

    for (let i = 0; i < 2; i++) {
        fireEvent.click(button)
    }

    expect(mockHandler.mock.calls.length).toBe(2)
})