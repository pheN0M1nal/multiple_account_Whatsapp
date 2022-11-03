const express = require('express')
const { colors } = require('colors')
const dotenv = require('dotenv')
const { morgan } = require('morgan')
const { errorHandler } = require('./middlewares/errorMiddleware.js')
const { initClient } = require('./whatsapp/index.js')

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

// initiating whatsapp client
const client = initClient()

// listening messaging
client.on('ready', () => {
	console.log('Client is ready ...')

	// getting messages
	app.post('/api/send-message', (req, res) => {
		const { number, message } = req.body

		if (!message || !number || message === '' || number === '') {
			res.json({
				messageSent: false,
				error: 'Please enter a message body and valid number',
			})
		} else {
			client.getContacts().then(chats => {
				// selecting number
				const selectedNum = chats.find(chat => chat.id.user === number)

				// checking if number exists?
				if (!selectedNum) {
					res.json({
						messageSent: false,
						error: "Given number don't exist on the chat list.",
					})
				} else {
					client
						.sendMessage(selectedNum.id._serialized, message)
						.then(function (resp) {
							res.json({ messageSent: true })
						})
						.catch(function (error) {
							res.json({ messageSent: false, error: error })
						})
				}
			})
		}
	})
})

// // error middleware
app.use(errorHandler)

// configuring port
const PORT = process.env.PORT || 6000

// listening
app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
	)
)
