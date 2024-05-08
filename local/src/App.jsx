import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { useEffect } from 'react'
import { AddPost, FullPost, Home, Login, Registration } from './Pages'
import { Header } from './components/Header/Header'
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth'

function App() {
	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)

	useEffect(() => {
		dispatch(fetchAuthMe())
	}, [])
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/posts/:id' element={<FullPost />} />
				<Route path='/add-post' element={<AddPost />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Registration />} />
			</Routes>
		</>
	)
}

export default App
