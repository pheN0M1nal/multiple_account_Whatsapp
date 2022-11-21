const express = require('express')
const http = require('http')
const { colors } = require('colors')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
const { morgan } = require('morgan')
const { errorHandler } = require('./middlewares/errorMiddleware.js')
const { initClient } = require('./whatsapp/index.js')
const { Client, LocalAuth } = require('whatsapp-web.js')
const { emit } = require('process')
const { resolve } = require('path')

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

// error middleware
app.use(errorHandler)

try {
	// initiating whatsapp client
	const client = new Client({
		authStrategy: new LocalAuth({ clientId: 'client-one' }),
	})

	/* ---------- INITIALIZING VARIABLES ---------- */
	var qrcode = 'empty'
	var allChats = []
	var loggedIn = false
	var userMessages = []
	var profilePics = []
	var selectedChat = ''
	var lastMessages = []
	var allContacts = []
	var clientIsReady = false

	/* ---------- MAKING CONNECTION & SOCKET ---------- */
	io.on('connection', socket => {
		/* ---------- CONNECTED USER ---------- */
		console.log(`Connected user: ${socket.id}`.green)

		/* ---------- SENDING INITIAL QR ---------- */
		client.on('qr', qr => {
			qrcode = qr
			socket.emit('get_qr', { qr: qr })
			console.log('Qr asked'.blue)
		})

		/* ---------- SENDING EXISTING QR ---------- */
		socket.on('request_qr', () => {
			if (qrcode !== 'empty') {
				socket.emit('get_qr', { qr: qrcode })
			}
		})

		/* ---------- WHEN CLIENT IS READY ---------- */
		client.on('ready', () => {
			console.log('Client is ready ...')
			clientIsReady = true
			socket.emit('clientIsReady')
			/* ---------- GETTING CONTACT ---------- */
			client.getContacts().then(contacts => {
				allContacts = contacts.slice()
			})

			/* ---------- GETTING CHATS AND PROFILE PICTURES ---------- */
			client
				.getChats()
				.then(chats => {
					// sending a new promise for chats
					return new Promise((resolve, reject) => {
						resolve({ chats: chats })
					})
				})
				.then(data => {
					return new Promise((resolve, reject) => {
						Promise.all(
							allContacts.map(contact => contact.getProfilePicUrl())
						).then(res => {
							const contacts = allContacts.map((contact, index) => {
								return { ...contact, pic: res[index] }
							})
							resolve({ ...data, contacts: contacts })
						})
					})
				})
				.then(data => {
					return new Promise((resolve, reject) => {
						/* ---------- SAVING LAST MESSAGES OF ALL CHATS ---------- */
						data.chats.forEach(chat => {
							chat.fetchMessages((limit = 1)).then(msg => {
								lastMessages.push({
									chatId: chat.id_serialized,
									message: msg,
								})
							})
						})

						resolve({ ...data, lastestMsg: lastMessages })
					})
				})
				.then(data => {
					// console.log('chats', data.chats[0])
					// console.log('p', data.profPics[0])
					// console.log('chats', data.lastestMsg[0])
					// saving data
					allChats = data.chats.slice()
					allContacts = data.contacts.slice()
					lastMessages = data.lastestMsg.slice()

					//sending conatcts
					socket.emit('contacts', allContacts)

					//sending chats
					socket.emit('get_chats', allChats)

					//sending chats
					socket.emit('lastMessages', lastMessages)

					// sending user is logged in
					socket.emit('LoggedIn')

					// maintaining user login
					loggedIn = true
				})
				.catch(err => {
					console.log(err)
				})
		})

		/////////////////////////////////////////////////////////

		/* ---------- SENDING LAST MESSAGES IF REQUESTED ---------- */
		socket.on('requestLastMessage', () => {
			loggedIn && socket.emit('lastMessages', lastMessages)
		})

		/* ---------- SENDING CHATS IF REQUESTED ---------- */
		socket.on('requestChat', () => {
			client.getChats().then(chats => {
				socket.emit('get_chats', chats)
			})
		})

		/* ---------- SENDING PROFILE PICS IF REQUESTED ---------- */
		socket.on('requestPp', () => {
			loggedIn && socket.emit('profile_pics', profilePics)
		})

		/* ---------- SENDING CHATS ??? ---------- */
		loggedIn && socket.emit('contacts', allContacts)
		loggedIn && socket.emit('get_chats', allChats)

		loggedIn && socket.emit('lastMessages', lastMessages)

		/* ---------- SENDING LOGIN STATUS ---------- */
		if (loggedIn) {
			socket.emit('LoggedIn')
		}
		if (clientIsReady) {
			socket.emit('clientIsReady')
		}

		/* ---------- SENDING MESSAGE ACKNOLEDGMENT ---------- */
		client.on('message_ack', (message, ack) => {
			// sending recieved message
			if (selectedChat === message.id.remote) {
				socket.emit('ackMsg', message)
			}
		})

		/* ---------- WHEN RECIEVED MESSAGE ---------- */
		client.on('message', msg => {
			// selecting chat's msg
			const user = allChats.filter(
				user => user.id._serialized === msg._data.id.remote
			)[0]

			// updating user messages
			user.fetchMessages((limit = 100)).then(messages => {
				socket.emit('getMessages', messages)
			})

			// // sending updated chats 1
			// client.getChats().then(chats => {
			// 	socket.emit('get_chats', chats)
			// })
		})

		/* ---------- WHEN NEW MESSAGE IS SEND ---------- */
		// client.on('message_create', message => {
		// 	client.getChats().then(chats => {
		// 		socket.emit('get_chats', chats)
		// 	})
		// })

		/* ---------- WHEN SENDING MESSAGE ---------- */
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

			// // sending updated chats
			// client.getChats().then(chats => {
			// 	socket.emit('get_chats', chats)
			// })
		})

		// /* ---------- FETCHING PROFILE PICTURES ---------- */
		// if (profilePics === [] && allChats !== []) {
		// 	allChats.forEach(chat => {
		// 		chat.getContact().then(contact => {
		// 			contact.getProfilePicUrl().then(pic => {
		// 				// saving pictures
		// 				profilePics.push({ chatId: chat.id._serialized, picture: pic })
		// 			})
		// 		})
		// 	})
		// }

		/* ---------- SENDING PROFILE PICTURES ---------- */
		if (profilePics !== []) {
			loggedIn && socket.emit('profile_pics', profilePics)
		}

		/* ---------- SAVING USER ID & SENDING INITIAL MESSAGE LIST ---------- */
		socket.on('userIdForMessages', userId => {
			// saving chat id
			selectedChat = userId
			if (userId && allChats) {
				// selecting chat
				const user = allChats.filter(user => user.id._serialized === userId)[0]
				user.fetchMessages((limit = 100)).then(messages => {
					// sending messages
					socket.emit('getMessages', messages)
				})
			}
		})

		/* ---------- WHEN SOCKET DISCONNECTING ---------- */
		socket.on('disconnecting_', data => {
			console.log(`${data.componentName} is disconnecting.`.red)
		})

		/* ---------- WHEN SOCKET GETS DISCONNECTED ---------- */
		socket.on('disconnect', () => {
			console.log(`${socket.id} is disconnected.`.red)
			socket.disconnect()
		})

		/* ---------- USER LOGOUT ---------- */
		socket.on('logout', data => {
			console.log('logout'.red)
			client.logout()
			loggedIn = false
		})
	})

	// initializing client
	client.initialize()
} catch (error) {
	console.log(`Error in main try catch: ${error}`)
}
