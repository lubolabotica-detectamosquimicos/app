export const PLANES = {
  gratis:     { precio: 0,     moneda: 'COP', escaneosDia: 5 },      // a definir
  mensual:    { precio: 6500,  moneda: 'COP', meses: 1,  renovable: true },
  anual:      { precio: 30000, moneda: 'COP', meses: 12, renovable: true }, // a confirmar
  voluntario: { precioMinimo: 35000, moneda: 'COP', meses: 12, renovable: false },
} as const;
