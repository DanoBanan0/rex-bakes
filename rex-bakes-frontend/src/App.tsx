import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // <--- 1. Importar Footer

// ... importaciones de páginas ...
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import AdminDashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      {/* Navbar arriba */}
      <Navbar />

      {/* Contenedor principal que empuja el footer hacia abajo */}
      <div className="min-h-screen flex flex-col">

        {/* Aquí quitamos el margen superior fijo para que el Hero pegue con el Navbar si quieres, 
            o dejamos un contenedor flexible */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>

        {/* Footer abajo */}
        <Footer />

      </div>

    </BrowserRouter>
  );
}

export default App;