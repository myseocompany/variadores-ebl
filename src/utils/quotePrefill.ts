export const QUOTE_PREFILL_EVENT = 'variador:prefill';

export type QuotePrefillDetail = {
  message: string;
};

export function dispatchQuotePrefill(detail: QuotePrefillDetail) {
  window.dispatchEvent(new CustomEvent<QuotePrefillDetail>(QUOTE_PREFILL_EVENT, { detail }));
}
