import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

import UserModel from "../models/users.js"

export const signUp = async (req, res) => {
    const {email, password, firstName, lastName, username} = req.body;
    try {
        const oldUser = await UserModel.findOne({email});

        if(oldUser) return res.status(400).json({message: 'Email already in use'});

        const oldNickName = await UserModel.findOne({username});

        if(oldNickName) return res.status(400).json({message: "Username alredy in use"})
        
        const haspassword = await bcrypt.hash(password, 12);

        const user = await UserModel.create({email, password: haspassword, name: `${firstName} ${lastName}`, username})

        res.status(201).json({user, message: "User created"});

    } catch (error) {
        res.status(500).json({error})
    }
}

export const signIn = async (req, res) => {

    const {email, password} = req.body;

    try {
        const oldUser = await UserModel.findOne({email})

        if(!oldUser) return res.status(404).json({messagge: "Email doesn't exist"});

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

        const token = jwt.sign({email: oldUser.email, id: oldUser._id, name: oldUser.name, username: oldUser.username}, process.env.SECRET_WORD, {expiresIn: "1h"})

        res.status(201).json({
            result: {
                name: oldUser.name,
                email: oldUser.password,
                username: oldUser.username
            },
            token
        })

    } catch (error) {
        console.log(error)
    }
}