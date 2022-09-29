const dummy = (blogs)=>{

    return 1
}

//return sum of likes in all of the blog posts
const totalLikes =(blogs)=>{
    
    const allLikes = blogs.reduce((acc, o) => acc+ o.likes, 0)

    return allLikes
    

}

//find which blog has most likes THEN return that blog object
const favoriteBlog = (blogs) => { 
 //find the most likes out of all the blogs
 let mostLikes = Math.max(...blogs.map(blog => blog.likes))
 //find which object in that array of blogs has likes = mostLikes
 let mostLikedBlog = blogs.find(blog => blog.likes === mostLikes)

 return mostLikedBlog
 }



module.exports ={
    dummy, totalLikes, favoriteBlog
}