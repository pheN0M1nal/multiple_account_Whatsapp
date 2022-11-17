const { Client, LocalAuth } = require('whatsapp-web.js')

// Use the saved values
const initClient = () => {
	const client = new Client({
		authStrategy: new LocalAuth({ clientId: 'client-one' }),
	})

	client.initialize()
	return client
}

exports.initClient = initClient
