import Icon from 'components/Icon'
import React from 'react'
import media from 'assets/images/women.jpeg'
import formatTime from 'utils/formatTime'

const Convo = ({ lastMsgRef, messages }) => {
	console.log(messages[0])
	const convertTimestamp = timestamp => {
		var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
			yyyy = d.getFullYear(),
			mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
			dd = ('0' + d.getDate()).slice(-2), // Add leading 0.
			hh = d.getHours(),
			h = hh,
			min = ('0' + d.getMinutes()).slice(-2), // Add leading 0.
			ampm = 'AM',
			time

		if (hh > 12) {
			h = hh - 12
			ampm = 'PM'
		} else if (hh === 12) {
			h = 12
			ampm = 'PM'
		} else if (hh == 0) {
			h = 12
		}

		// ie: 2013-02-18, 8:35 AM
		//time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm
		time = h + ':' + min + ' ' + ampm

		return time
	}

	return (
		<div>
			<p className='chat__encryption-msg'>
				<Icon
					id='lock'
					className='chat__encryption-icon'
				/>
				Messages are end-to-end encrypted. No one outside of this chat, not even
				WhatsApp, can read or listen to them. Click to learn more.
			</p>
			<div className='chat__msg-group'>
				{messages.map((message, msgIndex) => {
					const assignRef = () =>
						msgIndex === messages.length - 1 ? lastMsgRef : undefined
					return (
						<>
							{message._data?.type !== 'chat' ? (
								!message.id.fromMe ? (
									// 	(
									// 	<div
									// 		className={`chat__msg chat__img-wrapper ${
									// 			message.sender ? 'chat__msg--rxd' : 'chat__msg--sent'
									// 		}`}
									// 		ref={assignRef()}>
									// 		<img
									// 			src={media}
									// 			alt=''
									// 			className='chat__img'
									// 		/>
									// 		<span className='chat__msg-footer'>
									// 			{/* <span>{formatTime(message.time)}</span> */}
									// 			{/* {!message.sender && (
									// 				<Icon
									// 					id={
									// 						message?.status === 'sent'
									// 							? 'singleTick'
									// 							: 'doubleTick'
									// 					}
									// 					aria-label={message?.status}
									// 					className={`chat__msg-status-icon ${
									// 						message?.status === 'read'
									// 							? 'chat__msg-status-icon--blue'
									// 							: ''
									// 					}`}
									// 				/>
									// 			)} */}
									// 		</span>

									// 		<button
									// 			aria-label='Message options'
									// 			className='chat__msg-options'>
									// 			<Icon
									// 				id='downArrow'
									// 				className='chat__msg-options-icon'
									// 			/>
									// 		</button>
									// 	</div>
									// )

									<p
										className='chat__msg chat__msg--rxd'
										ref={assignRef()}>
										<span>🚫 This media is not supported yet ... </span>
										<span className='chat__msg-filler'> </span>
										<span className='chat__msg-footer'>
											{convertTimestamp(message.timestamp)}
										</span>
										<button
											aria-label='Message options'
											className='chat__msg-options'>
											<Icon
												id='downArrow'
												className='chat__msg-options-icon'
											/>
										</button>
									</p>
								) : (
									<>
										<p
											className='chat__msg chat__msg--sent'
											ref={assignRef()}>
											<span>🚫 This media is not supported yet ... </span>
											<span className='chat__msg-filler'> </span>
											<span className='chat__msg-footer'>
												{convertTimestamp(message.timestamp)}
											</span>
											<button
												aria-label='Message options'
												className='chat__msg-options'>
												<Icon
													id='downArrow'
													className='chat__msg-options-icon'
												/>
											</button>
										</p>
									</>
								)
							) : !message.id.fromMe ? (
								<p
									className='chat__msg chat__msg--rxd'
									ref={assignRef()}>
									<span>{message._data.body}</span>
									<span className='chat__msg-filler'> </span>
									<span className='chat__msg-footer'>
										{convertTimestamp(message.timestamp)}
									</span>
									<button
										aria-label='Message options'
										className='chat__msg-options'>
										<Icon
											id='downArrow'
											className='chat__msg-options-icon'
										/>
									</button>
								</p>
							) : (
								<p
									className='chat__msg chat__msg--sent'
									ref={assignRef()}>
									<span>{message._data.body}</span>
									<span className='chat__msg-filler'> </span>
									<span className='chat__msg-footer'>
										<span className='chat__msg-footer'>
											{convertTimestamp(message.timestamp)}
										</span>
										<Icon
											id={
												message?.status === 'sent' ? 'singleTick' : 'doubleTick'
											}
											aria-label={message?.status}
											className={`chat__msg-status-icon ${
												message?.ack === 3 ? 'chat__msg-status-icon--blue' : ''
											}`}
										/>
									</span>
									<button
										aria-label='Message options'
										className='chat__msg-options'>
										<Icon
											id='downArrow'
											className='chat__msg-options-icon'
										/>
									</button>
								</p>
							)}
						</>
					)
				})}
			</div>
		</div>
	)
}

export default Convo
