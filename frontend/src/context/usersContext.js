import { createContext, useContext, useEffect, useState, useRef } from 'react'

import io from 'socket.io-client'

const SOCKET_URL = window.location.origin.includes('localhost')
	? 'http://localhost:5000'
	: ''

const UsersContext = createContext()

const useUsersContext = () => useContext(UsersContext)

const UsersProvider = ({ children }) => {
	let socket = useRef(null)

	const [users, setUsers] = useState([])
	const [profilePics, setProfilePics] = useState([])

	const logout = () => {
		console.log('context logout')
		socket.current.emit('logout', 'logout')
	}

	useEffect(() => {
		socket.current = io(SOCKET_URL)

		socket.current.on('connnection', () => {
			console.log('connected to server')
		})
		socket.current.on('get_chats', chats => {
			setUsers(chats[0] ? chats : [])
		})

		socket.current.on('requestPp')
		socket.current.on('profile_pics', pics => {
			console.log('profilepics usercontext', pics)
			setProfilePics(pics)
		})
		return () => {
			socket.current.emit('disconnecting_', { componentName: 'userContext' })
			socket.current.disconnect()
		}
	}, [])

	const _updateUserProp = (userId, prop, value) => {
		setUsers(users => {
			const usersCopy = [...users]
			let userIndex = users.findIndex(user => user.id === userId)
			const userObject = usersCopy[userIndex]
			usersCopy[userIndex] = { ...userObject, [prop]: value }
			return usersCopy
		})
	}

	const setUserAsTyping = data => {
		const { userId } = data
		_updateUserProp(userId, 'typing', true)
	}

	const setUserAsNotTyping = data => {
		const { userId } = data
		_updateUserProp(userId, 'typing', false)
	}

	const fetchMessageResponse = data => {
		setUsers(users => {
			const { userId, response } = data

			let userIndex = users.findIndex(user => user.id === userId)
			const usersCopy = JSON.parse(JSON.stringify(users))
			const newMsgObject = {
				content: response,
				sender: userId,
				time: new Date().toLocaleTimeString(),
				status: null,
			}

			usersCopy[userIndex]?.messages?.TODAY.push(newMsgObject)

			return usersCopy
		})
	}

	// useEffect(() => {
	// 	socket.on('fetch_response', fetchMessageResponse)
	// 	socket.on('start_typing', setUserAsTyping)
	// 	socket.on('stop_typing', setUserAsNotTyping)
	// }, [socket])

	const setUserAsUnread = userId => {
		_updateUserProp(userId, 'unread', 0)
	}

	const addNewMessage = (userId, message) => {
		let userIndex = users.findIndex(user => user.id === userId)
		const usersCopy = [...users]
		const newMsgObject = {
			content: message,
			sender: null,
			time: new Date().toLocaleTimeString(),
			status: 'delivered',
		}

		usersCopy[userIndex].messages.TODAY.push(newMsgObject)
		setUsers(usersCopy)

		socket.emit('fetch_response', { userId })
	}

	return (
		<UsersContext.Provider
			value={{
				profilePics,
				setProfilePics,
				setUsers,
				users,
				setUserAsUnread,
				addNewMessage,
				logout,
			}}>
			{children}
		</UsersContext.Provider>
	)
}

export { useUsersContext, UsersProvider }
