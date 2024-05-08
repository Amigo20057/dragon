import { body } from 'express-validator'

export const loginValidation = [
	body('email', 'invalid email format').isEmail(),
	body('password', 'password must have min 5 symbol').isLength({ min: 5 }),
]

export const registerValidation = [
	body('email', 'invalid email format').isEmail(),
	body('password', 'password must have min 5 symbol').isLength({ min: 5 }),
	body('fullName', 'enter your name').isLength({ min: 3 }),
]

export const postCreateValidation = [
	body('title', 'enter title').isLength({ min: 3 }).isString(),
	body('text', 'enter text').isLength({ min: 10 }).isString(),
	body('targetVote', 'enter target vote').isLength({ min: 2 }).isString(),
]
