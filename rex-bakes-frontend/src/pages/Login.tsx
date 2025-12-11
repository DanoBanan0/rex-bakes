import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login(formData);
            navigate('/');
        } catch (err) {
            setError('Credenciales incorrectas o error de servidor.')
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-white">
            <div className="w-full max-w-md p-10">

                {/* Encabezado con fuente Serif */}
                <div className="text-center mb-10">
                    <h2 className="font-serif text-4xl font-bold text-elegant-black mb-2">
                        Bienvenido
                    </h2>
                    <p className="text-gray-400 text-sm">Ingresa a tu cuenta para continuar</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-elegant-black text-xs font-bold uppercase tracking-wider mb-2 ml-1">
                            Correo Electrónico
                        </label>
                        <input
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:bg-white focus:border-pistachio focus:ring-1 focus:ring-pistachio transition-all"
                            type="text"
                            placeholder="tu@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2 ml-1">
                            <label htmlFor="password" className="block text-elegant-black text-xs font-bold uppercase tracking-wider">
                                Contraseña
                            </label>
                            <a href="#" className="text-xs text-gray-400 hover:text-pistachio-dark">¿Olvidaste tu contraseña?</a>
                        </div>
                        <input
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:bg-white focus:border-pistachio focus:ring-1 focus:ring-pistachio transition-all"
                            type="password"
                            placeholder="******"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button
                        className="w-full bg-elegant-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition duration-300 shadow-lg transform active:scale-95"
                        type="submit"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500">
                    ¿Aún no tienes cuenta?{' '}
                    <Link to="/register" className="text-pistachio-dark font-bold hover:text-elegant-black hover:underline transition">
                        Regístrate aquí
                    </Link>
                </p>
            </div>
        </div>
    );
}