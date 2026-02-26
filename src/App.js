import logo from './logo.svg';
import './App.css';
import VehicleListPage from './pages/vehicles/VehicleListPage';
import VehicleformPage from './pages/vehicles/VehicleFormPage';

function App() {
  return (
    <browserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/vehicles" replace />} />
        <Route path="/vehicles" element={<VehicleListPage />} />
        <Route path="/vehicles/new" element={<VehicleformPage mode="create" />} />
        <Route path="/vehicles/:id/edit" element={<VehicleformPage />} />
      </Routes>
  );
}

export default App;
