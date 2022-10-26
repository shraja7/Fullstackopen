import { useState } from "react" 

const BlogForm = ({ handleNewBlogSubmit}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setURL] = useState('')


const handleTitle = (e) => { 
    console.log(e.target.value)
  setTitle(e.target.value)
   }
  
   const handleAuthor = (e) => { 
    console.log(e.target.value)
  setAuthor(e.target.value)
   }
  
   const handleURL = (e) => { 
    console.log(e.target.value)
  setURL(e.target.value)
   }

   const addBlog = (e) => {
    e.preventDefault()
    handleNewBlogSubmit({
       title,
       author,
        url
    })
   
}

  return (
    <div>
        <h3>Create a new blog</h3>
    
    <form onSubmit={addBlog}>
    <div>
        title:
        <input type='text' onChange={handleTitle}/>
    </div>
    <div>
        author:
        <input type='text' onChange={handleAuthor}/>
    </div> <div>
        URL:
        <input type='text' onChange={handleURL}/>
    </div>

<button type='submit'>create</button>
    </form>

    </div>
  )
}

export default BlogForm