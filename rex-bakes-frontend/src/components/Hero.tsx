export default function Hero() {
    const scrollToMenu = () => {
        const menuSection = document.getElementById('menu-section');
        if (menuSection) {
            menuSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative bg-gray-900 h-[60vh] flex items-center justify-center overflow-hidden">

            {/* Imagen de Fondo (Usamos una de stock de alta calidad de Unsplash) */}
            <img
                src="https://images.unsplash.com/photo-1559598467-f8b76c8155d0?q=80&w=2071&auto=format&fit=crop"
                alt="Postres Deliciosos"
                className="absolute w-full h-full object-cover opacity-50"
            />

            {/* Contenido (Texto) */}
            <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                    Dulces momentos en cada bocado 🍰
                </h1>
                <p className="text-xl text-gray-200 mb-8 font-light">
                    Postres artesanales hechos con amor. Desde los clásicos brownies hasta cheesecakes que te harán suspirar.
                </p>
                <button
                    onClick={scrollToMenu}
                    className="bg-pink-600 hover:bg-pink-700 text-white text-lg font-bold py-3 px-8 rounded-full shadow-xl transition transform hover:scale-105"
                >
                    Ver Menú
                </button>
            </div>

        </div>
    );
}