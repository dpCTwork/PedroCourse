import { Link } from "react-router-dom"
import { auth } from "../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"

const Navbar = () => {
	const [user] = useAuthState(auth)

	const logOut = async () => {
		await signOut(auth)
	}

	return (
		<div className="navbar">
			<div className="links">
				<Link to="/">Home</Link>
				{!user ? (
					<Link to="/login">Log In</Link>
				) : (
					<Link to="/new-post">Create New Post</Link>
				)}
			</div>

			<div className="user">
				{user && (
					<>
						<p>{user?.displayName}</p>
						<img
							src={user?.photoURL || ""}
							width="30"
							height="30"
						/>
						<button onClick={logOut}>Log Out</button>
					</>
				)}
			</div>
		</div>
	)
}

export default Navbar
