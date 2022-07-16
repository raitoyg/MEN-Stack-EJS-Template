import asyncHandler from 'express-async-handler';
import mongoose from "mongoose";

const apiDemo = asyncHandler(async (req, res) => {
    console.log('Test')
})

export {
    apiDemo
}