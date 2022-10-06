const bcrypt = require('bcrypt')

const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async(request, response)=>{
    const users = await User
    .find({})
    .populate('blogs', {url: 1, title: 1, author: 1, id: 1})

    // response.json(users.map(user => user.toJSON()))
    response.json(users)
})

usersRouter.post('/', async(request, response)=>{
    const {username, name, password} = request.body

    //verify that password is greater than 3 characters
    if(password.length < 3){
        return response.status(400).json({error: `User validation failed: Path password is shorter than minimum allowed length (3)`})

    }
    //verify if username is at least 3 characters long
    if(username.length < 3){
        return response.status(400).json({error: `User validation failed: Path username is shorter than minimum allowed length (3)`})
    }



    //TODO add verification if the user already exists
    const existingUser = await User.findOne({username})
    if(existingUser){
        return response.status(400).json({
            error: 'username must be unique'
        })
    }


    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save();

    response.status(201).json(savedUser)
})



module.exports = usersRouter