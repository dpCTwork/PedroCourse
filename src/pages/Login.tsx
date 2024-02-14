import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../config/firebase"
import { useNavigate } from "react-router-dom"

const Login = () => {
	const navigate = useNavigate()

	const loginGoogle = async () => {
		// This returns a promise
		const result = await signInWithPopup(auth, provider)
		console.log(result)
		navigate("/")
	}

	return (
		<div className="">
			<p>Sign In with Google</p>
			<button onClick={loginGoogle}>Sign In with Google</button>
		</div>
	)
}

export default Login
