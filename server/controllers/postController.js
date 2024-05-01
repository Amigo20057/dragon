import PostModel from '../models/Post.js'

export const getAll = async (req, res) => {
	try {
		const posts = await PostModel.find()
			.populate({ path: 'user', select: ['fullName', 'email'] })
			.exec()

		res.json(posts)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'failed to get posts',
		})
	}
}

export const getOne = async (req, res) => {
	try {
		const postId = req.params.id

		const post = await PostModel.findByIdAndUpdate(
			postId,
			{ $inc: { viewsCount: 1 } },
			{ new: true }
		).populate({ path: 'user', select: ['fullName', 'email'] })

		if (!post) {
			return res.status(404).json({
				message: 'Post not found',
			})
		}

		res.json(post)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Error getting post',
		})
	}
}

export const remove = async (req, res) => {
	try {
		const postId = req.params.id

		const doc = await PostModel.findByIdAndDelete(postId)

		if (!doc) {
			return res.status(404).json({
				message: 'Post not found',
			})
		}

		res.json({
			success: true,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Error removing post',
		})
	}
}

export const create = async (req, res) => {
	try {
		const doc = new PostModel({
			title: req.body.title,
			text: req.body.text,
			targetVote: req.body.targetVote,
			user: req.userId,
		})

		const post = await doc.save()
		res.json(post)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'failed to create post',
		})
	}
}

export const update = async (req, res) => {
	try {
		const postId = req.params.id

		await PostModel.updateOne(
			{
				_id: postId,
			},
			{
				title: req.body.title,
				text: req.body.text,
			}
		)
		res.json({
			success: true,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'failed to update post',
		})
	}
}
