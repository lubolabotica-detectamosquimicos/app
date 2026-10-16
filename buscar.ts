import { normalizar } from '../normalizar/normalizar';
import type { FilaLista } from '../semaforo/tipos';

export interface Indice {
  porNombre: Map<string, FilaLista[]>;
  nombres: string[]; // ordenados de más largo a más corto
}

export function construirIndice(filas: FilaLista[]): Indice {
  const porNombre = new Map<string, FilaLista[]>();
  for (const f of filas) {
    const k = normalizar(f.ingrediente);
    if (!k) continue;
    porNombre.set(k, [...(porNombre.get(k) ?? []), f]);
  }
  const nombres = [...porNombre.keys()].sort((a, b) => b.length - a.length);
  return { porNombre, nombres };
}

function distancia(a: string, b: string): number {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i-1][j] + 1, d[i][j-1] + 1,
        d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1));
  return d[a.length][b.length];
}

export type Hallazgo =
  | { tipo: 'exacta' | 'contenida'; filas: FilaLista[] }
  | { tipo: 'sugerida'; nombre: string }
  | { tipo: 'ninguna' };

export function buscar(entrada: string, idx: Indice): Hallazgo {
  const q = normalizar(entrada);
  if (!q) return { tipo: 'ninguna' };
  const ex = idx.porNombre.get(q);
  if (ex) return { tipo: 'exacta', filas: ex };

  for (const n of idx.nombres) { // nombre completo como palabras enteras
    if ((' ' + q + ' ').includes(' ' + n + ' '))
      return { tipo: 'contenida', filas: idx.porNombre.get(n)! };
  }
  if (q.length >= 5) { // sugerencia por error de OCR, SIN color
    let mejor: string | null = null, md = 3;
    for (const n of idx.nombres) {
      if (Math.abs(n.length - q.length) > 2) continue;
      const d = distancia(q, n);
      if (d < md && d <= 2) { md = d; mejor = n; }
    }
    if (mejor) return { tipo: 'sugerida', nombre: idx.porNombre.get(mejor)![0].ingrediente };
  }
  return { tipo: 'ninguna' };
}
