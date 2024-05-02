import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import React, { useCallback, useState } from 'react'
import styles from './AddPost.module.scss'

export const AddPost = () => {
	const [value, setValue] = useState('')

	const onChange = useCallback(value => {
		setValue(value)
	}, [])

	return (
		<div className={styles.addPost}>
			<Paper style={{ padding: 50, width: '60%' }}>
				<TextField
					classes={{ root: styles.title }}
					variant='standard'
					placeholder='Заголовок голосування...'
					fullWidth
				/>
				<TextField
					classes={{ root: styles.text }}
					variant='standard'
					placeholder='Текст'
					fullWidth
				/>
				<input
					className={styles.vote}
					type='number'
					placeholder='Цель голосів'
				/>
				<div className={styles.buttons}>
					<Button size='large' variant='contained'>
						Опублікувати
					</Button>
					<a href='/'>
						<Button size='large'>Відмінити</Button>
					</a>
				</div>
			</Paper>
		</div>
	)
}
