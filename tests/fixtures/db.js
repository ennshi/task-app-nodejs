const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const newUserId = new mongoose.Types.ObjectId();
const newUser = {
    _id: newUserId,
    name: "Jack",
    email: "jack@example.com",
    password: "1234567890",
    tokens: [{
        token: jwt.sign({_id: newUserId}, process.env.JWT_SECRET)
    }]
};

const new2UserId = new mongoose.Types.ObjectId();
const new2User = {
    _id: new2UserId,
    name: "Mike",
    email: "mike@example.com",
    password: "1234567890",
    tokens: [{
        token: jwt.sign({_id: new2UserId}, process.env.JWT_SECRET)
    }]
};

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "Do it",
    completed: false,
    owner: newUser._id
};

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "Do it again",
    completed: true,
    owner: newUser._id
};

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "Do it again and again",
    completed: true,
    owner: new2User._id
};

const setupDB = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(newUser).save();
    await new User(new2User).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
};

module.exports = {
    newUserId,
    newUser,
    setupDB,
    taskOne,
    new2User
};
