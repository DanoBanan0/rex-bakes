import { useDesserts } from '../hooks/useDesserts';
import { useCart } from '../context/CartContext';
import Hero from '../components/Hero';

export default function Home() {
  const { desserts, loading, error } = useDesserts();
  const { addToCart } = useCart();

  if (loading) return <div className="min-h-screen flex items-center justify-center text-pistachio-dark font-bold animate-pulse">Cargando dulzura...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="bg-white">
      <Hero />

      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Título de Sección Elegante */}
        <h2 id="menu-section" className="font-serif text-4xl font-bold text-center text-elegant-dark mb-16">
          Nuestro Menú
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {desserts.map((dessert) => (
            // TARJETA ELEGANTE: Fondo blanco, sombra suave, muy redondeada
            <div key={dessert.id} className="group bg-white p-4 rounded-[32px] shadow-soft hover:shadow-lg transition-all duration-300">

              {/* Imagen: Fondo gris claro si no hay imagen, super redondeada */}
              <div className="relative h-64 bg-gray-100 rounded-[24px] overflow-hidden mb-6">
                {dessert.image_url ? (
                  <img src={dessert.image_url} alt={dessert.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                  </div>
                )}

                {/* Botón de carrito flotante (como en la referencia) */}
                <button
                  onClick={() => dessert.stock > 0 ? addToCart(dessert) : null}
                  disabled={dessert.stock === 0}
                  className={`absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95 ${dessert.stock > 0 ? 'bg-white text-elegant-dark hover:bg-pistachio' : 'bg-gray-200 text-gray-400'
                    }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                </button>
              </div>

              {/* Info minimalista */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-serif text-xl font-bold text-elegant-dark">{dessert.name}</h3>
                  <p className="text-sm text-elegant mt-1 line-clamp-2 h-10">{dessert.description}</p>
                </div>
                <div className="text-lg font-bold text-pistachio-dark">
                  ${Number(dessert.price).toFixed(2)}
                </div>
              </div>

              {dessert.stock === 0 && (
                <p className="text-red-400 text-xs font-bold mt-2 uppercase tracking-wider">Agotado</p>
              )}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}