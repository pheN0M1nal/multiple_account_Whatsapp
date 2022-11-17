import React, { useState } from 'react'
import Icon from 'components/Icon'
import './styles/main.css'

const OptionsBtn = ({
	setLogin,
	logout,
	className,
	iconId,
	iconClassName,
	ariaLabel,
	options = [],
	position = 'left',
	showPressed = true,
	...props
}) => {
	const [showOptions, setShowOptions] = useState(false)

	const onClick = option => {
		if (option === 'Log out') {
			console.log('first')
			logout()
			setLogin(false)
		}
	}

	return (
		<div className='pos-rel'>
			<button
				aria-label={ariaLabel}
				className={`options-btn ${
					showOptions && showPressed ? 'options-btn--pressed' : ''
				} ${className || ''}`}
				onClick={() => setShowOptions(!showOptions)}
				{...props}>
				<Icon
					id={iconId}
					className={iconClassName}
				/>
			</button>
			<ul
				className={`options-btn__options ${
					showOptions ? 'options-btn__options--active' : ''
				} ${position === 'right' ? 'options-btn__options--right' : ''}`}>
				{options.map((option, index) => (
					<li
						className='options-btn__option'
						onClick={() => onClick(option)}
						key={index}>
						{option}
					</li>
				))}
			</ul>
		</div>
	)
}

export default OptionsBtn
