import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import NewPost from "./pages/createpost/NewPost"

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/new-post" element={<NewPost />} />
					{/* <Route path="/" element={<Home />} /> */}
				</Routes>
			</Router>
		</div>
	)
}

export default App
