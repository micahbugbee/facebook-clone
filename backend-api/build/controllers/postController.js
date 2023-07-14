"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.editPost = exports.addPost = exports.getOnePost = exports.getAllUserPosts = exports.getAllPosts = void 0;
const post_1 = require("../models/post");
const auth_1 = require("../services/auth");
const getAllPosts = async (req, res, next) => {
    let postList = await post_1.Post.find();
    res.status(200).json(postList);
};
exports.getAllPosts = getAllPosts;
const getAllUserPosts = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let userPostList = await post_1.Post.find({ userId: user.id }).exec();
    res.status(200).json(userPostList);
};
exports.getAllUserPosts = getAllUserPosts;
const getOnePost = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let itemId = req.params.id;
    let post = await post_1.Post.findById(itemId);
    res.status(200).json(post);
};
exports.getOnePost = getOnePost;
const addPost = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    const newPost = new post_1.Post({
        message: req.body.message,
        userId: req.body.userId,
        username: req.body.username,
        date: req.body.date
    });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.addPost = addPost;
const editPost = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let itemId = req.params.id;
    const updatedPost = new post_1.Post({
        _id: itemId,
        message: req.body.message,
        userId: req.body.userId,
        username: req.body.username,
        date: req.body.date
    });
    await post_1.Post.findByIdAndUpdate(itemId, { $set: updatedPost });
    res.status(200).json(updatedPost);
};
exports.editPost = editPost;
const deletePost = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let itemId = req.params.id;
    let result = await post_1.Post.findByIdAndDelete(itemId);
    res.status(200).json(result);
};
exports.deletePost = deletePost;
