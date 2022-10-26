const Blog = ({blog}) => {
  //styyle for blog

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  
return( 
<div style={blogStyle}>
    <div>{blog.title} {blog.author}</div>
    <div>{blog.url}</div>
    <div>{blog.likes} likes <button>like</button></div>
    
    
  </div>  
)
}

export default Blog