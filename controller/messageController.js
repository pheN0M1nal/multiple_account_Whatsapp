const express = require('express')
const asyncHandler = require('express-async-handler')

// import asyncHandler from 'express-async-handler'

const sendMessage = asyncHandler(async (req, res) => {
	res.json({ you: 'are awesome' })
})

exports.sendMessage = sendMessage
