import React from 'react'
import style from './UserInfo.module.scss'

export const UserInfo = ({ fullName, additionalText }) => {
	return (
		<div className={style.container}>
			<div className={style.userDetails}>
				<span className={style.userName}>{fullName}</span>
				<span className={style.additionalText}>{additionalText}</span>
			</div>
		</div>
	)
}
