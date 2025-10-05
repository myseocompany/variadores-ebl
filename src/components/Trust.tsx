import { Building2, Wrench, MapPin } from 'lucide-react';

export default function ValueAdd() {
  return (
    <section className="py-16 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
          Eléctricas Bogotá: Tu aliado en automatización industrial
        </h2>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Video institucional */}
          <div className="w-full">
            <div className="aspect-[16/9] max-h-[340px] rounded-xl overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/hhuZ0YVKUJQ?start=119"
                title="Eléctricas Bogotá - Video institucional"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Cards de valor */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-5 shadow-sm text-left">
              <Building2 className="w-10 h-10 text-brand mb-3" />
              <h3 className="font-bold text-base mb-2 text-slate-900">
                Más de 40 años de experiencia
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Desde 1980 suministrando soluciones eléctricas e industriales a empresas
                colombianas. Trayectoria comprobada en el sector.
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm text-left">
              <Wrench className="w-10 h-10 text-brand mb-3" />
              <h3 className="font-bold text-base mb-2 text-slate-900">
                Asesoría técnica especializada
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ingenieros certificados en automatización y control industrial. Te ayudamos a
                dimensionar y configurar tu variador de frecuencia.
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm text-left sm:col-span-2">
              <MapPin className="w-10 h-10 text-brand mb-3" />
              <h3 className="font-bold text-base mb-2 text-slate-900">
                Envíos a todo Colombia
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Despachos desde Bogotá con seguimiento en tiempo real. Cobertura nacional
                garantizada para tu tranquilidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
