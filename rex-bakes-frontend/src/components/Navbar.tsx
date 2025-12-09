import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; // <--- Importar

export default function Navbar() {
    const { user, logout, isAdmin } = useAuth();
    const { count } = useCart(); // <--- Traemos la cuenta total
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">

                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-pink-600 flex items-center gap-2">
                            🍰 <span className="hidden sm:block">Rex Bakes</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-gray-700 hover:text-pink-600 font-medium">
                            Menú
                        </Link>

                        {/* Carrito con Contador */}
                        {user && (
                            <Link to="/cart" className="text-gray-700 hover:text-pink-600 font-medium flex items-center gap-1 relative">
                                🛒
                                <span className="hidden sm:inline">Carrito</span>

                                {/* Burbuja Roja */}
                                {count > 0 && (
                                    <span className="bg-pink-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full -ml-1 -mt-2">
                                        {count}
                                    </span>
                                )}
                            </Link>
                        )}

                        {isAdmin && (
                            <Link to="/admin" className="text-red-600 hover:text-red-700 font-bold border border-red-200 px-3 py-1 rounded-full bg-red-50 text-sm">
                                ⚙️ Admin
                            </Link>
                        )}

                        <div className="h-6 w-px bg-gray-300 mx-2"></div>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-600 hidden md:block">
                                    Hola, <b>{user.name}</b>
                                </span>
                                <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-gray-800 underline">
                                    Salir
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login" className="text-gray-700 hover:text-pink-600 font-medium">
                                    Entrar
                                </Link>
                                <Link to="/register" className="px-4 py-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition shadow-sm text-sm font-bold">
                                    Registrarse
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}