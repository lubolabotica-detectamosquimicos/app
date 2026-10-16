// ÚNICO lugar que depende del Excel. El archivo es SOLO LECTURA.
export const COLUMNAS = {
  hoja: null as string | null, // null = primera pestaña
  filaEncabezado: 1,           // la fila 1 es encabezado
  color: 'A',                  // Categoría: Rojo / Amarillo / Verde
  ingrediente: 'B',            // se busca aquí
  uso: 'C',                    // Alimentos, vaper, Cosmética
  detalle: 'D',                // Riesgo funcional o Beneficio
} as const;

// Se compara sin tildes ni mayúsculas
export const MAPA_COLOR: Record<string, 'V' | 'A' | 'R'> = {
  verde: 'V', amarillo: 'A', rojo: 'R',
};
