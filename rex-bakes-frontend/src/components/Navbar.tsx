import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Lado Isquierdo: Logo / Nombre */}
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold text-pink-600">
                            Rex Bakes
                        </Link>
                    </div>

                    {/* Lado derecho: enlaces */}
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-gray-700 hover:text-pink-600">
                            Menu
                        </Link>
                        <Link to="/cart" className="text-gray-700 hover:text-pink-600 font-bold">
                            Carrito
                        </Link>
                        <Link to="/login" className="px-4 py-2 rounded-md bg-pink-600 text-white hover:bg-pink-700 transition">
                            Ingresar
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}