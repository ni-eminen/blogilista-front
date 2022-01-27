import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import { render, fireEvent } from '@testing-library/react'
import CreateNewBlogWindow from './CreateNewBlogWindow'

test('callback function is called with the appropriate attributes', () => {
    const createBlog = jest.fn()

    const component = render(
        <CreateNewBlogWindow addBlog={createBlog}></CreateNewBlogWindow>
    )

    const form = component.container.querySelector('form')

    fireEvent.submit(form)
    expect(createBlog.mock.calls).toHaveLength(1)
    console.log('-------------------------------------------------',createBlog.mock.calls[0][0])
    expect(createBlog.mock.calls[0][0]).toEqual({ title: '', url: '', author: '' })
})