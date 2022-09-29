const _ = require('lodash');

const dummy = (blogs)=>{

    return 1
}

//return sum of likes in all of the blog posts
const totalLikes =(blogs)=>{
    
    const allLikes = blogs.reduce((acc, o) => acc+ o.likes, 0)

    return allLikes
    

}

//return the blog with the highest number of likes
const favoriteBlog =(blogs)=>{
let res = Math.max.apply(Math, blogs.map(blog =>{
    return blog.likes
}))
const obj = blogs.find(o =>{
    return o.likes == res
})

return obj
}

//return an object of the author and how many blogs they have
const authorAndBlogs =(blogs)=>{
    const mostBlogs = _.flow(
        blogs => _.countBy(blogs, 'author'), // count by the author
        _.toPairs, // convert to array of [key, value] pairs
        blogs => _.maxBy(blogs, _.last), // get the entry with most blogs
        blog => _.zipObject(['author', 'blogs'], blog) // convert to an object
      )

      return mostBlogs(blogs)
}

const mostLikes =(blogs)=>{
    const mostLikes = _.flow(
        blogs => _.countBy(blogs, 'author'), // count by the author
        _.toPairs, // convert to array of [key, value] pairs
        blogs => _.maxBy(blogs, _.last), // get the entry with most blogs
        blog => _.zipObject(['author', 'likes'], blog) // convert to an object
      )

      return mostLikes(blogs)
}


module.exports ={
    dummy, totalLikes, favoriteBlog, authorAndBlogs, mostLikes
}