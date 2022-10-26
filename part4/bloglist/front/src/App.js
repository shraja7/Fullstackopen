import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
//useStates for BlogForm
// const [title, setTitle] = useState('')
// const [author, setAuthor] = useState('')
// const [url, setURL] = useState('')
//toggle visiblity of login form
//refrence to toggle visibility for create blog form
const blogFormRef = useRef()


    useEffect(() => {
  
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

useEffect(()=>{
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if(loggedUserJSON){
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user.token)
  }
},[])


  const handleLogin =async (e)=>{
    e.preventDefault()
    console.log('loggin in with ', username, password)

    try{
      const user = await loginService.login({
        username, password
      })

      //store token to local storage
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      

      console.log('user: ', user)
     
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception){
      notify('wrong username or password')
      console.log('exception: ', exception)
      
    }
  }

const handleUsername = (e) => { 
  setUsername(e.target.value)
  console.log(e.target.value)
 }

 const handlePassword = (e) => { 
  setPassword(e.target.value)
  console.log(e.target.value)
 }

 const handleLogout = () => { 
  setUser(null)
window.localStorage.removeItem('loggedBlogappUser')
  }
// 
// console.log('blogs: ', blogs)

//setting notification
const notify = (message, type)=>{
  setNotification(message, type)
  setTimeout(()=>{
    setNotification(null)
  }, 5000)
}

//--------------------------------------------

//handle BlogForms inputs -----------------------------
// const handleTitle = (e) => { 
//   console.log(e.target.value)
// setTitle(e.target.value)
//  }

//  const handleAuthor = (e) => { 
//   console.log(e.target.value)
// setAuthor(e.target.value)
//  }

//  const handleURL = (e) => { 
//   console.log(e.target.value)
// setURL(e.target.value)
//  }

 const handleNewBlogSubmit = (blogObject) => { 
  // e.preventDefault()
console.log('handle new blog submit button')
//send information to the backend to create a new blog
notify("a new blog was added")
//hide new blog form
console.log('blogObject: ', blogObject)
blogFormRef.current.toggleVisibility()
blogService.create(blogObject)
.then(returnedBlog => setBlogs(blogs.concat(returnedBlog)))


  }

//--------------------------------------------


//--------------------------------------------


  return (
    <div>
     <Notification notification={notification}/>
  
  {

user === null ?
<LoginForm handleLogin={handleLogin} handleUsername={handleUsername} handlePassword={handlePassword} /> 
:<div>
  {`${user.name} is logged in`}
  {/* <p>Users Token</p>
  {`USERS TOKEN: ${user.token} `} */}
  
  

  {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
  <button onClick={handleLogout}>Logout</button>

  <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
  <BlogForm 
  handleNewBlogSubmit={handleNewBlogSubmit}
/>
    </Togglable>

</div>
  }
   


     
    </div>
  )
}

export default App
