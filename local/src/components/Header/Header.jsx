import { CirclePlus, LogOut, Search } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout, selectIsAuth } from '../../redux/slices/auth'
import style from './Header.module.scss'

export const Header = () => {
	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)

	const onClickLogout = () => {
		if (window.confirm('Ви впевнені, що хочете вийти?')) {
			dispatch(logout())
			window.localStorage.removeItem('token')
		}
	}

	return (
		<div className={style.Header}>
			<Link to='/' className={style.logo}>
				DRAGON
			</Link>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				{isAuth ? (
					<>
						<div className={style.search}>
							<input type='text' />
							<Search />
						</div>
						{/* <div className={style.profile}>
							<Link style={{ display: 'flex', alignItems: 'center' }} to='/me'>
								<CircleUserRound size={36} color='#000' />
							</Link>
						</div> */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
							className={style.createPost}
						>
							<Link style={{ color: '#000' }} to='/add-post'>
								<CirclePlus size={29} />
							</Link>
						</div>
						<div className={style.logout}>
							<button style={{ border: 'none', marginLeft: '40px' }}>
								<LogOut onClick={onClickLogout} size={29} color='#000' />
							</button>
						</div>
					</>
				) : (
					<>
						<button className={style.login}>
							<Link to='/login'>Увійти</Link>
						</button>
						<button className={style.register}>
							<Link to='/register'>Зареєструватися</Link>
						</button>
					</>
				)}
			</div>
		</div>
	)
}
