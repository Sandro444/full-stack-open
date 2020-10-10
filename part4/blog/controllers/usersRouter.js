const usersRouter = require("express").Router();
const { request, response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt")

usersRouter.get("/", async (request, response) => {
    const allUser = await User.find({}).populate("blogs", {url:1, title: 1, author: 1})
    const filtered = [...allUser].map(user => {
        const newUser = { ...user._doc }
        delete newUser.password
        console.log(newUser)
        return newUser
    })
    response.json(filtered)
});

usersRouter.post("/", async (request, response) => {
    const singleUser = new User(request.body);
    const { password } = singleUser
    if (password.length <= 3) {
        response.status(400).json({ "error": "password length must be more than 3" })
        return
    } else if (singleUser.username.length <= 3) {
        response.status(400).json({ "error": "username length must be more than 3" })
        return
    } else{
        try { 
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(password, saltRounds)
            singleUser["password"] = passwordHash;
            const data = await singleUser.save()
            response.status(201).json(data);
        


    } catch (e) {
        if (e.name === 'ValidationError') {
            response.status(400).json({ "error": "username is not unique" }).end()
        }
    }
    }
    
})

usersRouter.put("/:id", async (request, response, next) => {
    const singleUser = request.body;

    const data = await User.findByIdAndUpdate(request.params.id, singleUser, { new: true })
    try {
        response.status(201).json(data)
    } catch (e) {
        console.log(e.name === 'ValidationError')
        response.status(400).end()
    }
});

usersRouter.delete("/:id", async (request, response, next) => {
    try {
        const data = await User.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (e) {
        next(e)
    }

})

module.exports = usersRouter