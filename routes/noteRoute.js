const express = require ('express')
const router = express.Router({mergeParams:true})
const {protect} = require ('../middleware/authMiddleware')
const {getNotes,createNotes} = require ('../controller/noteController')

router.route('/').get(protect,getNotes).post(protect,createNotes)

module.exports= router

