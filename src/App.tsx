// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Rental from './pages/rental'
import Features from './pages/features'

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Rental />} />
				<Route path="/caracteristicas/:id" element={<Features />} />
			</Routes>
		</Router>
	)
}

export default App
