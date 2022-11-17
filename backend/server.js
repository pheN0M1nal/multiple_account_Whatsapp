const express = require('express')
const http = require('http')
const { colors } = require('colors')
const dotenv = require('dotenv')
const { morgan } = require('morgan')
const { errorHandler } = require('./middlewares/errorMiddleware.js')
const { initClient } = require('./whatsapp/index.js')
const { Client, LocalAuth } = require('whatsapp-web.js')

// initializing express app
const app = express()

const server = http.createServer(app)

// configuring port
const PORT = process.env.PORT || 5000

// listening
server.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
	)
)

// making io connection
const io = require('socket.io')(server, { cors: { origin: '*' } })

// morgan
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// for accepting Body from Json
app.use(express.json())

// configuring
dotenv.config()

// initiating whatsapp client
const client = new Client({
	authStrategy: new LocalAuth({ clientId: 'client-one' }),
})

// initializing variables
var qrcode = 'empty'
var allChats = []
var loggedIn = false
var userMessages = []
var profilePics = []

// io connection
io.on('connection', socket => {
	//logout
	socket.on('logout', data => {
		console.log('logout'.red)
		client.logout()
		loggedIn = false
	})

	// connected user
	console.log(`Connected user: ${socket.id}`.green)

	//qr
	client.on('qr', qr => {
		qrcode = qr
		socket.emit('get_qr', { qr: qr })
		console.log('Qr asked'.blue)
	})

	// sending qr if already fetched
	socket.on('request_qr', () => {
		if (qrcode !== 'empty') {
			socket.emit('get_qr', { qr: qrcode })
		}
	})

	// client ready
	client.on('ready', () => {
		// ready msg
		console.log('Client is ready ...')

		// getting all chats
		client
			.getChats()
			.then(chats => {
				socket.emit('get_chats', chats)
				// profile pics
				chats.forEach(chat => {
					chat.getContact().then(contact => {
						contact.getProfilePicUrl().then(pic => {
							profilePics.push({ chatId: chat.id._serialized, picture: pic })
						})
					})
				})

				allChats = chats.slice()
			})
			.catch(err => {
				console.log(err)
			})

		// // fetching profile pictures
		// if (profilePics.length === 0) {
		// 	console.log('prof')
		// 	allChats.forEach(chat => {
		// 		chat.getContact().then(contact => {
		// 			contact.getProfilePicUrl().then(pic => {
		// 				profilePics.push({ chatId: chat.id._serialized, picture: pic })
		// 			})
		// 		})
		// 	})
		// }

		// sending user is logged in
		socket.emit('LoggedIn', { loggedIn: true })

		// maintaining user login
		loggedIn = true
	})

	socket.on('requestChat', () => {
		socket.emit('get_chats', allChats)
	})

	socket.on('requestPp', () => {
		socket.emit('profile_pics', profilePics)
	})
	socket.emit('get_chats', allChats)

	// sending login status
	if (loggedIn) {
		socket.emit('LoggedIn')
	}

	socket.emit('profile_pics', profilePics)

	// On message
	client.on('message', msg => {
		// selecting chat's msg
		const user = allChats.filter(
			user => user.id._serialized === msg._data.id.remote
		)[0]

		// updating user messages
		user.fetchMessages((limit = 100)).then(messages => {
			socket.emit('getMessages', messages)
		})
	})

	// on sending message
	socket.on('send_message', obj => {
		client.sendMessage(obj.chatId, obj.message).then(message => {
			// selecting user
			const user = allChats.filter(
				user => user.id._serialized === obj.chatId
			)[0]

			// updtaing user messages
			user.fetchMessages().then(messages => {
				socket.emit('getMessages', [...messages, message])
			})
		})
	})

	// fetching profile pictures
	if (profilePics === [] && allChats !== []) {
		allChats.forEach(chat => {
			chat.getContact().then(contact => {
				contact.getProfilePicUrl().then(pic => {
					profilePics.push({ chatId: chat.id._serialized, picture: pic })
				})
			})
		})
	}

	// profilePics already Exists
	if (profilePics !== []) {
		socket.emit('profile_pics', profilePics)
	}

	// fetching messages against userId
	socket.on('userIdForMessages', userId => {
		console.log(userId)
		if (userId && allChats) {
			const user = allChats.filter(user => user.id._serialized === userId)[0]
			user.fetchMessages((limit = 100)).then(messages => {
				//socket.emit('getMessages', messages)
			})
		}
	})

	// sending which socket is getting disconnected
	socket.on('disconnecting_', data => {
		console.log(`${data.componentName} is disconnecting.`.red)
	})

	// disconnecting
	socket.on('disconnect', () => {
		console.log(`${socket.id} is disconnected.`.red)
		socket.disconnect()
	})
})

// // error middleware
app.use(errorHandler)

// initializing client
client.initialize()
