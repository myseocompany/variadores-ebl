import { Zap, Settings, Headphones, Truck } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'Ahorro energético, comparado con otras tecnologías hasta 30%',
    description: 'Reduce costos operativos optimizando el consumo de tus motores eléctricos industriales frente a otras tecnologías.'
  },
  {
    icon: Settings,
    title: 'Control preciso de motores',
    description: 'Compatible con motores trifásicos y monofásicos. Configuración simple y operación confiable.'
  },
  {
    icon: Headphones,
    title: 'Soporte técnico certificado',
    description: 'Soporte técnico especializado de Eléctricas Bogotá, con 43 años de experiencia en el sector.'
  },
  {
    icon: Truck,
    title: 'Entrega inmediata en Colombia',
    description: 'Stock permanente de los principales modelos. Envíos a todo el país con seguimiento.'
  }
];

export default function Benefits() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
          ¿Por qué elegir variadores Invertek Optidrive?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-soft rounded-full mb-4">
                <benefit.icon className="w-8 h-8 text-brand" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900">{benefit.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
