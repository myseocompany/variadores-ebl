import { useState, ChangeEvent, FormEvent } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { buildConfirmationUrl, buildCrmTrackingPayload, getTrackingParams } from '../utils/tracking';

export default function HeaderLead() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const leadsEndpoint = import.meta.env.VITE_CRM_LEADS_ENDPOINT as string | undefined;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!leadsEndpoint) {
      setError(
        'No se encontró la configuración del endpoint del CRM. Verifica la variable de entorno VITE_CRM_LEADS_ENDPOINT.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const trackingParams = getTrackingParams();
      const trackingPayload = buildCrmTrackingPayload(trackingParams);

      const response = await fetch(leadsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          telefono: formData.telefono,
          ...trackingPayload,
          origen: 'cta_superior',
          source_id: 7,
          project_id: 3
        })
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody?.message || 'No fue posible registrar la solicitud en el CRM.');
      }

      setSubmitted(true);
      window.location.assign(buildConfirmationUrl(import.meta.env.BASE_URL, trackingParams));
      return;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al enviar la solicitud.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <header className="border-b border-slate-200 relative overflow-hidden">
      {/* Logo superior */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-3 sm:gap-6 flex-nowrap">
            <img
              src={`${import.meta.env.BASE_URL}img/logo-electricas-bogota.png`}
              alt="Eléctricas Bogotá"
              className="h-auto w-[42%] max-w-[180px] sm:w-auto sm:h-12 shrink-0"
              loading="lazy"
            />
            <img
              src="https://www.invertekdrives.com/img/common/logos/optidrive.svg"
              alt="Optidrive"
              className="h-auto w-[52%] max-w-[220px] sm:w-auto sm:h-14 shrink-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Hero principal */}
      <div className="bg-brand-dark text-white relative">


        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-10 lg:flex-row lg:items-start relative z-10">
          {/* Texto principal */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Variadores de Frecuencia Invertek Optidrive
            </h1>
            <h2 className="text-lg font-medium mb-4 text-brand-soft">
              Trifásicos y monofásicos – modelos E3, P2, ECO y Elevator
            </h2>
            <p className="text-xl text-slate-300 mb-6 max-w-2xl">
              Compra variadores de frecuencia Invertek Optidrive en Colombia con soporte técnico especializado de
              Electricas Bogotá.
            </p>
            <ul className="text-lg text-slate-300 mb-8 space-y-3 max-w-xl">
              <li className="flex items-start gap-3">
                <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-[#FF5100] shrink-0"></span>
                <span>Entrega inmediata en Colombia</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-[#FF5100] shrink-0"></span>
                <span>Asesoría técnica especializada</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-[#FF5100] shrink-0"></span>
                <span>Control preciso para motores industriales</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-[#FF5100] shrink-0"></span>
                <span>Ahorro energético, comparado con otras tecnologías hasta 30%</span>
              </li>
            </ul>
          </div>

          {/* Formulario */}
          <div className="w-full lg:w-[380px]">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 shadow-xl relative z-20">
              {submitted ? (
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3 text-brand-soft" />
                  <h2 className="text-xl font-semibold">¡Solicitud enviada!</h2>
                  <p className="text-slate-200 mt-2">
                    Un asesor se comunicará contigo en minutos para ayudarte a seleccionar el variador ideal.
                  </p>
                </div>
              ) : (
                <form id="cotizacion-rapida" onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-slate-100 mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-white/20 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-brand"
                      placeholder="María Gómez"
                    />
                  </div>

                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-slate-100 mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      required
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-white/20 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-brand"
                      placeholder="+57 300 123 4567"
                    />
                  </div>

                  {error && (
                    <p className="rounded-lg border border-red-300 bg-red-100/90 px-4 py-3 text-sm text-red-800">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF5100] px-6 py-3 font-semibold text-white transition hover:bg-[#e64a00] disabled:cursor-not-allowed disabled:bg-[#FF5100]/60"
                  >
                    <Send size={18} />
                    {isSubmitting ? 'Enviando...' : 'Cotizar variador'}
                  </button>
                </form>
              )}
            </div>
            <div className="mt-4 px-1">
              <ul className="space-y-1.5 text-xs text-slate-200/75">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-[11px] text-[#FF5100]/80">✔</span>
                  <span>Distribuidor especializado Invertek en Colombia</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-[11px] text-[#FF5100]/80">✔</span>
                  <span>Más de 40 años en automatización industrial</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-[11px] text-[#FF5100]/80">✔</span>
                  <span>Soporte técnico certificado</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
