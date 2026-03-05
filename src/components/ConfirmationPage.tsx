import { CheckCircle } from 'lucide-react';

export default function ConfirmationPage() {
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
          className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-brand-dark"
        >
          Volver al inicio
        </a>
      </div>
    </main>
  );
}
