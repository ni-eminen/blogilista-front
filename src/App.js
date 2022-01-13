import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/user'
import CreateNewBlogWindow from './components/CreateNewBlogWindow'
import Togglable from './components/Togglable'
import userEvent from '@testing-library/user-event'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  
  const sortBlogs = () => {
  let sortedBlogs = [...blogs]
  sortedBlogs.sort((a, b) => {
    return b.likes < a.likes ?  -1
         : b.likes > a.likes ? 1
         : 0; 
  });
  setBlogs(sortedBlogs)
  console.log('sorted blogs', sortedBlogs)
  }

  const addNewBlogLocal = (newBlog) => {
    blogFormRef.current.toggleVisibility()
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

  const updateBlog = (idx, field, value) => {
    const newBlog = [...blogs]
    newBlog[idx][field] = value
    setBlogs(newBlog)
  }

  const BlogsList = () => {
    console.log(blogs)
    return (
      <div>
        <h2>blogs</h2>
        {
        blogs.map((blog, idx) =>
          <div key={Math.random()} style={{outline: "1px dashed black", margin: '4px'}}>
            <Blog updateBlog={(field, value) => {
              updateBlog(idx, field, value)
            }} key={blog.id} blog={blog} ></Blog>
          </div>
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
        <Togglable ref={blogFormRef} closeButtonLabel='cancel' openButtonLabel='add new blog'>
         <CreateNewBlogWindow addBlog={addNewBlogLocal}></CreateNewBlogWindow>
        </Togglable>
        <BlogsList/>    
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
      sortBlogs()
    }
    doStuff()
  }, [])

  return (
    <div>
      <Notification></Notification>
      {
        user ? LoggedInView() : LoginForm()
      }
    </div>
  )
}

export default App