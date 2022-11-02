// const express = require('express')
// const asyncHandler = require('express-async-handler')
// const { initClient, sendMessageToNum } = require('../whatsapp/index.js')

// // whatsapp
// const client = initClient()

// const sendMessage = asyncHandler(async (req, res) => {
// 	const { number, message } = req.body

// 	client.on('ready', () => {
// 		console.log('Client is ready!')

// 		client.getChats().then(chats => {
// 			const selectedNum = chats.find(chat => chat.id.user === number)
// 			client
// 				.sendMessage(selectedNum.id._serialized, message)
// 				.then(function (resp) {
// 					console.log(resp)
// 					res.json({ messageSent: true })
// 				})
// 				.catch(function (error) {
// 					res.json({ messageSent: false, error: error })
// 				})
// 		})
// 	})
// })

// // client.on('ready', () => {
// // 	console.log('Client is ready!')
// // 	const sendMessage = asyncHandler(async (req, res) => {
// // 		const { number, message } = req.body

// // 		client.getChats().then(chats => {
// // 			const selectedNum = chats.find(chat => chat.id.user === number)
// // 			client
// // 				.sendMessage(selectedNum.id._serialized, message)
// // 				.then(function (resp) {
// // 					console.log(resp)
// // 					res.json({ messageSent: true })
// // 				})
// // 				.catch(function (error) {
// // 					res.json({ messageSent: false, error: error })
// // 				})
// // 		})
// // 	})
// // })

// exports.sendMessage = sendMessage
