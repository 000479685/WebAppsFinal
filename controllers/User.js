const UserModel = require('../models/user');


const RegisterUser = async (req, res) =>
{
    const userBody = req.body;
    
        if(!userBody.email || !userBody.password || !userBody.name)
        {
            return res.status(400).json({
                message:'Field missing'
            })
        }

    const userExists = await UserModel.findOne({
        email: userBody.email
    });

    if (userExists)
    {
        console.log(userExists, 'user found')
        return res.status(403).json({
            message: 'Email already in use'
        })
    }

    const newUser = new UserModel(
        {
            name:userBody.name,
            email:userBody.email,
            password:userBody.password
        });

    try
    {
        const savedUser = await newUser.save();
        return res.status(201).json({
            message: 'User registered successfully',
            data: savedUser
        })
    } catch(error)
    {
        return res.status(500).json({
            message:'Error',
            error
        })
    }
}

const GetUsers = async (req, res) =>
{
    try
    {
        const users = await UserModel.find();
        return res.status(200).json({
            message: 'User found',
            data: users
        })
    } catch(error)
    {
        return res.status(500).json({
            message : 'Error fetching users',
            data: users
        })
    }
}

const GetUserById = async (req, res) =>
{
    const query = req.body;
    try
    {
        const user = await UserModel.findById(req.email)
    } catch(error)
    {
        return res.status(500).json({
            message : 'Error finding user',
            data : user
        })
    }
}

module.exports = 
{
    RegisterUser,
    GetUsers,
    GetUserById
}