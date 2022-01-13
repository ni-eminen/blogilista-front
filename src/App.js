import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/user'


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

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  const addNewBlogLocal = (newBlog) => {
    let newBlogs = [...blogs, newBlog]
    setBlogs(newBlogs)
    setNotification({
      text: `${newBlog.title} added!`,
      style: 'green'
    })
    setTimeout(() => {
      setNotification(null)
    }, 3000);
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = {username, password}
    console.log('trying to log in', credentials);
    try {
      const user = await userService.signIn(credentials)
      console.log(user);
      setUser(user)
      setUsername('')
      setPassword('')

      window.localStorage.setItem(
        'user', JSON.stringify(user)
      )
      blogService.setToken(user.token)
    }
    catch (e) {
      setNotification({
        text: e.message,
        style: 'red'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000);
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
    blogService.setToken(null)
  }

  const Notification = () => {
    if (notification === null){
      return (<></>)
    }
    return (
      <div style={{backgroundColor: notification.style, color: "white"}}>
        <h2>
          {notification.text}
        </h2>
      </div>
    )
  }

  const LoginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          <label style={{display: "block"}}><b>Username</b></label>
          <input type="text" value={username} placeholder="Enter Username" name="uname" onChange={({target}) => setUsername(target.value)} required/>
          <label style={{display: "block"}}><b>Password</b></label>
          <input type="password" value={password} placeholder="Enter Password" name="psw" onChange={({target}) => setPassword(target.value)} required/>
          <button style={{display: "block"}} type='submit'>submit</button>
        </div>
    </form>
    )
  }

  const BlogsList = () => {
    console.log(blogs)
    return (
      <div>
        <h2>blogs</h2>
        {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
        }
      </div>
    )
  }

  const UserInfo = () => {
    return (
      <div>
        <p>logged in as {user.username}</p>
        <button onClick={handleLogout}>logout</button>
      </div>
    )
  }

  const LoggedInView = () => {
    return (
      <>
        <UserInfo></UserInfo>
        <BlogsList></BlogsList>
        <CreateNewBlogWindow addBlog={addNewBlogLocal}></CreateNewBlogWindow>
      </>
    )
  }



  useEffect(() => {
    console.log('use effect ran')
    let user = window.localStorage.getItem('user')
    console.log(user);
    user = JSON.parse(user)
    if (user) {
      setUser(user)
      blogService.setToken(user.token)
    }
    //Async stuff
    async function doStuff() {
      const blogs = await blogService.getAll()
      console.log(blogs);
      setBlogs(blogs)
    }
    doStuff()
  }, [])

  return (
    <div>
      <Notification></Notification>
      {
        user ? LoggedInView() : LoginForm()
      }
      {
        // user &&      
      }
    </div>
  )
}

export default App