import api from './api';
import type { Dessert } from '../types';

// Obtener lista pública
export const getDesserts = async () => {
    const response = await api.get<Dessert[]>('/desserts');
    return response.data;
};

// --- FUNCIONES DE ADMINISTRADOR ---

// Crear un postre nuevo (Recibe FormData por la imagen)
export const createDessert = async (formData: FormData) => {
    const response = await api.post('/desserts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

// Editar un postre
export const updateDessert = async (id: number, formData: FormData) => {
    // Truco de Laravel: Para subir archivos en una edición, 
    // es mejor usar POST enviando el campo "_method": "PUT" dentro del form data.
    formData.append('_method', 'PUT');

    const response = await api.post(`/desserts/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

// Eliminar un postre
export const deleteDessert = async (id: number) => {
    await api.delete(`/desserts/${id}`);
};