const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')

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

exports.initClient = initClient
