import type { Resultado } from '@/core/semaforo/tipos';
import { Semaforo, etiquetaEstado } from './Semaforo';

export function ResultadoIngrediente({ r }: { r: Resultado }) {
  return (
    <article style={{ borderTop: '1px solid #ddd', padding: '16px 0' }}>
      <header style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Semaforo estado={r.estado} tamano={28} />
        <strong>{r.filas[0]?.ingrediente ?? r.entrada}</strong>
        <span>{etiquetaEstado(r.estado)}</span>
      </header>

      {r.filas.map((f, i) => (
        <div key={i} style={{ marginTop: 10 }}>
          {f.uso && <small>{f.uso}</small>}
          {f.titulo && <p style={{ margin: '4px 0', fontWeight: 700 }}>{f.titulo}</p>}
          <p style={{ margin: 0 }}>{f.detalle}</p>
        </div>
      ))}

      {r.estado === 'N' && (
        <p style={{ marginTop: 10 }}>
          {r.sugerencia
            ? `No está en la lista. ¿Quisiste decir "${r.sugerencia}"?`
            : 'No está en la lista.'}
        </p>
      )}
    </article>
  );
}
