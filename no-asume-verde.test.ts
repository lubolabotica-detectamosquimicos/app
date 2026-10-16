import { describe, it, expect } from 'vitest';
import { construirIndice } from '@/core/buscar/buscar';
import { clasificarLista } from '@/core/semaforo/clasificar';
import type { FilaLista } from '@/core/semaforo/tipos';

const f = (color: 'V'|'A'|'R', n: string): FilaLista =>
  ({ color, ingrediente: n, uso: 'Alimentos', titulo: '', detalle: 'x' });
const idx = construirIndice([f('R', 'Bromato de potasio'), f('V', 'Agua'), f('A', 'Sal')]);

describe('semáforo', () => {
  it('desconocido = N, nunca verde', () => {
    expect(clasificarLista(['xyzqw'], idx).global).toBe('N');
  });
  it('gana el peor', () => {
    expect(clasificarLista(['agua', 'sal', 'bromato de potasio'], idx).global).toBe('R');
  });
  it('contenida: "agua purificada" activa Agua', () => {
    expect(clasificarLista(['agua purificada'], idx).detalle[0].estado).toBe('V');
  });
  it('sugerida no activa color', () => {
    const r = clasificarLista(['bromato de potasyo'], idx).detalle[0];
    expect(r.estado).toBe('N'); expect(r.sugerencia).toBe('Bromato de potasio');
  });
});
