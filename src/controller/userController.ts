import { Request, Response } from 'express';
import { IUser } from '../interfaces/IUser';
const {User} = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getListUser = async (req: Request, res: Response) => {
    const userList = await User.find().select('name email phone');

    if(!userList) {
        res.status(500).json({success: false})
    }

    res.send(userList);
}

const getDetailUser = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found!'})
    }

    res.status(200).send(user);
}

const createUser = async (req: Request, res: Response) => {
    const {
        name,
        email,
        passwordHash,
        phone,
        isAdmin,
        street,
        apartment,
        zip,
        city,
        country
    } = req.body;

    let user = new User({
        name,
        email,
        passwordHash: bcrypt.hashSync(passwordHash, 10),
        phone,
        isAdmin,
        street,
        apartment,
        zip,
        city,
        country
    });
    user = await user.save();

    if(!user) {
        return res.status(400).send('User cannot be created')
    }

    res.send(user);
}

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    const secret = process.env.secret;

    if(!user) {
        return res.status(400).send('The user not found!')
    }

    if(user && bcrypt.compareSync(password, user.passwordHash)){
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {expiresIn: '1d'}
        )
        res.status(200).send({user: user.email, token: token})
    } else {
        res.status(400).send('Passowrd is wrong!')
    }

    return res.status(200).send(user)
}

export const getCountUsers = async (req: Request, res: Response) => {
    const userCount = await User.countDocuments();
    if(!userCount) {
        res.status(500).json({success: false})
    }

    res.send({
        userCount: userCount
    })
}

export const deleteUSer = (req: Request, res: Response) => {
    User.findByIdAndRemove(req.params.id).then((user: any) => {
        if(user) {
            return res.status(200).json({success: true, message: 'the user is delete successfully'})
        } else {
            return res.status(404).json({success: 'the user not found!'})
        }
    })
}

module.exports = {
    getListUser,
    createUser,
    getDetailUser,
    login,
    getCountUsers,
    deleteUSer
}