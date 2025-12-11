import heroImage from '../assets/rexbakes.png';

export default function Hero() {
    const scrollToMenu = () => {
        document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        // Fondo blanco puro, altura ajustada, contenido centrado a la izquierda
        <div className="relative py-20 md:py-32 bg-white overflow-hidden">

            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

                {/* Texto del Hero */}
                <div className="md:w-1/2 flex flex-col items-start z-10">
                    <span className="inline-block px-3 py-1 mb-6 bg-pastel-pink text-elegant-dark text-xs font-bold uppercase tracking-wider rounded-full">
                        Repostería Artesanal
                    </span>

                    {/* Título gigante y elegante */}
                    <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-elegant-dark leading-tight">
                        Dulces <br />
                        Momentos, <br />
                        Sabores <span className="text-pistachio-dark">Reales.</span>
                    </h1>

                    <p className="text-lg text-elegant mb-10 max-w-lg leading-relaxed">
                        Una fusión minimalista de técnicas clásicas y sabores modernos. Descubre la armonía en cada bocado jurásico.
                    </p>

                    {/* Botones estilo "pill" (pastilla) */}
                    <div className="flex gap-4">
                        <button onClick={scrollToMenu} className="bg-transparent border-2 border-pistachio text-elegant-dark text-base font-bold py-3 px-8 rounded-full hover:bg-pistachio transition">
                            Ver Delicias
                        </button>
                    </div>
                </div>

                {/* Imagen Decorativa (Placeholder estilo referencia) */}
                <div className="md:w-1/2 relative h-full w-full flex justify-center">
                    {/* Contenedor de la imagen:
                    - Quitamos el 'bg-gray-100' fuerte y ponemos un 'bg-gray-50' muy suave o 'bg-transparent'.
                    - Mantenemos la altura fija y las esquinas redondeadas.
                 */}
                    <div className="w-full h-[400px] md:h-[500px] rounded-[40px] shadow-soft relative overflow-hidden p-3">
                        <img
                            src={heroImage} // Tu imagen importada
                            alt="Postre Hero"
                            // CAMBIO CLAVE: 'object-cover' -> 'object-contain'
                            // Esto hace que la imagen entera quepa dentro sin cortarse.
                            className="w-full h-full object-contain hover:scale-105 transition duration-700"
                        />
                    </div>
                    {/* Elemento decorativo detrás (opcional) */}
                    <div className="absolute -z-10 top-10 -right-10 w-3/4 h-3/4 bg-pistachio/20 rounded-full blur-3xl"></div>
                </div>

            </div>
        </div>
    );
}