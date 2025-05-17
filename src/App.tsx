// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Rental from './pages/rental'
import Characteristics from './pages/characteristics'

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Rental />} />
				<Route path="/caracteristicas/:id" element={<Characteristics />} />
			</Routes>
		</Router>
	)
}

export default App
