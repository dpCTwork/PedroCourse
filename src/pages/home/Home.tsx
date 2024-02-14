import { getDocs, collection } from "firebase/firestore"
import { db } from "../../config/firebase"
import { useEffect, useState } from "react"
import Post from "./Post"

export type PostsType = {
	id: string
	userId: string
	user: string
	title: string
	body: string
}

const Home = () => {
	const [posts, setPosts] = useState<PostsType[] | null>(null)
	const postsRef = collection(db, "posts")

	const getPosts = async () => {
		const data = await getDocs(postsRef)
		setPosts(
			data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			})) as PostsType[]
		)
	}

	useEffect(() => {
		getPosts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div>
			{posts?.map((post, key) => (
				<Post key={key} post={post} />
			))}
		</div>
	)
}

export default Home
