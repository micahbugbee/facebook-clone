import { RequestHandler } from "express";
import { Post, IPost } from "../models/post";
import { IUser } from "../models/user";
import { verifyUser } from "../services/auth";

export const getAllPosts: RequestHandler = async (req, res, next) => {
    let postList = await Post.find();
    res.status(200).json(postList);
}

export const getAllUserPosts: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let userPostList = await Post.find({userId: user.id}).exec()
    res.status(200).json(userPostList);
}

export const getOnePost: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let itemId = req.params.id;
    let post = await Post.findById(itemId);
    res.status(200).json(post);
}

export const addPost: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }
         
        const newPost: IPost = new Post({

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
}

export const editPost: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let itemId = req.params.id;

    const updatedPost: IPost = new Post({
        _id: itemId,
        message: req.body.message,
        userId: req.body.userId,
        username: req.body.username,
        date: req.body.date
    });

    await Post.findByIdAndUpdate(itemId, { $set: updatedPost })

    res.status(200).json(updatedPost);
}

export const deletePost: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let itemId = req.params.id;
    let result = await Post.findByIdAndDelete(itemId);
    res.status(200).json(result);
}