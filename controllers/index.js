import asyncHandler from 'express-async-handler';
import mongoose from "mongoose";

const apiDemo = asyncHandler(async (req, res) => {
    try{
        const {str} = req.body
        console.log('Test');
        res.status(200).send(str);
    }catch (err) {
        if (err.name == "ValidationError") {
            let errors = {};

            Object.keys(err.errors).forEach((key) => {
                errors[key] = err.errors[key].message;
            });
            return res.status(400).send(errors);
        }
        console.log(err)
        res.status(500).send("Something went wrong");
    }
})

export {
    apiDemo
}