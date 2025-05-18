import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import './App.css'

import FormEdit from './components/FormEdit'
import CharacteristicForm from './components/characteristicForm'
import Rental from './pages/RentalPage'
import SwitchOptions from './components/switchOptions'

import RentalDetails from './pages/RentalDetailsPage'
import Characteristics from './pages/CharacteristicsPage'
import CharacteristicEdit from './components/characteristicEdit'

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Rental />} /> // PAGINA INDIVIDUAL
				<Route path="/rental/:id" element={<RentalDetails/>} /> // PAGINA INDIVIDUAL
				<Route path="/characteristics" element={<Characteristics/>} /> // PAGINA INDIVIDUAL

				<Route path="/features" element={<SwitchOptions />} />
				<Route path="/rental/edit/:id" element={<FormEdit />} />
				<Route path="/rental/edit" element={<Navigate to="/" replace />} />
				<Route path="/characteristics/add" element={<CharacteristicForm />} /> 
				<Route path="/characteristics/edit/:id" element={<CharacteristicEdit />} />
				</Routes>
		</Router>
	)
}

export default App
