import { useState, useEffect } from "react";
import React from 'react';
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notifications from "./components/Notifications"
import { useField } from './hooks/usefield'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [newTitle, setNewTitle] = useState("")
  // const [newAuthor, setNewAuthor] = useState("")
  // const [newUrl, setNewUrl] = useState("")
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loginVisible, setLoginVisible] = useState(false)
  const username = useField('text')
  const password = useField('password')
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort(function (a, b) { return b.likes - a.likes }))
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },
    [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value, password: password.value
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
      setSuccessMessage('Logged In')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort(function (a, b) { return b.likes - a.likes }))
    }
    catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    blogService.setToken(null)
    setSuccessMessage("Logged Out")
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
    blogService.setToken(null)
  }

  const blogFormRef = React.createRef()
  const addBlog = async (event) => {
    try {
      event.preventDefault()
      const blogObject = {
        title: newTitle.value,
        author: newAuthor.value,
        url: newUrl.value,
      }
      await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort(function (a, b) { return b.likes - a.likes }))
      newTitle.reset()
      newAuthor.reset()
      newUrl.reset()
      setSuccessMessage("Blog Created")
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleRemoveClick = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort(function (a, b) { return b.likes - a.likes }))
      setErrorMessage("Blog has been removed")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const blogForm = () => (
    <div>
      <h2>Create New</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          addBlog={addBlog}
          newTitle={newTitle}
          newAuthor={newAuthor}
          newUrl={newUrl}
        />
      </Togglable>
    </div>
  )

  return (
    <div>
      <h1>blogs</h1>
      <Notifications
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in <button onClick={() => handleLogout()}>Log Out</button></p>
          {blogForm()}
          <h2>Blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleRemoveClick={handleRemoveClick} user={user} />
          )}
        </div>
      }
      {/* <Togglable buttonLabel="new blog">
        <BlogForm
          onSubmit={addBlog}
          handleTitleChange={handleTitleChange}
          handleAuthorChange={handleAuthorChange}
          handleUrlChange={handleUrlChange}
          newTitle={newTitle}
          newAuthor={newAuthor}
          newUrl={newUrl}
        />
      </Togglable> */}
    </div>
  )
}

export default App;
