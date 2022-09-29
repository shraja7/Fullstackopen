const dummy = (blogs)=>{

    return 1
}

//return sum of likes in all of the blog posts
const totalLikes =(blogs)=>{
    
    const allLikes = blogs.reduce((acc, o) => acc+ o.likes, 0)

    return allLikes
    

}


module.exports ={
    dummy, totalLikes
}