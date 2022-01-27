import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
    title: 'title',
    likes: 100,
    author: 'author name',
    url: 'url',
    id: 1
}

test('Additional info is not displayed upon render', () => {
    const component = render(
        <Blog blog={blog}></Blog>
    )

    const div = component.container.querySelector('.showWhenVisible')

    expect(div).toHaveStyle(
        'display: none'
    )
})

test('author and title is displayed upon render', () => {
    const component = render(
        <Blog blog={blog}></Blog>
    )

    expect(component.container).toHaveTextContent('title')
    expect(component.container).toHaveTextContent('author name')
})

test('additional info is displayed when "info" button is clicked', () => {
    const component = render(
        <Blog blog={blog}></Blog>
    )

    const button = component.container.querySelector('.openButton')
    const div = component.container.querySelector('.showWhenVisible')
    fireEvent.click(button)

    expect(div).not.toHaveStyle(
        'display: none'
    )
})

test('')