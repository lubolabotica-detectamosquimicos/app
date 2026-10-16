import { buscar, type Indice } from '../buscar/buscar';
import type { Estado, Resultado } from './tipos';

const PESO: Record<Estado, number> = { V: 0, N: 1, A: 2, R: 3 };

export function clasificarUno(entrada: string, idx: Indice): Resultado {
  const h = buscar(entrada, idx);
  if (h.tipo === 'exacta' || h.tipo === 'contenida') {
    const estado = h.filas.reduce<Estado>(
      (p, f) => (PESO[f.color] > PESO[p] ? f.color : p), h.filas[0].color);
    return { entrada, estado, filas: h.filas, coincidencia: h.tipo };
  }
  if (h.tipo === 'sugerida')
    return { entrada, estado: 'N', filas: [], coincidencia: 'sugerida', sugerencia: h.nombre };
  return { entrada, estado: 'N', filas: [], coincidencia: 'ninguna' };
}

export function clasificarLista(entradas: string[], idx: Indice) {
  const detalle = entradas.map(e => clasificarUno(e, idx));
  const global = detalle.reduce<Estado>(
    (p, r) => (PESO[r.estado] > PESO[p] ? r.estado : p), 'V');
  return { global, parcial: detalle.some(d => d.estado === 'N'), detalle };
}
