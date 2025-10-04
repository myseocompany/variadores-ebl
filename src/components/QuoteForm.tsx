import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    telefono: '',
    correo: '',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const leadsEndpoint = import.meta.env.VITE_CRM_LEADS_ENDPOINT as string | undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          empresa: formData.empresa,
          telefono: formData.telefono,
          correo: formData.correo,
          mensaje: formData.mensaje
        })
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody?.message || 'No fue posible registrar la solicitud en el CRM.');
      }

      setSubmitted(true);
      setFormData({ nombre: '', empresa: '', telefono: '', correo: '', mensaje: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al enviar la solicitud.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="cotizacion" className="py-16 px-6 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Solicita tu cotización sin compromiso
          </h2>
          <p className="text-slate-300">
            Completa el formulario y un ingeniero especializado te contactará en menos de 1 hora para asesorarte
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-900 mb-2">¡Cotización recibida!</h3>
            <p className="text-green-800">
              Gracias por tu interés. Un ingeniero se pondrá en contacto contigo muy pronto.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-xl">
            {error && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                  placeholder="Juan Pérez"
                />
              </div>
              <div>
                <label htmlFor="empresa" className="block text-sm font-medium text-slate-700 mb-2">
                  Empresa *
                </label>
                <input
                  type="text"
                  id="empresa"
                  name="empresa"
                  required
                  value={formData.empresa}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                  placeholder="Industrias S.A."
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-slate-700 mb-2">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  required
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                  placeholder="+57 300 123 4567"
                />
              </div>
              <div>
                <label htmlFor="correo" className="block text-sm font-medium text-slate-700 mb-2">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  required
                  value={formData.correo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                  placeholder="correo@empresa.com"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="mensaje" className="block text-sm font-medium text-slate-700 mb-2">
                Cuéntanos sobre tu proyecto
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                value={formData.mensaje}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Potencia del motor, aplicación, cantidad requerida..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              <Send size={20} />
              {isSubmitting ? 'Enviando...' : 'Quiero mi cotización'}
            </button>

            <p className="text-xs text-slate-500 mt-4 text-center">
              Al enviar este formulario aceptas nuestra política de privacidad. Tus datos serán tratados de forma confidencial.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
