import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component', () => {
    let component

    const blog = {
        title: 'test',
        author: 'eray kaya',
        likes: 3,
        url: 'lol.com',
        user: {
            name: 'eray',
            username: 'elvaleryn'
        }
    }

    const user = {
        username: 'pumpkin'
    }

    beforeEach(() => {
        component = render(
            <Blog blog={blog} user={user} />
        )
    })

    test('By default only blog title and author are shown', () => {
        expect(component.container).toHaveTextContent('test')
        expect(component.container).toHaveTextContent('eray kaya')
        expect(component.container).not.toHaveTextContent('3')
        expect(component.container).not.toHaveTextContent('lol.com')
        expect(component.container).not.toHaveTextContent('eray')
    })

    test('when clicked show detailed information', () => {
        const div = component.container.querySelector('.blog')
        fireEvent.click(div)

        expect(component.container).toHaveTextContent('test')
        expect(component.container).toHaveTextContent('eray kaya')
        expect(component.container).toHaveTextContent('3')
        expect(component.container).toHaveTextContent('lol.com')
        expect(component.container).toHaveTextContent('eray')
    })
})