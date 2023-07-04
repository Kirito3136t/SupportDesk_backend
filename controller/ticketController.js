const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketsModel')


//@desc     Get user Tickets
//@route    GET /api/tickets
//@access  Private
const getTickets=asyncHandler(async(req,res)=>{
    //Get tickets from JWT
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('No user found')
    }

    const tickets = await Ticket.find({user:req.user.id})
    
    res.status(200).json(tickets)
})

//@desc     Get user single ticket
//@route    GET /api/tickets/:id 
//@access  Private
const getTicket=asyncHandler(async(req,res)=>{
    //Get tickets from JWT
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('No user found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(400)
        throw new Error('No tickets found')
    }

    if(ticket.user.toString() != req.user.id){
        res.status(401)
        throw new Error('Not authorized')
    }

    res.status(200).json(ticket)
    
})

//@desc    Create a new Ticket
//@route   POST /api/tickets/me 
//@access  Private
const createTickets=asyncHandler(async(req,res)=>{
    const {product,description} = req.body
    if(!product || !description){
        res.status(400)
        throw new Error ('Please add a product and description')
    }

    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error ('No user found')
    }

    const ticket = await Ticket.create({
        product,
        description,
        user:req.user.id,
        status:'new'
    })

    res.status(201).json(ticket)
})

//@desc     Delete ticket
//@route    DELETE /api/tickets/:id 
//@access  Private
const deleteTicket=asyncHandler(async(req,res)=>{
    //Get tickets from JWT
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('No user found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(400)
        throw new Error('No tickets found')
    }

    if(ticket.user.toString() != req.user.id){
        res.status(401)
        throw new Error('Not authorized')
    }

    await ticket.deleteOne()

    res.status(200).json({success:true})
    
})

//@desc     Update single ticket
//@route    UPDATE /api/tickets/:id 
//@access   Private

const updateTicket=asyncHandler(async(req,res)=>{
    //Get tickets from JWT
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('No user found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(400)
        throw new Error('No tickets found')
    }

    if(ticket.user.toString() != req.user.id){
        res.status(401)
        throw new Error('Not authorized')
    }

    const updateTicket = await Ticket.findByIdAndUpdate(req.params.id,req.body,{new:true})

    res.status(200).json(updateTicket)
    
})

module.exports={
    getTickets,
    createTickets,
    getTicket,
    deleteTicket,
    updateTicket
}