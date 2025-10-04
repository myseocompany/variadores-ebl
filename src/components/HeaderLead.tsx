import { useState, ChangeEvent, FormEvent } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function HeaderLead() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: ''
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
      const response = await fetch(leadsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          telefono: formData.telefono,
          correo: formData.correo,
          origen: 'cta_superior'
        })
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody?.message || 'No fue posible registrar la solicitud en el CRM.');
      }

      setSubmitted(true);
      setFormData({ nombre: '', telefono: '', correo: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al enviar la solicitud.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <header className="border-b border-slate-200">
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <img
            src="https://www.invertekdrives.com/img/common/logos/invertekdrives-sdt-logo.svg"
            alt="Invertek Drives"
            className="h-10 w-auto"
            loading="lazy"
          />
        </div>
      </div>

      <div className="bg-brand-dark text-white">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
              <img
                src="https://www.invertekdrives.com/img/common/logos/optidrive-p2-white.svg"
                alt="Optidrive P2"
                className="h-14 w-auto mb-4 sm:mb-0"
                loading="lazy"
              />
              <div>
                <h1 className="text-3xl font-semibold">Variadores Optidrive P2</h1>
                <p className="text-slate-200 mt-3 max-w-xl">
                  Rendimiento premium para aplicaciones industriales exigentes. Integración sencilla, protecciones avanzadas y
                  soporte certificado en Colombia.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[380px]">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 shadow-xl">
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

                  <div>
                    <label htmlFor="correo" className="block text-sm font-medium text-slate-100 mb-1">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="correo"
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-white/20 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-brand"
                      placeholder="contacto@empresa.com"
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
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-brand/60"
                  >
                    <Send size={18} />
                    {isSubmitting ? 'Enviando...' : 'Quiero asesoría inmediata'}
                  </button>

                  <p className="text-xs text-slate-300">
                    También puedes llamarnos al <span className="font-semibold text-white">+57 601 123 4567</span> para
                    atención inmediata.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
