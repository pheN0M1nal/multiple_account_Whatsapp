import React, { useEffect, useRef, useState } from 'react'
import './styles/main.css'
import EmojiTray from './components/EmojiTray'
import ChatInput from './components/ChatInput'
import Header from './components/Header'
import ChatSidebar from './components/ChatSidebar'
import Icon from 'components/Icon'
import Search from './components/Search'
import Profile from './components/Profile'
import Convo from './components/Convo'
import { useMainContext } from 'context/mainContext'
import { dummyMessages } from 'data/dummyMessages'

import io from 'socket.io-client'

const SOCKET_URL = window.location.origin.includes('localhost')
	? 'http://localhost:5000'
	: ''

const Chat = ({ match, history }) => {
	const [messages, setMessages] = useState([])

	const { chats } = useMainContext()

	const userId = match.params.id

	let user = chats.filter(user => user.id._serialized === userId)[0]

	let socket = useRef(null)
	const lastMsgRef = useRef(null)
	const [showAttach, setShowAttach] = useState(false)
	const [showEmojis, setShowEmojis] = useState(false)
	const [newMessage, setNewMessage] = useState('')

	useEffect(() => {
		setMessages([])

		socket.current = io(SOCKET_URL)

		socket.current.emit('userIdForMessages', user?.id._serialized)

		socket.current.on('getMessages', userMessages => {
			console.log('itsme 50')
			if (userMessages[0]?.id.remote === userId) {
				setMessages(userMessages)
			}

			scrollToLastMsg()
			//userMessages && setMessages(userMessages)
		})

		socket.current.on('getSendedMessage', msg => {
			console.log('itsme 64')

			setMessages([msg])
			scrollToLastMsg()
		})

		// socket.current.on('ackMsg', ackMsg => {
		// 	var flag = true

		// 	var newMsg = messages

		// 	const newMsg_ = messages.map(msg => {
		// 		if (msg.id._serialized === ackMsg.id._serialized) {
		// 			return { ...msg, ack: ackMsg.ack }
		// 		}
		// 		flag = false
		// 		return msg
		// 	})

		// 	flag
		// 		? setMessages(newMsg.length !== 0 ? newMsg : newMsg_)
		// 		: setMessages([...messages, ackMsg])
		// 	console.log(newMsg)
		// })

		return () => {
			socket.current.emit('disconnecting_', { componentName: 'QrScreen' })
			socket.current.disconnect()
		}
	}, [userId])

	// useEffect(() => {
	// 	user && scrollToLastMsg()
	// }, [chats])

	// const openSidebar = cb => {
	// 	// close any open sidebar first
	// 	setShowProfileSidebar(false)
	// 	setShowSearchSidebar(false)

	// 	// call callback fn
	// 	cb(true)
	// }

	const scrollToLastMsg = () => {
		messages.length !== 0 && lastMsgRef.current?.scrollIntoView()
	}
	const getTimestampInSeconds = () => {
		return Math.floor(Date.now() / 1000)
	}
	const submitNewMessage = () => {
		//addNewMessage(user.id.user, newMessage)
		//setNewMessage('')
		scrollToLastMsg()
		socket.current.emit('send_message', {
			chatId: userId,
			message: newMessage,
		})

		setNewMessage('')
	}

	const onClick = () => {
		socket.current.emit('userIdForMessages', user.id._serialized)
	}

	return (
		<div className='chat'>
			<div className='chat__body'>
				<div className='chat__bg'></div>
				<Header
					user={user}
					// openProfileSidebar={() => openSidebar(setShowProfileSidebar)}
					// openSearchSidebar={() => openSidebar(setShowSearchSidebar)}
				/>

				<div className='chat__content'>
					<Convo
						lastMsgRef={lastMsgRef}
						messages={messages}
					/>
				</div>
				<footer className='chat__footer'>
					<button
						className='chat__scroll-btn'
						aria-label='scroll down'
						onClick={scrollToLastMsg}>
						<Icon id='downArrow' />
					</button>
					<EmojiTray
						showEmojis={showEmojis}
						newMessage={newMessage}
						setNewMessage={setNewMessage}
					/>
					<ChatInput
						showEmojis={showEmojis}
						setShowEmojis={setShowEmojis}
						showAttach={showAttach}
						setShowAttach={setShowAttach}
						newMessage={newMessage}
						setNewMessage={setNewMessage}
						submitNewMessage={submitNewMessage}
					/>
				</footer>
			</div>
			{/* <ChatSidebar
				heading='Search Messages'
				active={showSearchSidebar}
				closeSidebar={() => setShowSearchSidebar(false)}>
				<Search />
			</ChatSidebar>

			<ChatSidebar
				heading='Contact Info'
				active={showProfileSidebar}
				closeSidebar={() => setShowProfileSidebar(false)}>
				<Profile user={user} />
			</ChatSidebar> */}
		</div>
	)
}

export default Chat
