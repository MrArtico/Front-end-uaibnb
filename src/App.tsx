// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				{/* Add more routes as needed */}
			</Routes>
		</Router>
	)
}

function Home() {
	return <h2>Home Page</h2>
}

function About() {
	return <h2>About Page</h2>
}

export default App
