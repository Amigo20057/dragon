import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Post } from '../components/Post/Post'
import style from './Home.module.scss'

import { fetchPosts } from '../redux/slices/posts'

export const Home = () => {
	const dispatch = useDispatch()
	const userData = useSelector(state => state.auth.data)
	const { posts, status } = useSelector(state => state.posts)

	const isPostsLoading = posts.status === 'loading'

	useEffect(() => {
		dispatch(fetchPosts())
	}, [dispatch])

	console.log(posts)

	return (
		<div
			style={{
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
			}}
		>
			<div className={style.filters}>
				<button>Нові</button>
				<button>Популярні</button>
			</div>
			<div className={style.posts}>
				{/* {(isPostsLoading ? [...Array(5)] : posts.items).map((obj,index) => ( */}
				{posts.items.map((obj, index) => (
					<Post
						key={index}
						_id={obj._id}
						title={obj.title}
						user={obj.user}
						createdAt={obj.createdAt}
						viewsCount={obj.viewsCount}
						targetVote={obj.targetVote}
						startVote={obj.startVote}
						isEditable={userData?._id === obj.user._id}
					/>
				))}
			</div>
		</div>
	)
}
