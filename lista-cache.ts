import { comprobarCambio, leerArchivo } from './onedrive';
import { leerFilas } from './lector-excel';
import { construirIndice, type Indice } from '@/core/buscar/buscar';

let cache: { etag: string; idx: Indice; version: string; revisado: number } | null = null;
const TTL_MS = 10_000; // evita saturar Graph; sigue siendo casi en vivo

export async function obtenerIndice() {
  if (cache && Date.now() - cache.revisado < TTL_MS) return cache;
  try {
    const etag = await comprobarCambio();
    if (!cache || cache.etag !== etag) {
      const { validas } = leerFilas(await leerArchivo());
      if (validas.length === 0) throw new Error('Archivo sin filas válidas');
      cache = { etag, idx: construirIndice(validas), revisado: Date.now(),
                version: new Date().toISOString() };
    } else cache.revisado = Date.now();
    return cache;
  } catch (e) {
    if (cache) return cache; // último índice válido
    throw e;
  }
}
