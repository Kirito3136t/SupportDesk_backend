const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketsModel')
const Note = require ('../models/noteModel')


//@desc     Get Notes from Ticket
//@route    GET /api/tickets/ticketId/notes
//@access  Private
const getNotes=asyncHandler(async(req,res)=>{
    
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('No user found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if(ticket.user.toString() !== req.user.id){
        throw new Error('NotAuthorized')
        res.status(401)
    }

    const notes = await Note.find({ticket:req.params.ticketId})
    
    res.status(200).json(notes)
})

//@desc     Create Note 
//@route    POST /api/tickets/ticketId/notes
//@access  Private
const createNotes=asyncHandler(async(req,res)=>{
    
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('No user found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if(ticket.user.toString() !== req.user.id){
        throw new Error('NotAuthorized')
        res.status(401)
    }

    const notes = await Note.create({
        text:req.body.text,
        ticket:req.params.ticketId,
        isStaff:false,
        user:req.user.id
        
    })
    
    res.status(200).json(notes)
})

module.exports={
    getNotes,
    createNotes
}