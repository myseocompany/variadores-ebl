export type TrackingParams = Record<string, string>;

const CID_CANDIDATES = ['cid', 'gclid', 'fbclid', 'msclkid', 'ttclid', 'wbraid', 'gbraid'] as const;

export function getTrackingParams(search: string = window.location.search): TrackingParams {
  const params = new URLSearchParams(search);
  const result: TrackingParams = {};

  for (const [key, value] of params.entries()) {
    const trimmedKey = key.trim();
    const trimmedValue = value.trim();

    if (trimmedKey === '' || trimmedValue === '') {
      continue;
    }

    result[trimmedKey] = trimmedValue;
  }

  return result;
}

export function buildCrmTrackingPayload(params: TrackingParams): TrackingParams {
  const payload: TrackingParams = { ...params };

  if (!payload.cid) {
    const cid = CID_CANDIDATES.map((key) => params[key]).find((value) => typeof value === 'string' && value !== '');
    if (cid) {
      payload.cid = cid;
    }
  }

  return payload;
}

export function buildConfirmationUrl(baseUrl: string, params: TrackingParams): string {
  const queryString = new URLSearchParams(params).toString();
  return `${baseUrl}confirmation.html${queryString ? `?${queryString}` : ''}`;
}
