import React, { useRef, useState } from 'react'
import Togglable from './Togglable'
import blogsService from '../services/blogs'

const Blog = ({ blog }) => {
    const blogRef = useRef()
    const [likes, setLikes] = useState(blog.likes)

    const likeBlog = async (id) => {
        const response = await blogsService.patchBlog(id)
        console.log('liked blog:', response)
        setLikes(response.likes)
    }

    return (
        <div key={Math.random()}>
            {blog.title} {blog.author}
            <Togglable ref={blogRef} openButtonLabel='info' closeButtonLabel='hide'>
                <div>
                    <p>id: {blog.id}</p>
                    <p>url: {blog.url}</p>
                    <p style={{ display: 'inline-block', marginRight: '5px' }}>likes: {likes}</p><button id='likeButton' onClick={() => likeBlog(blog.id)}>like</button>
                </div>
            </Togglable>
        </div>
    )}

export default Blog