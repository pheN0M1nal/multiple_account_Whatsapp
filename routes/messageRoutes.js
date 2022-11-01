// import express from 'express'
const express = require('express')
const { sendMessage } = require('../controller/messageController.js')

// import { sendMessage } from '../controller/messageController.js'

// init router
const router = express.Router()

// // directing to controller
router.route('/').get(sendMessage)

exports.messageRoutes = router
