import React from 'react'
import style from './Registration.module.scss'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth'

export const Registration = () => {
	const isAuth = useSelector(selectIsAuth)
	const dispatch = useDispatch()
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
		},
		mode: 'onChange',
	})

	const onSubmit = async values => {
		const data = await dispatch(fetchRegister(values))
		if (!data.payload) {
			return alert('Не вдалося зареєструватися')
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
				<h1>Створення акаунту</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						{...register('fullName', { required: `Вкажіть повне ім'я` })}
						placeholder={`Повне ім'я`}
						type='text'
					/>
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
					<button type='submit'>Зареєструватися</button>
				</form>
			</div>
		</div>
	)
}
