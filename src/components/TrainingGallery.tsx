import { useState } from "react";

type Video = {
  id: string;
  title: string;
};

export default function TrainingGallery() {
  const videos: Video[] = [
    { id: "xvS_y0CoXos", title: "Variadores de Velocidad: Modelos y familias Invertek" },
    { id: "LWSWUohPUD8", title: "Cómo programar un variador de velocidad en solo 8 minutos" },
    { id: "cM2fOCdKBeM", title: "Configuración de variador con potenciómetro | Tutorial" },
    { id: "y-Az1bHh_RU", title: "Configuración de variador con Start/Stop | Tutorial" },
    { id: "yQRInw0odAI", title: "Configuración de reinicio automático de un variador | Tutorial" },
    { id: "BEh1UDvylR8", title: "Variador Invertek: control ideal para sistemas de elevación" },
    { id: "ayrqaT44JDk", title: "Comunicación Modbus RTU entre PLC Xinje y variador (Parte 1)" },
    { id: "gjDjE7k9Pak", title: "Comunicación Modbus RTU entre PLC Xinje y variador (Parte 2)" },
    { id: "IF8qssuZZLQ", title: "Selección de velocidades fijas en un variador | Tutorial" },
    { id: "E7wAuYWzZXo", title: "Modo Standby/Hibernación en un variador | Tutorial" },
    { id: "ewRQbcCf5eE", title: "Variadores para aplicaciones solares en sistemas de bombeo" },
    { id: "O8ieJyWXwk4", title: "Variadores de frecuencia especializados en bombeo" },
    { id: "r18rcLZta7c", title: "Variadores de velocidad para sistemas de bombeo | Optidrive ECO" },
    { id: "1iNLZ39hZ5I", title: "Variadores de frecuencia IP66 / NEMA 4X | Protección avanzada" },
    { id: "4e6Sms3-ry0", title: "Genialidades de los variadores de frecuencia | Capacitación técnica" },
  ];

  // 👇 Se especifica el tipo del estado explícitamente
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-900">
          Capacitaciones técnicas de Eléctricas Bogotá en Invertek
        </h2>
        <p className="text-slate-600 mb-10 max-w-3xl mx-auto">
          Aprende directamente con nuestros ingenieros. Explora los videos de formación donde
          explicamos el uso, configuración y mantenimiento de los variadores{" "}
          <strong>Invertek Optidrive</strong>.
        </p>

        {/* Galería de miniaturas */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {videos.map((video, index) => (
            <button
              key={index}
              onClick={() => setSelectedVideo(video)}
              className="group relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
                className="w-full aspect-video object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold px-2 text-center">
                {video.title}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal para reproducir el video */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="bg-black rounded-xl overflow-hidden shadow-2xl w-full max-w-3xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-xl font-bold mb-3 text-slate-900">
          Variadores de Frecuencia Trifásicos y Monofásicos en Colombia
        </h3>
        <p className="text-slate-600">
          En <strong>Eléctricas Bogotá</strong> encontrarás <strong>variadores de frecuencia Invertek Optidrive E3 y P2</strong>,
          así como <strong>inversores y reguladores de frecuencia</strong> para motores eléctricos industriales.
          Disponibles en versiones <strong>trifásicas y monofásicas</strong>, ideales para control de torque,
          bombas, ventiladores y sistemas de automatización.
        </p>
      </div>
    </section>
  );
}
