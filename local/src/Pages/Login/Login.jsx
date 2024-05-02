import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth'
import style from './Login.module.scss'

export const Login = () => {
	const isAuth = useSelector(selectIsAuth)
	const dispatch = useDispatch()
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	})

	const onSubmit = async values => {
		const data = await dispatch(fetchAuth(values))
		if (!data.payload) {
			return alert('Не вдалося авторизуватися')
		}
		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token)
		}
	}

	if (isAuth) {
		return <Navigate to='/' />
	}

	return (
		<div className={style.container}>
			<div className={style.form}>
				<h1>Вхід в акаунт</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						{...register('email', { required: 'Вкажіть почту' })}
						placeholder='E-Mail'
						type='email'
					/>
					<input
						{...register('password', { required: 'Вкажіть пароль' })}
						placeholder='Пароль'
						type='password'
					/>
					<button type='submit'>Увійти</button>
				</form>
			</div>
		</div>
	)
}
