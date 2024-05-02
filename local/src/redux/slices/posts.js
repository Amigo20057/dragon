import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const { data } = await axios.get('/posts')
	return data
})

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
	},
})

export const postsReducer = postsSlice.reducer
