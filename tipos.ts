export type Color = 'V' | 'A' | 'R';
export type Estado = Color | 'N';

export interface FilaLista {
  color: Color;        // col. A
  ingrediente: string; // col. B
  uso: string;         // col. C
  titulo: string;      // col. D, antes de los dos puntos
  detalle: string;     // col. D completo
}

export interface Resultado {
  entrada: string;
  estado: Estado;
  filas: FilaLista[];
  coincidencia: 'exacta' | 'contenida' | 'sugerida' | 'ninguna';
  sugerencia?: string; // nunca activa color por sí sola
}
