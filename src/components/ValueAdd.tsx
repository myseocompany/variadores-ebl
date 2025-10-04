import { Building2, Wrench, MapPin } from 'lucide-react';

export default function ValueAdd() {
  return (
    <section className="py-16 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
          Eléctricas Bogotá: Tu aliado en automatización industrial
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <Building2 className="w-12 h-12 text-brand mb-4" />
            <h3 className="font-bold text-lg mb-3 text-slate-900">Más de 40 años de experiencia</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Desde 1980 suministrando soluciones eléctricas e industriales a empresas colombianas. Trayectoria comprobada en el sector.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <Wrench className="w-12 h-12 text-brand mb-4" />
            <h3 className="font-bold text-lg mb-3 text-slate-900">Asesoría técnica especializada</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Ingenieros certificados en automatización y control industrial. Te ayudamos a dimensionar y configurar tu variador de frecuencia.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <MapPin className="w-12 h-12 text-brand mb-4" />
            <h3 className="font-bold text-lg mb-3 text-slate-900">Envíos a todo Colombia</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Despachos desde Bogotá con seguimiento en tiempo real. Cobertura nacional garantizada para tu tranquilidad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
