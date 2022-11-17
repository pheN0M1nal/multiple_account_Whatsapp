import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loader from './components/Loader'
import Home from './pages/Home'
import Sidebar from 'components/Sidebar'
import Chat from 'pages/Chat'
import QrCodeScreen from 'screens/QrCodeScreen'
import { useUsersContext } from './context/usersContext'

import io from 'socket.io-client'

const userPrefersDark =
	window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

function App() {
	const { setProfilePics } = useUsersContext()
	const [appLoaded, setAppLoaded] = useState(false)
	const [startLoadProgress, setStartLoadProgress] = useState(false)
	const [users, setUsers] = useState([])
	const [pp, setProfilePictures] = useState([])
	const [login, setLogin] = useState(false)

	const SOCKET_URL = window.location.origin.includes('localhost')
		? 'http://localhost:5000'
		: ''

	let socket = useRef(null)

	useEffect(() => {
		if (userPrefersDark) document.body.classList.add('dark-theme')
		stopLoad()
	}, [])

	useEffect(() => {
		socket.current = io(SOCKET_URL)

		socket.current.on('connnection', () => {
			console.log('connected to server')
		})

		console.log(socket)
		socket.current.on('LoggedIn', () => {
			setLogin(true)

			if (users.length === 0) {
				socket.current.emit('requestChat')
				socket.current.on('get_chats', chats => {
					console.log(chats)
					setUsers(chats)
				})
			}

			if (pp.length === 0) {
				socket.current.emit('requestPp')
				socket.current.on('profile_pics', pics => {
					console.log('pp apps', pics)
					setProfilePictures(pics)
					setProfilePics(pics)
				})
			}
		})

		console.log('loggedIn', login)
		console.log('pp', pp.length !== 0)
		console.log('users', users.length !== 0)

		return () => {
			socket.current.emit('disconnecting_', { componentName: 'App' })
			socket.current.disconnect()
		}
	}, [users, pp])

	const stopLoad = () => {
		setStartLoadProgress(true)
		setTimeout(() => setAppLoaded(true), 3000)
	}

	return login && pp.length !== 0 && users.length !== 0 ? (
		appLoaded ? (
			<div className='app'>
				<p className='app__mobile-message'> Only available on desktop 😊. </p>
				<Router>
					<div className='app-content'>
						<Sidebar setLogin={setLogin} />
						<Switch>
							<Route
								path='/chat/:id'
								component={Chat}
							/>
							<Route component={Home} />
						</Switch>
					</div>
				</Router>
			</div>
		) : (
			<Loader done={startLoadProgress} />
		)
	) : (
		<QrCodeScreen />
	)
}

export default App
