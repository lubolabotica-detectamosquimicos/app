import { normalizar } from '../normalizar/normalizar';
import type { Color } from './tipos';

export function interpretarColor(
  valor: unknown, mapa: Record<string, Color>
): Color | null {
  return mapa[normalizar(String(valor ?? ''))] ?? null;
}
