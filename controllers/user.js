import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import {User} from '../models/user.js'


// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
    const {fullName, dob, address, email, password} = req.body

    // Check if user exists
    const userExists = await User.findOne({email: email})

    if (userExists) {
        req.userExists = true;
        next()
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salt)
    // Create user
    let user
    try {
        user = await User.create({
            email: email,
            password: hashedpassword,
            fullName: fullName,
            dob: dob,
            address: address
        })
    } catch (error) {
        console.log(error)
    }

    if (user) {
        res.cookie('access_token', generateToken(user.id), { httpOnly: true })
    }

    next()
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body

    // Check for user email
    const user = await User.findOne({email: email})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.cookie('access_token', generateToken(user.id), { httpOnly: true })
        req.userExists = true
    } else {
        req.userExists = false
    }

    next()
})

// @desc    Terminate user session
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('access_token')
    res.redirect('/')
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    const usr = req.user
    if (usr) {
        return res.status(200).json(req.user)
    } else {
        return res.status(400).send('User not found')
    }

})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

export {
    registerUser,
    loginUser,
    logoutUser,
    getMe
}