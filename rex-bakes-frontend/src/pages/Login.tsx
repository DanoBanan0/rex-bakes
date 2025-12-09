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
            setError('Credenciales incprrectas o error de servidor.')
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
                    Iniciar Sesion
                </h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Correo Electronico
                        </label>
                        <input
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500"
                            type="text"
                            placeholder="example@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Contraseña
                        </label>
                        <input
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500"
                            type="password"
                            placeholder="******"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button
                    className="w-full bg-pink-600 text-white font-bold py-2 px-4 rounded hover:bg-pink-700 transition duration-300"
                        type="submit"
                    >
                        Entrar
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/register" className="text-pink-600 hover:underline font-bold">
                        Registrate aqui
                    </Link>
                </p>
            </div>
        </div>
    );
}