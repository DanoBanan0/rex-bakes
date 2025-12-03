import { useDesserts } from "../hooks/useDesserts";

export default function Home() {
  const {
    desserts,
    loading,
    error
  } = useDesserts();

  if (loading) {
    return <div className="text-center p-10">Cargando delicias... 🍩</div>;
  }
  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>
  }



  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Nuestro menu
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {desserts.map((dessert) => (
          <div key={dessert.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            
            {/* Imagen */}
            <div className="h-48 w-full bg-gray-200">
              {dessert.image_url ? (
                <img
                  src={dessert.image_url}
                  alt={dessert.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">Sin imagen</div>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{dessert.name}</h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {dessert.description || "Sin descripción."}
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-pink-600 font-bold text-lg">
                  ${Number(dessert.price).toFixed(2)}
                </span>
                <span className="text-xs text-gray-500">Stock: {dessert.stock}</span>
              </div>
            </div>




          </div>
        ))}
      </div>
    </div>
  );
}