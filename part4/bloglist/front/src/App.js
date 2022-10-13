import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


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
      console.log(exception)
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
console.log('blogs: ', blogs)


  return (
    <div>
     
  
  {
user === null ?
<LoginForm handleLogin={handleLogin} handleUsername={handleUsername} handlePassword={handlePassword} /> 
:<div>
  {`${user.name} is logged in`}
  <p>Users Token</p>
  {`USERS TOKEN: ${user.token} `}
  

  {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
  <button onClick={handleLogout}>Logout</button>

</div>
  }
   


     
    </div>
  )
}

export default App
