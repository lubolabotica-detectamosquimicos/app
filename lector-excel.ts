import * as XLSX from 'xlsx';
import { COLUMNAS, MAPA_COLOR } from '@/config/columnas';
import { interpretarColor } from '@/core/semaforo/interpretar-color';
import type { FilaLista } from '@/core/semaforo/tipos';

const idx = (letra: string) => letra.toUpperCase().charCodeAt(0) - 65;

export function leerFilas(buf: Buffer) {
  const wb = XLSX.read(buf, { type: 'buffer' });
  const hoja = wb.Sheets[COLUMNAS.hoja ?? wb.SheetNames[0]];
  const filas = XLSX.utils.sheet_to_json<unknown[]>(hoja, { header: 1, defval: '' });
  const validas: FilaLista[] = [];
  const invalidas: number[] = [];

  filas.slice(COLUMNAS.filaEncabezado).forEach((f, i) => {
    const nombre = String(f[idx(COLUMNAS.ingrediente)] ?? '').trim();
    if (!nombre) return;
    const color = interpretarColor(f[idx(COLUMNAS.color)], MAPA_COLOR);
    if (!color) { invalidas.push(i + COLUMNAS.filaEncabezado + 1); return; }
    const detalle = String(f[idx(COLUMNAS.detalle)] ?? '').trim();
    const corte = detalle.indexOf(':');
    validas.push({
      color, ingrediente: nombre,
      uso: String(f[idx(COLUMNAS.uso)] ?? '').trim(),
      titulo: corte > 0 && corte < 90 ? detalle.slice(0, corte) : '',
      detalle: corte > 0 && corte < 90 ? detalle.slice(corte + 1).trim() : detalle,
    });
  });
  return { validas, invalidas }; // invalidas: filas sin color válido (reporte)
}
