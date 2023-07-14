"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controllers/postController");
const auth_1 = require("../services/auth");
const post_1 = require("../models/post");
const router = (0, express_1.Router)();
router.get('/', postController_1.getAllPosts);
router.get('/:id', postController_1.getOnePost, auth_1.verifyUser, (req, res) => {
    const userId = req.body.userId;
    res.json({ message: 'Protected route accessed!', userId });
});
router.get('/posts', postController_1.getAllUserPosts, auth_1.verifyUser, async (req, res) => {
    const userId = req.body.userId;
    const posts = await post_1.Post.find({ userId });
    res.json(posts);
});
router.post('/', postController_1.addPost, auth_1.verifyUser, (req, res) => {
    const userId = req.body.userId;
    res.json({ message: 'Protected route accessed!', userId });
});
router.put('/:id', postController_1.editPost, auth_1.verifyUser, (req, res) => {
    const userId = req.body.userId;
    res.json({ message: 'Protected route accessed!', userId });
});
router.delete('/:id', postController_1.deletePost, auth_1.verifyUser, (req, res) => {
    const userId = req.body.userId;
    res.json({ message: 'Protected route accessed!', userId });
});
exports.default = router;
