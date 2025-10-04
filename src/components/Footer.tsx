import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Eléctricas Bogotá Ltda</h3>
            <p className="text-slate-300 mb-6">
              Distribuidor autorizado de Invertek Drives en Colombia. Especialistas en variadores de frecuencia y automatización industrial.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Contáctanos</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand mt-1 flex-shrink-0" />
                <p className="text-slate-300 text-sm">
                  Carrera 12 # 16-73, Bogotá D.C., Colombia
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand flex-shrink-0" />
                <a href="tel:+5716012345" className="text-slate-300 text-sm hover:text-brand-light transition">
                  +57 (601) 234 5678
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-brand flex-shrink-0" />
                <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" className="text-slate-300 text-sm hover:text-brand-light transition">
                  WhatsApp: +57 300 123 4567
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand flex-shrink-0" />
                <a href="mailto:ventas@electricasbogota.com" className="text-slate-300 text-sm hover:text-brand-light transition">
                  ventas@electricasbogota.com
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6">
          <p className="text-slate-400 text-xs text-center">
            © {new Date().getFullYear()} Eléctricas Bogotá Ltda. Todos los derechos reservados.
            Tus datos personales son tratados conforme a nuestra política de privacidad y la Ley 1581 de 2012.
          </p>
        </div>
      </div>
    </footer>
  );
}
