
export default function AuthHero() {
    return (
        <div className="hidden lg:flex w-1/2 relative bg-zinc-100 overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop"
                alt="Cafetería minimalista"
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-liner-to-t from-zinc-900/80 via-zinc-900/20 to-transparent" />

            <div className="relative z-10 flex flex-col justify-end p-16 w-full text-white">
                <h2 className="text-4xl font-semibold mb-3 tracking-tight">
                    Sistema Central
                </h2>
                <p className="text-zinc-200 max-w-md text-lg font-light">
                    Gestión eficiente de inventario, punto de venta y operaciones para tu sucursal.
                </p>
            </div>
        </div>
    );
}