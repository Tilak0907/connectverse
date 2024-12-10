const mongoose = require('mongoose');

// Employee Schema with Posts
const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
    posts: [{
        imageUrl: { type: String, required: true },
        likes: { type: Number, default: 0 },
        likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }], // Employee IDs who liked the post
        comments: [{ text: { type: String }, commenterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' } }]
    }]
});

const EmployeeModel = mongoose.model('Employee', EmployeeSchema);

module.exports = EmployeeModel;
