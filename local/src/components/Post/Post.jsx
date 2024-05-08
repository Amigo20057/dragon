import { Check, Eye, Pencil, Trash2 } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchRemovePost } from '../../redux/slices/posts'
import { UserInfo } from '../UserInfo/UserInfo'
import style from './Post.module.scss'

export const Post = ({
	_id,
	title,
	createdAt,
	user,
	viewsCount,
	targetVote,
	startVote,
	children,
	isEditable,
	isFullPost,
}) => {
	const dispatch = useDispatch()

	const onClickRemove = () => {
		if (window.confirm('Ви впевнені, що хочете видалити голосування?')) {
			dispatch(fetchRemovePost(_id))
		}
	}

	return (
		<div className={!isFullPost ? style.post : style.fullPost}>
			{isEditable && (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						position: 'absolute',
						right: '15px',
					}}
					className={style.editButtons}
				>
					<Link
						style={{
							marginRight: '20px',
							display: 'flex',
							alignItems: 'center',
						}}
						to={`/posts/${_id}/edit`}
					>
						<Pencil color='#000' />
					</Link>
					<Trash2 onClick={onClickRemove} />
				</div>
			)}
			<div className={style.wrapper}>
				<UserInfo {...user} additionalText={createdAt} />
				<div className={style.indention}>
					<h2 className={!isFullPost ? style.title : style.titleFull}>
						{isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}
					</h2>
					{children && <div className={style.content}>{children}</div>}
					<ul
						className={!isFullPost ? style.postDetails : style.fullPostDetails}
					>
						<li>
							{isFullPost ? <Eye size='32px' /> : <Eye />}
							<span style={{ marginLeft: '10px' }}>{viewsCount}</span>
						</li>
						<li>
							<button
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Check />
							</button>
							<span>
								<div className={!isFullPost ? style.vote : style.fullPostVote}>
									<div>
										<span>{startVote}</span>
										<span>/</span>
										<span>{targetVote}</span>
									</div>
								</div>
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
