// Límite simple en memoria contra copiado masivo de la base.
const ventana = new Map<string, number[]>();
export function permitir(clave: string, max = 30, ms = 60_000): boolean {
  const ahora = Date.now();
  const hits = (ventana.get(clave) ?? []).filter(t => ahora - t < ms);
  if (hits.length >= max) return false;
  hits.push(ahora); ventana.set(clave, hits);
  return true;
}
