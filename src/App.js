import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import VehicleListPage from './pages/vehicles/VehiclesListPage.js';
import VehicleformPage from './pages/vehicles/VehicleFormPage.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/vehicles" replace />} />
        <Route path="/vehicles" element={<VehicleListPage />} />
        <Route path="/vehicles/new" element={<VehicleformPage mode="create" />} />
        <Route path="/vehicles/:id/edit" element={<VehicleformPage mode="edit" />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
