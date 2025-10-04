import { Cpu, Gauge, Leaf, FileText } from 'lucide-react';

const products = [
  {
    icon: Cpu,
    name: 'Optidrive E3',
    description: 'Variador compacto y fácil de configurar. Ideal para aplicaciones estándar con motores trifásicos y monofásicos. Interface intuitiva y puesta en marcha rápida.',
    features: ['0.37 a 22 kW', 'Configuración simple', 'Alta confiabilidad']
  },
  {
    icon: Gauge,
    name: 'Optidrive P2',
    description: 'Alto rendimiento y control de torque avanzado. Diseñado para aplicaciones industriales exigentes que requieren precisión y respuesta dinámica superior.',
    features: ['0.75 a 250 kW', 'Control vectorial', 'Protecciones avanzadas']
  },
  {
    icon: Leaf,
    name: 'Optidrive ECO',
    description: 'Máxima eficiencia energética para bombas y ventiladores. Optimiza el consumo en aplicaciones HVAC y sistemas de agua con retorno de inversión acelerado.',
    features: ['0.75 a 250 kW', 'Ahorro hasta 30%', 'ROI rápido']
  }
];

export default function Products() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-slate-900">
          Modelos disponibles
        </h2>
        <p className="text-center text-slate-600 mb-12">
          Selecciona el variador de frecuencia ideal para tu aplicación industrial
        </p>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <div key={index} className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-600 rounded-lg mb-4">
                <product.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-slate-900">{product.name}</h3>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">{product.description}</p>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a
            href="#cotizacion"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <FileText size={20} />
            Descargar catálogo PDF
          </a>
        </div>
      </div>
    </section>
  );
}
