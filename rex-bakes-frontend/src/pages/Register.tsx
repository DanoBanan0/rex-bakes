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
            navigate('/');
        } catch (err) {
            setError('Error al registrarse. El correo podría estar en uso.');
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-white">
            <div className="w-full max-w-md p-10">

                <div className="text-center mb-10">
                    <h2 className="font-serif text-4xl font-bold text-elegant-black mb-2">
                        Crear Cuenta
                    </h2>
                    <p className="text-gray-400 text-sm">Únete a nuestra comunidad dulce</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Nombre */}
                    <div>
                        <label className="block text-elegant-black text-xs font-bold uppercase tracking-wider mb-2 ml-1">
                            Nombre Completo
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:bg-white focus:border-pistachio focus:ring-1 focus:ring-pistachio transition-all"
                            placeholder="Ej. Juan Pérez"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-elegant-black text-xs font-bold uppercase tracking-wider mb-2 ml-1">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:bg-white focus:border-pistachio focus:ring-1 focus:ring-pistachio transition-all"
                            placeholder="juan@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-elegant-black text-xs font-bold uppercase tracking-wider mb-2 ml-1">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:bg-white focus:border-pistachio focus:ring-1 focus:ring-pistachio transition-all"
                                placeholder="******"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                minLength={6}
                            />
                        </div>

                        {/* Password Confirmation */}
                        <div>
                            <label className="block text-elegant-black text-xs font-bold uppercase tracking-wider mb-2 ml-1">
                                Confirmar
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:bg-white focus:border-pistachio focus:ring-1 focus:ring-pistachio transition-all"
                                placeholder="******"
                                value={formData.password_confirmation}
                                onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-elegant-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition duration-300 shadow-lg transform active:scale-95 mt-4"
                    >
                        Registrarse
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="text-pistachio-dark font-bold hover:text-elegant-black hover:underline transition">
                        Ingresa aquí
                    </Link>
                </p>
            </div>
        </div>
    );
}