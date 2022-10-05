const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


//refactor using async/await
blogsRouter.get('/', async (request, response) => {
   
  const blogs = await Blog.find({})
  response.json(blogs)
  
  }
  )

blogsRouter.delete('/:id', async(request, response, next)=>{
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
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
      

    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)

  }
  
  )
  

  module.exports = blogsRouter