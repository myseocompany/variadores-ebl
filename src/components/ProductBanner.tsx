export function ProductBanner() {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col items-center justify-center">
        <img
          src="https://www.invertekdrives.com/img/content/drives/overview/banner-vfd.png"
          alt="Línea de Variadores de Frecuencia Invertek Optidrive E3, P2, ECO y Elevator"
          className="w-full max-w-5xl h-auto object-contain"
          loading="lazy"
        />
        <p className="text-slate-700 mt-4 text-center text-sm md:text-base">
          Línea completa de variadores de frecuencia <strong>Invertek Optidrive</strong> — rendimiento, eficiencia y confiabilidad para todo tipo de aplicación industrial.
        </p>
      </div>
    </section>
  );
}
