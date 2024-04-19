const TrackerModel = require('../models/tracker');
const JsonWebToken = require('jsonwebtoken');
const UserModel = require('../models/user')

const CreateEntry = async (req, res) =>
{
    const allHeaders = req.headers;

    if(!allHeaders.authorization)
    {
        return res.status(401).json({
            message: 'authorization token missing'
        })
    }

    const token = allHeaders.authorization;

    const decodedToken = JsonWebToken.decode(token, {
        complete: true
    });

    const userId = decodedToken.payload.id;

    const userExists = await UserModel.findById(userId);
    if(!userExists)
    {
        return res.status(401).json({
            message: 'Unathorized user'
        })
    }

    const entryBody = req.body;

    const newEntry = TrackerModel(
        {
            title: entryBody.title,
            expense: entryBody.expense,
            date: entryBody.date,
            reason: entryBody.reason,
            user: userId
        }
    )

    const savedEntry = await newEntry.save();
    return res.status(201).json({
        message: 'Entry created successfully',
        data: savedEntry
    })
}


const GetAllEntries = async (req, res) =>
{
    try
    {
        const entries = await TrackerModel.find();
        return res.status(200).json({
            message: 'Successfully found all entries',
            data: entries
        })
    } catch (error)
    {
        return res.status(500).json({
            message: `Error : ${error}`,
            error
        })
    }
}


const DeleteEntry = async(req, res) =>
{
    const allHeaders = req.headers;
    const entryBody = req.body;

    const token = allHeaders.authorization;

    const decodedToken = JsonWebToken.decode(token, {
        complete: true
    });

    const userId = decodedToken.payload.id;

    const targetEntry = await TrackerModel.findOne({    
        title: entryBody.title,
        user: userId    
    })

    if(!targetEntry)
    {
        return res.status(401).json({
            message: 'Entry does not exist'
        })
    }

    try
    {
        const result = await TrackerModel.deleteOne({
            title: entryBody.title,
            user: userId    
        })    
        return res.status(200).json({
            message: 'Successfully deleted entry',            
        })
    }catch(error)
    {
        return res.status(500).json({
            message:`Error : ${error}`,
            error
        })
    }
}

module.exports = 
{
    CreateEntry,
    GetAllEntries,
    DeleteEntry
}