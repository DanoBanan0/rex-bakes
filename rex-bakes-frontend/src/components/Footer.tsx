export default function Footer() {
    return (
        <footer className="bg-elegant-black text-white py-20 mt-auto font-sans">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">

                {/* Marca */}
                <div>
                    <h3 className="font-serif text-3xl font-bold mb-6 flex items-center gap-2 text-pistachio">
                        Rex Bakes
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                        Repostería minimalista creada con pasión, ingredientes naturales y un toque de dulzura.
                    </p>
                </div>

                {/* Enlaces */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-raspberry-btn uppercase text-xs tracking-widest mb-2">Navegación</h4>
                    <a href="/" className="text-gray-400 hover:text-white transition text-sm">Inicio</a>
                    <a href="#menu-section" className="text-gray-400 hover:text-white transition text-sm">Nuestro Menú</a>
                    <a href="#" className="text-gray-400 hover:text-white transition text-sm">Ubicación</a>
                </div>

                {/* Redes */}
                <div>
                    <h4 className="font-bold text-raspberry-btn uppercase text-xs tracking-widest mb-6">Síguenos</h4>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-pistachio hover:text-elegant-black transition">IG</div>
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-pistachio hover:text-elegant-black transition">FB</div>
                    </div>
                </div>
            </div>

            <div className="mt-20 text-center text-white/20 text-xs border-t border-white/5 pt-8">
                &copy; 2025 Rex Bakes. Todos los derechos reservados.
            </div>
        </footer>
    );
}