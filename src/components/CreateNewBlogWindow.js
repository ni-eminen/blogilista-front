import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const CreateNewBlogWindow = ({ addBlog }) => {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [author, setAuthor] = useState('')

    const handleNewBlog = async (e) => {
        e.preventDefault()
        let newBlog = { title: title, url: url, author: author }
        console.log('posting blog:', newBlog)
        const response = await blogService.postNewBlog(newBlog)
        setTitle('')
        setUrl('')
        setAuthor('')
        console.log('response from posting blog:', response)
        addBlog(response)
    }

    return (
        <>
            <h2>create new</h2>
            <form id='createNewBlogForm' onSubmit={handleNewBlog}>
                <div>
                    <label>title:</label>
                    <input id='blogTitleInput' type='text' value={title} onChange={({ target }) => setTitle(target.value)}></input>
                </div>
                <div>
                    <label>author:</label>
                    <input id='blogAuthorInput' type='text' value={author} onChange={({ target }) => setAuthor(target.value)}></input>
                </div>
                <div>
                    <label>url:</label>
                    <input id='blogUrlInput' type='text' value={url} onChange={({ target }) => setUrl(target.value)}></input>
                </div>
                <button type='submit'>submit</button>
            </form>
        </>
    )
}

CreateNewBlogWindow.propTypes = {
    addBlog: PropTypes.func.isRequired
}

export default CreateNewBlogWindow