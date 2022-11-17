import Icon from 'components/Icon'
import React from 'react'
import media from 'assets/images/women.jpeg'
import formatTime from 'utils/formatTime'

const Convo = ({ lastMsgRef, messages }) => {
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
							{message._data.type !== 'chat' ? (
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
										{/* <span className='chat__msg-footer'>
									{formatTime(message.time)}
								</span> */}
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
											{/* <span className='chat__msg-footer'>
									{formatTime(message.time)}
								</span> */}
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
									{/* <span className='chat__msg-footer'>
									{formatTime(message.time)}
								</span> */}
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
										{/* <span> {formatTime(message.time)} </span> */}
										{/* <Icon
										id={
											message?.status === 'sent' ? 'singleTick' : 'doubleTick'
										}
										aria-label={message?.status}
										className={`chat__msg-status-icon ${
											message?.status === 'read'
												? 'chat__msg-status-icon--blue'
												: ''
										}`}
									/> */}
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
