import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await register(formData);
            // Si el registro es exitoso, el AuthContext auto-inicia sesión
            // así que redirigimos directo al menú
            navigate('/');
        } catch (err) {
            setError('Error al registrarse. El correo podría estar en uso.');
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-100">

                <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
                    Crear Cuenta
                </h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Nombre */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Nombre Completo
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                            placeholder="Ej. Juan Pérez"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                            placeholder="juan@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                            placeholder="******"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            minLength={6}
                        />
                    </div>

                    {/* Password Confirmation */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Confirmar Contraseña
                        </label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                            placeholder="******"
                            value={formData.password_confirmation}
                            onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                            required
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300"
                    >
                        Registrarse
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="text-green-600 hover:underline font-bold">
                        Ingresa aquí
                    </Link>
                </p>
            </div>
        </div>
    );
}