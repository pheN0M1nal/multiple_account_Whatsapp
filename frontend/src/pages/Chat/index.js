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
import { useUsersContext } from 'context/usersContext'
import { dummyMessages } from 'data/dummyMessages'
import noPic from '../../assets/images/noPic.png'

import io from 'socket.io-client'

const SOCKET_URL = window.location.origin.includes('localhost')
	? 'http://localhost:5000'
	: ''

const Chat = ({ match, history }) => {
	const [messages, setMessages] = useState([])

	const { users, setUserAsUnread, addNewMessage, profilePics } =
		useUsersContext()

	const userId = match.params.id

	let user = users.filter(user => user.id._serialized === userId)[0]

	const selectedObj = profilePics.filter(
		pic => pic.chatId === user?.id._serialized
	)[0]
	let socket = useRef(null)
	const lastMsgRef = useRef(null)
	const [showAttach, setShowAttach] = useState(false)
	const [showEmojis, setShowEmojis] = useState(false)
	const [showProfileSidebar, setShowProfileSidebar] = useState(false)
	const [showSearchSidebar, setShowSearchSidebar] = useState(false)
	const [newMessage, setNewMessage] = useState('')

	useEffect(() => {
		setMessages([])

		socket.current = io(SOCKET_URL)

		user && socket.current.emit('userIdForMessages', user.id._serialized)

		socket.current.on('getMessages', userMessages => {
			console.log(userMessages)
			setMessages(userMessages)
			scrollToLastMsg()
			//userMessages && setMessages(userMessages)
		})

		socket.current.on('profile_pics', pics => {
			console.log('pics', pics)
		})

		socket.current.on('getSendedMessage', msg => {
			setMessages([msg])
			scrollToLastMsg()
		})

		return () => {
			socket.current.emit('disconnecting_', { componentName: 'QrScreen' })
			socket.current.disconnect()
		}
	}, [userId])

	// useEffect(() => {
	// 	user && scrollToLastMsg()
	// }, [users])

	const openSidebar = cb => {
		// close any open sidebar first
		setShowProfileSidebar(false)
		setShowSearchSidebar(false)

		// call callback fn
		cb(true)
	}

	const scrollToLastMsg = () => {
		messages.length !== 0 && lastMsgRef.current.scrollIntoView()
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
					profilePic={selectedObj.picture ? selectedObj.picture : noPic}
					openProfileSidebar={() => openSidebar(setShowProfileSidebar)}
					openSearchSidebar={() => openSidebar(setShowSearchSidebar)}
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
