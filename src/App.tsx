import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import RentalPage from "./pages/RentalPage";
import RentalDetails from "./pages/RentalDetailsPage";
import Characteristics from "./pages/CharacteristicsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RentalPage />} />
        <Route path="/rental/:id" element={<RentalDetails />} /> 
        <Route path="/characteristics" element={<Characteristics />} /> 
      </Routes>
    </Router>
  );
}

export default App;
