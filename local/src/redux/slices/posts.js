import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const { data } = await axios.get('/posts')
	return data
})
export const fetchRemovePost = createAsyncThunk(
	'posts/fetchRemovePost',
	async id => {
		axios.delete(`/posts/${id}`)
	}
)
export const fetchVotePost = createAsyncThunk(
	'posts/fetchVotePost',
	async id => {
		axios.patch(`/posts/${id}/vote`)
	}
)

const initialState = {
	posts: {
		items: [],
		status: 'loading',
	},
}

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducer: {},
	extraReducers: builder => {
		builder
			.addCase(fetchPosts.pending, state => {
				state.posts.items = []
				state.posts.status = 'loading'
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.posts.items = action.payload
				state.posts.status = 'idle'
			})
			.addCase(fetchPosts.rejected, state => {
				state.posts.items = []
				state.posts.status = 'error'
			})

			.addCase(fetchRemovePost.pending, (state, action) => {
				state.posts.items = state.posts.items.filter(
					obj => obj._id !== action.meta.arg
				)
			})

			.addCase(fetchVotePost.fulfilled, (state, action) => {
				const votedPost = state.posts.items.find(
					post => post._id === action.meta.arg
				)

				if (votedPost) {
					votedPost.startVote += 1
				}
			})
			.addCase(fetchVotePost.rejected, (state, action) => {
				state.posts.status = 'error'
			})
	},
})

export const postsReducer = postsSlice.reducer
