import { createContext, useContext, useEffect, useState, useRef } from 'react'

import io from 'socket.io-client'

const SOCKET_URL = window.location.origin.includes('localhost')
	? 'http://localhost:5000'
	: ''
const MainContext = createContext()
const useMainContext = () => useContext(MainContext)

const MainProvider = ({ children }) => {
	let socket = useRef(null)
	const [chats, setChats] = useState([])
	const [contacts, setContacts] = useState([])
	const [lastMessages, setLastMessages] = useState([])
	var ac = []

	useEffect(() => {
		socket.current = io(SOCKET_URL)

		socket.current.on('connnection', () => {
			console.log('connected to server')
		})
		socket.current.on('contacts', contacts => {
			console.log('contacts', contacts)
			ac = contacts
			setContacts(contacts)
		})

		socket.current.on('get_chats', allChats => {
			console.log(allChats)
			setChats(
				allChats.map(chat => {
					console.log(ac)
					var selected = ac.filter(
						contact => contact.id._serialized === chat.id._serialized
					)[0]
					console.log(selected)
					return { ...chat, pic: selected.pic ? selected.pic : 'empty' }
				})
			)
		})

		socket.current.on('lastMessages', lastMessages => {
			console.log('lastMessages', lastMessages)
			setLastMessages(lastMessages)
		})
		return () => {
			socket.current.emit('disconnecting_', { componentName: 'userContext' })
			socket.current.disconnect()
		}
	}, [])

	const logout = () => {
		console.log('context logout')
		socket.current.emit('logout', 'logout')
	}

	return (
		<MainContext.Provider
			value={{
				contacts,
				setContacts,
				chats,
				setChats,
				logout,
				lastMessages,
			}}>
			{children}
		</MainContext.Provider>
	)
}

export { useMainContext, MainProvider }
