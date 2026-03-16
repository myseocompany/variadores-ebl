import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

export default function ConfirmationPage() {
  useEffect(() => {
    const withGtag = window as Window & {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
    };

    withGtag.dataLayer = withGtag.dataLayer || [];
    if (!withGtag.gtag) {
      withGtag.gtag = (...args: unknown[]) => {
        withGtag.dataLayer?.push(args);
      };
    }

    withGtag.gtag('js', new Date());
    withGtag.gtag('config', 'AW-17690696505');
    withGtag.gtag('event', 'conversion', {
      send_to: 'AW-17690696505/XiHlCN6OiIUcELm2yvNB'
    });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-light to-brand-dark px-6 py-16">
      <div className="mx-auto max-w-2xl rounded-2xl border border-white/20 bg-white p-10 text-center shadow-2xl">
        <CheckCircle className="mx-auto mb-6 h-16 w-16 text-green-600" />
        <h1 className="mb-4 text-3xl font-bold text-slate-900">Datos enviados correctamente</h1>
        <p className="mb-8 text-slate-700">
          Gracias por tu solicitud. Un asesor se pondrá en contacto contigo muy pronto.
        </p>
        <a
          href="./"
          className="inline-flex items-center justify-center rounded-lg bg-[#FF5100] px-6 py-3 font-semibold text-white transition hover:bg-[#e64a00]"
        >
          Volver al inicio
        </a>
      </div>
    </main>
  );
}
