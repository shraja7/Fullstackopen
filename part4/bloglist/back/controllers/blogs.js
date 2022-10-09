const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


//authorization 
//helper function isolates the token from the auth header
//the validity of the token is chekced w jwt.verify and decodes the token then returns the object which the token was based on
//if no token passed, error returns 'jwt mus be provided'

//The object decoded from the token contains the username and id fields, which tells the server who made the request. 
const getTokenFrom = request =>{
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substring(7)
  }
  return null
}


//refactor using async/await



blogsRouter.get('/', async (request, response) => {
   
  const blogs = await Blog.find({})
  .populate('user', {username: 1, name: 1, id: 1})
  
  response.json(blogs.map(blog => blog.toJSON()))
  
  })


  //4.21 refactor blog so that it can only be deleted by the user who created the blog
blogsRouter.delete('/:id', async(request, response, next)=>{
  // await Blog.findByIdAndRemove(request.params.id)
  // response.status(204).end()
  const userID = request.user.id
  const blog = await Blog.findById(request.params.id)
  if(blog.user.toString() === userID.toString()){
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end();
  }else{
    response.status(403)
    .json({error: "user has no permission to delete the blog"})
  }

})
  
//==================================================

//functionality to update a single blog post
blogsRouter.put('/:id', async(request, response, next)=>{
  const body = request.body

  const blog ={
    title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      
  }

  Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  .then(updatedBlog =>{
    response.json(updatedBlog)
  }).catch(error => next(error))
})



//======================================================


  blogsRouter.post('/', async (request, response) => {
    
 
    const body = request.body
    const user = request.user
    console.log('contents of body', body)

    // const token = getTokenFrom(request)
    // console.log('token: ', token)

    // const decodedToken = jwt.verify(token, process.env.SECRET)
    // console.log('decoded token: ', decodedToken)

    // if(!decodedToken.id){
    //   return response.status(401).json({ error: 'token missing or invalid'})
    // }

    // const user = await User.findById(decodedToken.id)



    //const user = await User.findById(body.userId)
    //console.log('user:', user)
    

    if(!body.likes){
      body.likes =0
    }
    if(!body.title){
      return response.status(400).json({
        error: 'title missing'
      })
    }
    if(!body.url){
      return response.status(400).json({
        error: 'url missing'
      })
    }

    const blog = new Blog({
  
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
     user: user._id
     
      

    })

    const savedBlog = await blog.save()
    //response.status(201).json(savedBlog)
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
  })
  

  module.exports = blogsRouter