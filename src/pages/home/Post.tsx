import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	where,
} from "firebase/firestore"
import { PostsType } from "./Home"
import { auth, db } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"

type PostProps = {
	post: PostsType
}

interface ILike {
	likeId: string
	userId: string
}

const Post = (props: PostProps) => {
	const { post } = props
	const [user] = useAuthState(auth)
	const [likes, setLikes] = useState<ILike[] | null>(null)

	const likesRef = collection(db, "likes")

	const likesDoc = query(likesRef, where("postId", "==", post.id))

	const getLikes = async () => {
		const data = await getDocs(likesDoc)
		setLikes(
			data.docs.map((doc) => ({
				userId: doc.data().userId,
				likeId: doc.id,
			}))
		)
	}

	const addLike = async () => {
		try {
			// console.log(data)
			const newDoc = await addDoc(likesRef, {
				userId: user?.uid,
				postId: post.id,
			})
			if (user) {
				setLikes((prev) =>
					prev
						? [...prev, { userId: user?.uid, likeId: newDoc.id }]
						: [{ userId: user?.uid, likeId: newDoc.id }]
				)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const removeLike = async () => {
		try {
			// console.log(data)
			const unlikeQuery = query(
				likesRef,
				where("postId", "==", post.id),
				where("userId", "==", user?.uid)
			)
			const unlikeData = await getDocs(unlikeQuery)
			const likeId = unlikeData.docs[0].id
			const likeToDelete = doc(db, "likes", unlikeData.docs[0].id)
			await deleteDoc(likeToDelete)
			if (user) {
				setLikes(
					(prev) =>
						prev && prev.filter((like) => like.likeId !== likeId)
				)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

	useEffect(() => {
		getLikes()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div>
			<div className="title">
				<h1>{post.title}</h1>
			</div>
			<div className="body">
				<p>{post.body}</p>
			</div>
			<div className="footer">
				<p>@{post.user}</p>
				<button onClick={hasUserLiked ? removeLike : addLike}>
					{hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
				</button>
				{likes && <p>Likes: {likes.length}</p>}
			</div>
		</div>
	)
}

export default Post
