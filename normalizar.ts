export const normalizar = (t: string): string =>
  t.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s\-]/g, ' ')
    .replace(/\s+/g, ' ').trim();

export function separarIngredientes(texto: string): string[] {
  return texto
    .replace(/^\s*(ingredientes|ingredients|contiene)\s*:?/i, '')
    .split(/[,;\n]/)
    .map(s => s.trim()).filter(s => s.length > 1);
}
