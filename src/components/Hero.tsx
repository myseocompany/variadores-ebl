import { Phone } from 'lucide-react';

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById('cotizacion')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-br from-brand-light to-brand-dark text-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1>Variadores de Frecuencia Trifásicos y Monofásicos Invertek Optidrive E3, P2, ECO y Elevator</h1>

          <p className="text-xl text-slate-300 mb-8">
            Control preciso de motores trifásicos y monofásicos.
Variadores de frecuencia e inversores Optidrive con eficiencia energética hasta 30%. Soporte técnico certificado en Colombia.
          </p>
          <button
            onClick={scrollToForm}
            className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors inline-flex items-center gap-2"
          >
            <Phone size={20} />
            Cotiza tu variador ahora
          </button>
          <p className="text-sm text-slate-400 mt-3">
            Responde un ingeniero en menos de 1 hora
          </p>
        </div>
        <div className="relative">
          <div className="bg-gradient-to-br from-brand-light to-brand-dark rounded-2xl p-8 shadow-2xl">
            <div className="bg-white rounded-lg p-6 text-slate-900">
              <div className="text-center">
                <div className="text-6xl font-bold text-brand mb-2">30%</div>
                <div className="text-lg font-medium">Ahorro energético</div>
                <div className="text-sm text-slate-600 mt-4">
                  Control trifásico y monofásico
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
