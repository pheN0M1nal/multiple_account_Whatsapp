import React from 'react'
import Icon from 'components/Icon'
import { Link } from 'react-router-dom'
import noPic from '../../assets/images/noPic.png'

const Contact = ({ chat, lastestMessages }) => {
	//onst [pic, setPic] = useState('pic')

	// const selectedObj = profilePics.filter(
	// 	pic => pic.chatId === contact.id._serialized
	// )[0]

	const lastMessage = lastestMessages.filter(lastestMessage => {
		if (lastestMessage.message.length === 0) {
			return false
		}
		return lastestMessage?.message[0]?.id.remote === chat?.id._serialized
	})[0]

	if (!chat) {
		return <>contact null</>
	}

	// const getLastMessage = () => {
	// 	const messageDates = contact.messages && Object.keys(contact?.messages)
	// 	const recentMessageDate = messageDates[messageDates.length - 1]
	// 	const messages = [...contact?.messages[recentMessageDate]]
	// 	const lastMessage = messages.pop()
	// 	return lastMessage
	// }

	// const lastMessage = contact && getLastMessage(contact)

	return (
		<Link
			className='sidebar-contact'
			to={`/chat/${chat.id._serialized}`}>
			<div className='sidebar-contact__avatar-wrapper'>
				<img
					src={chat.pic !== 'empty' ? chat.pic : noPic}
					alt='profile pic'
					className='avatar'
				/>
			</div>
			<div className='sidebar-contact__content'>
				<div className='sidebar-contact__top-content'>
					<h2 className='sidebar-contact__name'> {chat.name} </h2>
					{/* <span className='sidebar-contact__time'>
						{formatTime(lastMessage.time)}
					</span> */}
				</div>
				<div className='sidebar-contact__bottom-content'>
					<p className='sidebar-contact__message-wrapper'>
						{/* {contact.lastMessage && lastMessage?.status && (
							<Icon
								id={
									contact.lastMessage && lastMessage?.status === 'sent'
										? 'singleTick'
										: 'doubleTick'
								}
								aria-label={contact.lastMessage && lastMessage?.status}
								className={`sidebar-contact__message-icon ${
									contact.lastMessage && lastMessage?.status === 'read'
										? 'sidebar-contact__message-icon--blue'
										: ''
								}`}
							/>
						)} */}
						<span
							className={`sidebar-contact__message ${
								!!chat.unreadCount ? 'sidebar-contact__message--unread' : ''
							}`}>
							{chat.typing ? (
								<i> typing...</i>
							) : lastMessage ? (
								lastMessage?.message[0]?.body ? (
									lastMessage?.message[0]?.id.fromMe ? 
									"You: "+lastMessage.message[0]?.body : lastMessage.message[0]?.body 
								) : (
									''
								)
							) : (
								''
							)}
						</span>
					</p>
					<div className='sidebar-contact__icons'>
						{chat.pinned && (
							<Icon
								id='pinned'
								className='sidebar-contact__icon'
							/>
						)}
						{!!chat.unreadCount && (
							<span className='sidebar-contact__unread'>
								{chat.unreadCount}
							</span>
						)}
						<button aria-label='sidebar-contact__btn'>
							<Icon
								id='downArrow'
								className='sidebar-contact__icon sidebar-contact__icon--dropdown'
							/>
						</button>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default Contact
