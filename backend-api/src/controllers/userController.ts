import { RequestHandler } from "express";
import { User, IUser } from "../models/user";
import { comparePasswords, hashPassword, signUserToken, verifyUser } from "../services/auth";

export const createUser: RequestHandler = async (req, res, next) => {
    const newUser: IUser = new User({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        city: req.body.city,
        state: req.body.state
    });

    try {
        if (newUser.username && newUser.password) {
            let hashedPassword = await hashPassword(newUser.password);
            newUser.password = hashedPassword;
            let created = await newUser.save();
            res.status(201).json({
                username: created.username,
                userId: created._id
            });
        }
        else {
            res.status(400).send('Username and password required');
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
}

export const loginUser: RequestHandler = async (req, res, next) => {
    // Look up user by their username
    let existingUser: IUser | null = await User.findOne(
        { username: req.body.username }
    );
    
    // If user exists, check that password matches
    if (existingUser) {
        let passwordsMatch = await comparePasswords(req.body.password, existingUser.password);
        
        // If password matches, creating JWT
        if (passwordsMatch) {
            let token = await signUserToken(existingUser);
            res.status(200).json({ token, existingUser });
        }
        else {
            res.status(401).json('Invalid password');
        }
    }
    else {
        res.status(401).json('Invalid username');
    }
}

export const getUser: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);
    let reqId = req.params.id

    if (user && user._id == reqId) {
        let { _id, username, firstname, lastname, age, city, state } = user;
        res.status(200).json({
            _id,
            username,
            firstname,
            lastname,
            age,
            city,
            state
        });
    }
    else {
        res.status(401).send();
    }
}

export const getAllUsers: RequestHandler = async (req, res, next) => {
    let userList = await User.find();
    res.status(200).json(userList);
}