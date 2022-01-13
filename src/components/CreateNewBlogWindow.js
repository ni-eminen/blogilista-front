import React, {useState} from 'react'
import blogService from '../services/blogs'

const CreateNewBlogWindow = ({addBlog}) => {
    const [title, setTitle] = useState()
    const [url, setUrl] = useState()
    const [author, setAuthor] = useState()
  
    const handleNewBlog = (e) => {
      e.preventDefault()
      let newBlog = {title: title, url: url, author: author}
      console.log('posting blog:', newBlog);
      blogService.postNewBlog(newBlog)
      setTitle('')
      setUrl('')
      setAuthor('')
      addBlog(newBlog)
    }
  
    return (
      <>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
      <div>
        <label>title:</label>
        <input type='text' value={title} onChange={({target}) => setTitle(target.value)}></input>
      </div>
      <div>
        <label>author:</label>
        <input type='text' value={author} onChange={({target}) => setAuthor(target.value)}></input>
      </div>
      <div>
        <label>url:</label>
        <input type='text' value={url} onChange={({target}) => setUrl(target.value)}></input>
      </div>
      <button type='submit'>submit</button>
    </form>
    </>
    )
  }

export default CreateNewBlogWindow