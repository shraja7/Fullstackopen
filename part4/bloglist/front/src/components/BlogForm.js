import React from 'react'

const createBlogForm = ({handleTitle, handleAuthor, handleURL, handleNewBlogSubmit}) => {


  return (
    <div>
        <h3>Create a new blog</h3>
    
    <form onSubmit={handleNewBlogSubmit}>
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

export default createBlogForm