import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Post } from '../components/Post/Post'
import style from './Home.module.scss'

import { fetchPosts } from '../redux/slices/posts'

export const Home = ({ searchQuery, setSearchQuery }) => {
	const dispatch = useDispatch()
	const userData = useSelector(state => state.auth.data)
	const { posts } = useSelector(state => state.posts)

	const [filter, setFilter] = useState('popular')

	const isPostsLoading = posts.status === 'loading'

	const sortedPosts = useMemo(() => {
		let filteredPosts = posts.items

		// Filter by search query
		if (searchQuery.trim() !== '') {
			filteredPosts = filteredPosts.filter(post =>
				post.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
			)
		}

		// Sort by filter
		if (filter === 'newest') {
			return filteredPosts
				.slice()
				.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
		} else if (filter === 'popular') {
			return filteredPosts.slice().sort((a, b) => b.viewsCount - a.viewsCount)
		} else {
			return filteredPosts
		}
	}, [filter, posts.items, searchQuery])

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
				<button
					className={filter === 'newest' ? style.newest : {}}
					onClick={() => setFilter('newest')}
				>
					Нові
				</button>
				<button
					className={filter === 'popular' ? style.popular : {}}
					onClick={() => setFilter('popular')}
				>
					Популярні
				</button>
			</div>
			<div className={style.posts}>
				{sortedPosts.map((obj, index) => (
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
