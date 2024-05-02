import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from '../axios'
import { Post } from '../components/Post/Post'

export const FullPost = () => {
	const [data, setData] = useState()
	const [isLoading, setLoading] = useState(true)
	const { id } = useParams()

	useEffect(() => {
		axios
			.get(`/posts/${id}`)
			.then(res => {
				setData(res.data)
				setLoading(false)
			})
			.catch(err => {
				console.warn(err)
				alert('Помилка при отриманні поста ')
			})
	}, [])

	if (isLoading) {
		return <Post isFullPost />
	}

	return (
		<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
			{data && (
				<Post
					id={data._id}
					title={data.title}
					user={data.user}
					createdAt={data.createdAt}
					viewsCount={data.viewsCount}
					targetVote={data.targetVote}
					startVote={data.startVote}
					isFullPost
				>
					<p>{data.text}</p>
				</Post>
			)}
		</div>
	)
}
