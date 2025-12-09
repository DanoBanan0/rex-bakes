import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                    {/* Columna 1: Sobre Nosotros */}
                    <div>
                        <h3 className="text-2xl font-bold text-pink-500 mb-4">Rex Bakes</h3>
                        <p className="text-gray-400">
                            Somos una pastelería local dedicada a endulzar tu vida con los mejores ingredientes y recetas caseras.
                        </p>
                    </div>

                    {/* Columna 2: Enlaces Rápidos */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Enlaces Rápidos</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-white transition">Inicio</Link></li>
                            <li><Link to="/login" className="text-gray-400 hover:text-white transition">Mi Cuenta</Link></li>
                            <li><Link to="/cart" className="text-gray-400 hover:text-white transition">Carrito</Link></li>
                        </ul>
                    </div>

                    {/* Columna 3: Contacto */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Contáctanos</h4>
                        <p className="text-gray-400 mb-2">📍 San Salvador, El Salvador</p>
                        <p className="text-gray-400 mb-2">📱 +503 7000-0000</p>
                        <p className="text-gray-400">✉️ hola@rexbakes.com</p>
                    </div>

                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Rex Bakes. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}