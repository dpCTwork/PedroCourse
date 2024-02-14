import { yupResolver } from "@hookform/resolvers/yup"
import { addDoc, collection } from "firebase/firestore"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { auth, db } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"

type CreateFormData = {
	title: string
	body: string
}

const CreateForm = () => {
	const [user] = useAuthState(auth)

	const navigate = useNavigate()

	const schema = yup.object().shape({
		title: yup.string().required("Title is required"),
		body: yup.string().required("Write your post!"),
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateFormData>({
		resolver: yupResolver(schema),
	})

	const postsRef = collection(db, "posts")

	const onCreatePost = async (data: CreateFormData) => {
		// console.log(data)
		await addDoc(postsRef, {
			// title: data.title,
			// body: data.body,
			// can destructure to achieve the same thing
			...data,
			user: user?.displayName,
			userId: user?.uid,
		})
		navigate("/")
	}

	return (
		<form onSubmit={handleSubmit(onCreatePost)}>
			<input placeholder="Title..." {...register("title")} />
			<p style={{ color: "red" }}>{errors.title?.message}</p>
			<textarea placeholder="Body..." {...register("body")} />
			<p style={{ color: "red" }}>{errors.body?.message}</p>
			<input className="submitForm" type="submit" />
		</form>
	)
}

export default CreateForm
