# Reglas de versionado

- Versión actual publicada: `1.1.1`.
- Fuente única de versión: `src/version.ts` (constante `APP_VERSION`).
- En cada PR se debe incrementar la versión antes de merge/deploy.
- Formato: SemVer `MAJOR.MINOR.PATCH`.
- Regla por defecto para PR normales: incrementar `PATCH` en `+1`.
  - Ejemplo: `1.1.1` -> `1.1.2`.
- Si el cambio es grande o rompe compatibilidad, ajustar `MINOR`/`MAJOR` según corresponda.
