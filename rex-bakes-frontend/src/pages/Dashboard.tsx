import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDesserts, createDessert, updateDessert, deleteDessert } from '../services/dessertService';
import type { Dessert } from '../types';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();

    // Estados para la lista
    const [desserts, setDesserts] = useState<Dessert[]>([]);
    const [loading, setLoading] = useState(true);

    // Estados para el Formulario (Crear/Editar)
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingDessert, setEditingDessert] = useState<Dessert | null>(null);

    // Datos del formulario
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Referencia para limpiar el input de archivo
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 1. Cargar postres al entrar
    useEffect(() => {
        if (!isAdmin) {
            navigate('/'); // Sacar si no es admin
            return;
        }
        loadData();
    }, [isAdmin, navigate]);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await getDesserts();
            setDesserts(data);
        } catch (error) {
            console.error("Error cargando postres", error);
        } finally {
            setLoading(false);
        }
    };

    // 2. Preparar formulario para CREAR
    const handleOpenCreate = () => {
        setEditingDessert(null);
        setName('');
        setDescription('');
        setPrice('');
        setStock('');
        setImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setIsFormOpen(true);
    };

    // 3. Preparar formulario para EDITAR
    const handleOpenEdit = (dessert: Dessert) => {
        setEditingDessert(dessert);
        setName(dessert.name);
        setDescription(dessert.description || '');
        setPrice(dessert.price.toString());
        setStock(dessert.stock.toString());
        setImageFile(null); // La imagen no se cambia a menos que suban otra
        setIsFormOpen(true);
    };

    // 4. Guardar (Crear o Actualizar)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !price || !stock) return alert("Nombre, Precio y Stock son obligatorios");

        // Creamos el 'sobre' FormData para enviar archivos
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock', stock);

        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            if (editingDessert) {
                // MODO EDITAR
                await updateDessert(editingDessert.id, formData);
                alert("Postre actualizado correctamente");
            } else {
                // MODO CREAR
                await createDessert(formData);
                alert("Postre creado correctamente");
            }

            setIsFormOpen(false);
            loadData(); // Recargar lista
        } catch (error) {
            console.error(error);
            alert("Error al guardar el postre");
        }
    };

    // 5. Eliminar
    const handleDelete = async (id: number) => {
        if (window.confirm("¿Estás seguro de borrar este postre?")) {
            try {
                await deleteDessert(id);
                loadData();
            } catch (error) {
                alert("Error al eliminar");
            }
        }
    };

    if (loading) return <div className="p-10 text-center">Cargando panel...</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">

            {/* Encabezado */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">⚙️ Gestión de Productos</h1>
                {!isFormOpen && (
                    <button
                        onClick={handleOpenCreate}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-bold shadow transition"
                    >
                        + Nuevo Postre
                    </button>
                )}
            </div>

            {/* MODO FORMULARIO */}
            {isFormOpen ? (
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-w-2xl mx-auto">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">
                        {editingDessert ? 'Editar Postre' : 'Crear Nuevo Postre'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700">Nombre</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border p-2 rounded" required />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700">Descripción</label>
                            <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border p-2 rounded" rows={3} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700">Precio ($)</label>
                                <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="w-full border p-2 rounded" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700">Stock (Cantidad)</label>
                                <input type="number" value={stock} onChange={e => setStock(e.target.value)} className="w-full border p-2 rounded" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700">Imagen</label>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)}
                                className="w-full border p-2 rounded"
                            />
                            <p className="text-xs text-gray-500 mt-1">Deja vacío si no quieres cambiar la imagen actual.</p>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={() => setIsFormOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="bg-pink-600 text-white px-6 py-2 rounded font-bold hover:bg-pink-700"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            ) : (

                /* MODO TABLA (LISTA) */
                <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {desserts.map((dessert) => (
                                <tr key={dessert.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {dessert.image_url ? (
                                            <img src={dessert.image_url} alt="" className="h-10 w-10 rounded-full object-cover" />
                                        ) : (
                                            <span className="text-gray-400 text-xs">Sin foto</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{dessert.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">${Number(dessert.price).toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${dessert.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {dessert.stock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleOpenEdit(dessert)} className="text-indigo-600 hover:text-indigo-900 mr-4">Editar</button>
                                        <button onClick={() => handleDelete(dessert.id)} className="text-red-600 hover:text-red-900">Borrar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}