import { useDesserts } from '../hooks/useDesserts';
import { useCart } from '../context/CartContext';
import Hero from '../components/Hero'; // <--- 1. Importar Hero

export default function Home() {
  const { desserts, loading, error } = useDesserts();
  const { addToCart } = useCart();

  if (loading) return <div className="text-center p-10">Cargando delicias... 🍩</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div>
      {/* 2. Poner el Hero aquí arriba */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* 3. Agregar el ID para que el botón baje hasta aquí */}
        <h1 id="menu-section" className="text-4xl font-bold text-gray-800 mb-10 text-center">
          Nuestro Menú 🧁
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* ... (El resto del código del mapa de postres sigue IGUAL) ... */}
          {desserts.map((dessert) => (
            /* ... código de las tarjetas ... */
            // (No borres el código de las tarjetas que ya tenías, solo copia la parte de arriba)
            <div key={dessert.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
              {/* ... contenido de la tarjeta ... */}
              {/* (Asegúrate de mantener tu código de tarjetas aquí) */}
              <div className="h-48 w-full bg-gray-200 relative">
                {dessert.image_url ? (
                  <img src={dessert.image_url} alt={dessert.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">Sin imagen</div>
                )}
                {dessert.stock < 5 && dessert.stock > 0 && (
                  <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full shadow">¡Quedan pocos!</span>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{dessert.name}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{dessert.description || "Sin descripción."}</p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <span className="text-pink-600 font-bold text-lg">${Number(dessert.price).toFixed(2)}</span>
                  <button
                    onClick={() => {
                      if (dessert.stock > 0) {
                        addToCart(dessert);
                        alert(`¡${dessert.name} agregado al carrito!`);
                      } else {
                        alert("Agotado");
                      }
                    }}
                    disabled={dessert.stock === 0}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${dessert.stock > 0 ? 'bg-pink-600 hover:bg-pink-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                  >
                    {dessert.stock > 0 ? '+ Agregar' : 'Agotado'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}