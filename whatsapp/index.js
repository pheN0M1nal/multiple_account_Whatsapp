const { Client, LocalAuth } = require('whatsapp-web.js')
//const { fs } = require('fs')
const qrcode = require('qrcode-terminal')

// // Path where the session data will be stored
// const SESSION_FILE_PATH = './session.json'

// // Load the session data if it has been previously saved
// let sessionData
// if (fs.existsSync(SESSION_FILE_PATH)) {
// 	sessionData = require(SESSION_FILE_PATH)
// }

// Use the saved values
const initClient = () => {
	const client = new Client({
		authStrategy: new LocalAuth({ clientId: 'client-one' }),
	})
	client.on('qr', qr => {
		// Generate and scan this code with your phone
		qrcode.generate(qr, { small: true })
	})

	client.initialize()
	return client
}

const sendMessageToNum = client => {
	client.on('ready', () => {
		console.log('Client is ready!')
		client.getChats().then(chats => {
			const myGroup = chats.find(chat => chat.name === 'test')
			client.sendMessage(myGroup.id._serialized, 'msg from node instance 1')
			// client.getChats().then(function (res) {
			// 	console.log(res)
			// })
		})
	})
}

// // Save session values to the file upon successful auth
// client.on('authenticated', session => {
// 	sessionData = session
// 	fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), err => {
// 		if (err) {
// 			console.error(err)
// 		}
// 	})
// })

// client.on('message', msg => {
// 	console.log(msg)
// 	if (msg.body == 'ping') {
// 		msg.reply('pong')
// 	}
// })

exports.initClient = initClient
exports.sendMessageToNum = sendMessageToNum
