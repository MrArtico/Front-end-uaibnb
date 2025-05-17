// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Rental from './pages/RentalPage'
import CreateRental from './pages/CreateRental'

import './App.css'
import FormEdit from './components/FormEdit'
import RentalDetails from './pages/RentalDetailsPage'
import CharacteristicForm from './components/characteristicForm'
import Characteristics from './pages/CharacteristicsPage'

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Rental />} /> // PAGINA INDIVIDUAL
				<Route path="/rental/:id" element={<RentalDetails/>} /> // PAGINA INDIVIDUAL
				<Route path="/characteristics" element={<Characteristics/>} /> // PAGINA INDIVIDUAL
				<Route path="/characteristics/:id" element={<p>Mostra detalhes sobre a caracteristica</p>} /> // PAGINA INDIVIDUAL

				<Route path="/rental/add" element={<CreateRental />} />
				<Route path="/rental/edit/:id" element={<FormEdit />} />
				<Route path="/rental/edit" element={<Navigate to="/" replace />} />
				<Route path="/characteristics/add" element={<CharacteristicForm />} /> 
				{/* <Route path="/characteristics/:id" element={<Characteristics />} /> */}
			</Routes>
		</Router>
	)
}

export default App
