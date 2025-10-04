import { Award, Shield, CheckCircle } from 'lucide-react';

export default function Trust() {
  return (
    <section className="py-12 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-center text-center">
          <div className="flex flex-col items-center">
            <Award className="w-12 h-12 text-orange-600 mb-3" />
            <p className="font-semibold text-slate-900">Distribuidor Autorizado</p>
            <p className="text-sm text-slate-600">Invertek Drives Colombia</p>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="w-12 h-12 text-orange-600 mb-3" />
            <p className="font-semibold text-slate-900">Certificación RETIE</p>
            <p className="text-sm text-slate-600">Cumplimiento normativo nacional</p>
          </div>
          <div className="flex flex-col items-center">
            <CheckCircle className="w-12 h-12 text-orange-600 mb-3" />
            <p className="font-semibold text-slate-900">40+ años de experiencia</p>
            <p className="text-sm text-slate-600">Eléctricas Bogotá Ltda</p>
          </div>
        </div>
        <div className="mt-12 bg-white border-l-4 border-orange-600 p-6 rounded-r-lg shadow-sm">
          <p className="text-slate-700 italic">
            "Como distribuidor autorizado de Invertek Drives, garantizamos productos originales, soporte técnico especializado y asesoría en automatización industrial para optimizar sus procesos."
          </p>
          <p className="text-sm font-semibold text-slate-900 mt-3">
            — Ingeniería Eléctricas Bogotá
          </p>
        </div>
      </div>
    </section>
  );
}
