import { useState } from 'react';
import { ArrowRight, Gauge, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import {
  applicationProfiles,
  driveInventory,
  formatCurrency,
  formatHorsepower,
  formatVoltageRange,
  getRecommendedDrives,
  horsepowerOptions,
  voltageOptions,
  type ApplicationType,
  type DriveInventoryItem,
  type DriveSelectionInput,
  type SupplyPhase,
} from '../data/driveInventory';
import { dispatchQuotePrefill } from '../utils/quotePrefill';

const applicationOptions: Array<{ value: ApplicationType; title: string }> = [
  { value: 'general', title: 'Uso general' },
  { value: 'alto_rendimiento', title: 'Torque y precisión' },
  { value: 'bombeo', title: 'Bombeo' },
  { value: 'elevacion', title: 'Elevación' },
];

const seriesMeta = {
  E3: {
    label: 'Optidrive E3',
    badgeClass: 'border-amber-200 bg-amber-50 text-amber-900',
    reason: 'familia recomendada para aplicaciones estándar',
  },
  P2: {
    label: 'Optidrive P2',
    badgeClass: 'border-sky-200 bg-sky-50 text-sky-900',
    reason: 'familia recomendada para control exigente y alto desempeño',
  },
  ECO: {
    label: 'Optidrive ECO',
    badgeClass: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    reason: 'familia recomendada para bombeo y eficiencia energética',
  },
  ELEVADOR: {
    label: 'Optidrive Elevador',
    badgeClass: 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-900',
    reason: 'familia especializada para elevación y frenado',
  },
};

function phaseLabel(phase: SupplyPhase): string {
  return phase === 'MONOFASICO' ? 'Monofásica' : 'Trifásica';
}

function buildRecommendationReason(item: DriveInventoryItem, selection: DriveSelectionInput): string {
  const profile = applicationProfiles[selection.application];
  const preferredSeries = profile.preferredSeries[0];
  const fallbackNotice =
    item.series === preferredSeries
      ? seriesMeta[item.series].reason
      : `no hay una referencia ${seriesMeta[preferredSeries].label} exacta para esta combinación y esta es la alternativa eléctrica más cercana`;

  const enclosureNotice =
    selection.installation === 'expuesto' && (item.enclosure === 'IP55' || item.enclosure === 'IP66')
      ? ` La protección ${item.enclosure} ayuda en ambientes con polvo o humedad.`
      : '';

  return `Cubre ${formatHorsepower(selection.horsepower)} con alimentación ${phaseLabel(selection.supplyPhase).toLowerCase()} a ${selection.voltage} V y ${fallbackNotice}.${enclosureNotice}`;
}

function buildQuoteMessage(item: DriveInventoryItem, selection: DriveSelectionInput): string {
  const profile = applicationProfiles[selection.application];
  return `Modelo sugerido por simulador: ${item.sku} (${seriesMeta[item.series].label}), ${formatHorsepower(item.horsepower)}, ${phaseLabel(item.supplyPhase).toLowerCase()} ${formatVoltageRange(item)}, ${item.enclosure}, ${formatCurrency(item.price)}. Aplicación: ${profile.label}. Necesito validación técnica y cotización.`;
}

export default function DriveSelector() {
  const [selection, setSelection] = useState<DriveSelectionInput>({
    application: 'general',
    supplyPhase: 'MONOFASICO',
    voltage: 220,
    horsepower: 2,
    installation: 'tablero',
  });

  const recommendations = getRecommendedDrives(selection);
  const bestMatch = recommendations[0];
  const alternatives = recommendations.slice(1, 4);
  const activeProfile = applicationProfiles[selection.application];

  const handleSelectionChange = <Key extends keyof DriveSelectionInput,>(field: Key, value: DriveSelectionInput[Key]) => {
    setSelection((current) => ({ ...current, [field]: value }));
  };

  const handleQuoteClick = (item: DriveInventoryItem) => {
    dispatchQuotePrefill({ message: buildQuoteMessage(item, selection) });
    document.getElementById('cotizacion')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="simulador" className="bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-brand-light/30 bg-brand-light/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-soft">
            Simulador de selección
          </span>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Escoge el variador adecuado con inventario real de Invertek
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300">
            El simulador cruza fase de alimentación, tensión, potencia y tipo de aplicación con {driveInventory.length} referencias del inventario disponible.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.45)] backdrop-blur">
            <div className="grid gap-3 sm:grid-cols-2">
              {applicationOptions.map((option) => {
                const profile = applicationProfiles[option.value];
                const isActive = selection.application === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelectionChange('application', option.value)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      isActive
                        ? 'border-brand-light bg-brand-light/20 shadow-lg shadow-brand-dark/20'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-soft">
                      {option.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {profile.description}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-200">Alimentación disponible</span>
                <select
                  value={selection.supplyPhase}
                  onChange={(event) => handleSelectionChange('supplyPhase', event.target.value as SupplyPhase)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-brand-light focus:ring-2 focus:ring-brand-light/40"
                >
                  <option value="MONOFASICO">Monofásica</option>
                  <option value="TRIFASICO">Trifásica</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-200">Voltaje de entrada</span>
                <select
                  value={selection.voltage}
                  onChange={(event) => handleSelectionChange('voltage', Number(event.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-brand-light focus:ring-2 focus:ring-brand-light/40"
                >
                  {voltageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label} · {option.hint}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-200">Potencia del motor</span>
                <select
                  value={selection.horsepower}
                  onChange={(event) => handleSelectionChange('horsepower', Number(event.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-brand-light focus:ring-2 focus:ring-brand-light/40"
                >
                  {horsepowerOptions.map((horsepower) => (
                    <option key={horsepower} value={horsepower}>
                      {formatHorsepower(horsepower)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-6 rounded-3xl border border-brand-light/20 bg-gradient-to-br from-brand-dark/80 to-slate-900 p-5">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-brand-soft" />
                <p className="text-sm font-semibold tracking-[0.08em] text-brand-soft">
                  Beneficios
                </p>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                {activeProfile.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#FF5100]"></span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-6 text-slate-900 shadow-[0_32px_100px_rgba(15,23,42,0.35)]">
            {bestMatch ? (
              <>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-dark">
                      Recomendación principal
                    </p>
                    <h3 className="mt-2 text-2xl font-bold">{bestMatch.sku}</h3>
                  </div>
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${seriesMeta[bestMatch.series].badgeClass}`}>
                    {seriesMeta[bestMatch.series].label}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {buildRecommendationReason(bestMatch, selection)}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {phaseLabel(bestMatch.supplyPhase)}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {formatVoltageRange(bestMatch)}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {bestMatch.enclosure}
                  </span>
                  {bestMatch.hasFilter && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      Con filtro
                    </span>
                  )}
                  {bestMatch.hasBrakeTransistor && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      Transistor de freno
                    </span>
                  )}
                  {bestMatch.display !== 'SIN_DISPLAY' && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      Display {bestMatch.display}
                    </span>
                  )}
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                      <Zap className="h-4 w-4 text-brand" />
                      Potencia
                    </div>
                    <p className="mt-2 text-lg font-semibold">{formatHorsepower(bestMatch.horsepower)}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                      <Gauge className="h-4 w-4 text-brand" />
                      Corriente
                    </div>
                    <p className="mt-2 text-lg font-semibold">{bestMatch.current} A</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                      <ShieldCheck className="h-4 w-4 text-brand" />
                      Precio
                    </div>
                    <p className="mt-2 text-lg font-semibold">{formatCurrency(bestMatch.price)}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleQuoteClick(bestMatch)}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF5100] px-6 py-4 font-semibold text-white transition hover:bg-[#e64a00]"
                >
                  Llevar esta referencia a cotización
                  <ArrowRight className="h-5 w-5" />
                </button>

                {alternatives.length > 0 && (
                  <div className="mt-8 border-t border-slate-200 pt-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Alternativas compatibles
                    </p>
                    <div className="mt-4 space-y-3">
                      {alternatives.map((item) => (
                        <button
                          key={item.sku}
                          type="button"
                          onClick={() => handleQuoteClick(item)}
                          className="w-full rounded-2xl border border-slate-200 p-4 text-left transition hover:border-brand-light hover:bg-slate-50"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <p className="font-semibold text-slate-900">{item.sku}</p>
                              <p className="mt-1 text-sm text-slate-600">
                                {seriesMeta[item.series].label} · {formatHorsepower(item.horsepower)} · {formatVoltageRange(item)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-slate-900">{formatCurrency(item.price)}</p>
                              <p className="text-xs text-slate-500">{item.enclosure}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <p className="mt-6 text-xs leading-5 text-slate-500">
                  Selección orientativa basada en potencia nominal, tensión, fase y aplicación. Un ingeniero debe confirmar torque, tipo de carga, frenado y ventilación.
                </p>
              </>
            ) : (
              <div className="flex h-full flex-col justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Sin coincidencias directas
                </p>
                <h3 className="mt-3 text-2xl font-bold text-slate-900">
                  No hay una referencia exacta con esa combinación
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Ajusta fase, voltaje o potencia del motor. Si el proyecto requiere una combinación especial, usa el formulario para que un ingeniero valide una alternativa.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    dispatchQuotePrefill({
                      message: `Necesito ayuda para seleccionar un variador para ${applicationProfiles[selection.application].label.toLowerCase()}, ${phaseLabel(selection.supplyPhase).toLowerCase()} ${selection.voltage} V y ${formatHorsepower(selection.horsepower)}.`,
                    });
                    document.getElementById('cotizacion')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 font-semibold text-white transition hover:bg-slate-800"
                >
                  Pedir asesoría técnica
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
