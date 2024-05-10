import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from '../../axios'
import { selectIsAuth } from '../../redux/slices/auth'
import styles from './AddPost.module.scss'

export const AddPost = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const isAuth = useSelector(selectIsAuth)
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [targetVote, setTargetVote] = useState('')
	const [isLoading, setLoading] = useState(false)

	const isEditing = Boolean(id)

	const onSubmit = async () => {
		try {
			setLoading(true)

			const fields = {
				title,
				text,
				targetVote,
			}

			const { data } = isEditing
				? await axios.patch(`/posts/${id}`, fields)
				: await axios.post('/posts', fields)

			const _id = isEditing ? id : data._id

			navigate(`/posts/${_id}`)
		} catch (err) {
			console.warn(err)
			alert('Помилка при створенні посту')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (id) {
			axios
				.get(`/posts/${id}`)
				.then(({ data }) => {
					setTitle(data.title)
					setText(data.text)
					setTargetVote(data.targetVote)
				})
				.catch(err => {
					console.log(err)
					alert('Помилка при отриманні посту')
				})
		}
	}, [])

	return (
		<div className={styles.addPost}>
			<Paper style={{ padding: 50, width: '60%' }}>
				<TextField
					classes={{ root: styles.title }}
					variant='standard'
					placeholder='Заголовок голосування...'
					value={title}
					onChange={e => setTitle(e.target.value)}
					fullWidth
				/>
				<TextField
					classes={{ root: styles.text }}
					variant='standard'
					placeholder='Текст'
					fullWidth
					value={text}
					onChange={e => setText(e.target.value)}
				/>
				<input
					className={styles.vote}
					type='text'
					placeholder='Ціль голосів'
					value={targetVote}
					onChange={e => setTargetVote(e.target.value)}
				/>
				<div className={styles.buttons}>
					<Button onClick={onSubmit} size='large' variant='contained'>
						{isEditing ? 'Зберегти' : 'Опублікувати'}
					</Button>
					<Link to='/'>
						<Button size='large'>Відмінити</Button>
					</Link>
				</div>
			</Paper>
		</div>
	)
}
