const express = require('express')
const { colors } = require('colors')
const dotenv = require('dotenv')
const { morgan } = require('morgan')

const { messageRoutes } = require('./routes/messageRoutes.js')
const { errorHandler } = require('./middlewares/errorMiddleware.js')
const { initClient, sendMessageToNum } = require('./whatsapp/index.js')

// import express from 'express'
// import colors from 'colors'
// import dotenv from 'dotenv'
// import morgan from 'morgan'

// import messageRoutes from './routes/messageRoutes.js'
// import { errorHandler } from './middlewares/errorMiddleware.js'
//import { initClient, sendMessageToNum } from './whatsapp/index.js'

// initializing express app
const app = express()

// morgan
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// for accepting Body from Json
app.use(express.json())

// configuring
dotenv.config()

app.get('/', (req, res) => {
	res.send('he')
})

// apis
app.use('/api', messageRoutes)

// // error middleware
app.use(errorHandler)

// whatsapp
const client = initClient()
sendMessageToNum(client)

// configuring port
const PORT = process.env.PORT || 5000

// listening
app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
	)
)
