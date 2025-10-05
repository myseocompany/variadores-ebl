import { useState } from 'react';
import { FileText } from 'lucide-react';

const products = [
  {
    name: 'Optidrive E3',
    description:
      'Variador de propósito general, compacto y de fácil configuración. Diseñado para aplicaciones estándar en motores trifásicos o monofásicos. Su interfaz intuitiva y rápida puesta en marcha lo hacen ideal para instalaciones simples.',
    features: [
      'Rango de potencia: 0.5–30 HP (0.37–22 kW)',
      'Tensiones: 110 V, 220 V y 440 V',
      'Salida trifásica y versiones monofásicas',
      'Configuración rápida y fiable',
    ],
    video: 'https://www.youtube.com/embed/xvS_y0CoXos?start=33&end=60',
  },
  {
    name: 'Optidrive P2',
    description:
      'Variador de altas prestaciones con control vectorial avanzado. Incluye PLC integrado y ajuste de curva de torque para máxima precisión y respuesta dinámica en aplicaciones industriales exigentes.',
    features: [
      'Rango de potencia: 1–350 HP (0.75–250 kW)',
      'Tensiones: 220 V y 440 V trifásicas',
      'Control vectorial de alto desempeño',
      'PLC integrado y curvas de torque programables',
    ],
    video: 'https://www.youtube.com/embed/xvS_y0CoXos?start=60&end=87',
  },
  {
    name: 'Optidrive ECO',
    description:
      'Variador especializado en sistemas de bombeo. Integra funciones inteligentes que protegen y optimizan el funcionamiento de bombas múltiples, reduciendo el consumo energético y el mantenimiento.',
    features: [
      'Rango de potencia: 0.5–350 HP (0.37–250 kW)',
      'Tensiones: 220 V y 440 V monofásicas o trifásicas',
      'Detección de fugas, arranque en seco y alternancia de bombas',
      'Alta eficiencia energética y control automático',
    ],
    video: 'https://www.youtube.com/embed/xvS_y0CoXos?start=87&end=122',
  },
  {
    name: 'Optidrive Elevator',
    description:
      'Variador diseñado para sistemas de elevación y ascensores. Ofrece arranques y frenados suaves con curvas tipo S, control preciso del freno eléctrico y opciones de rescate y realimentación por encoder.',
    features: [
      'Rango de potencia: 0.5–50 HP (0.37–37 kW)',
      'Tensiones: 220 V y 440 V mono/trifásicas',
      'PLC integrado y control vectorial de bucle cerrado',
      'Cumple normas EN81 y EMC para seguridad y confort',
    ],
    video: 'https://www.youtube.com/embed/xvS_y0CoXos?start=123&end=160',
  },
];

export default function Products() {
  const [loadedVideos, setLoadedVideos] = useState<number[]>([]);

  // función para cargar el video solo cuando entra en el viewport
  const handleIntersection = (index: number, entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      setLoadedVideos((prev) => [...new Set([...prev, index])]);
    }
  };

  // hook personalizado de observación
  const observeVideo = (el: HTMLElement | null, index: number) => {
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => handleIntersection(index, entry));
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-slate-900">
          Modelos de Variadores de Frecuencia Invertek Optidrive
        </h2>
        <p className="text-center text-slate-600 mb-12">
          Mira en acción los variadores de frecuencia <strong>Invertek</strong> y elige el ideal para tu aplicación.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {products.map((product, index) => (
            <div
              key={index}
              ref={(el) => observeVideo(el, index)}
              className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                {loadedVideos.includes(index) ? (
                  <iframe
                    className="w-full h-full"
                    src={product.video}
                    title={product.name}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img
                    src={`https://img.youtube.com/vi/${product.video.split('/embed/')[1].split('?')[0]}/hqdefault.jpg`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>

              <h3 className="font-bold text-xl mb-3 text-slate-900">{product.name}</h3>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">{product.description}</p>

              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-brand rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
