import type { Estado } from '@/core/semaforo/tipos';

const ETIQUETA: Record<Estado, string> = {
  V: 'Verde', A: 'Amarillo', R: 'Rojo', N: 'No clasificado',
};
export const colorDe = (e: Estado) =>
  ({ V: 'var(--verde)', A: 'var(--amarillo)', R: 'var(--rojo)', N: 'var(--gris)' })[e];

export function Semaforo({ estado, tamano = 56 }: { estado: Estado; tamano?: number }) {
  return (
    <span role="img" aria-label={ETIQUETA[estado]}
      style={{ display: 'inline-block', width: tamano, height: tamano,
               borderRadius: '50%', background: colorDe(estado) }} />
  );
}
export const etiquetaEstado = (e: Estado) => ETIQUETA[e];
