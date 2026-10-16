'use client';
import { useState } from 'react';
import { Semaforo, etiquetaEstado } from '@/components/Semaforo';
import { ResultadoIngrediente } from '@/components/ResultadoIngrediente';
import type { Estado, Resultado } from '@/core/semaforo/tipos';

interface Respuesta { global: Estado; parcial: boolean; detalle: Resultado[]; version: string }

export default function Manual() {
  const [texto, setTexto] = useState('');
  const [res, setRes] = useState<Respuesta | null>(null);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  async function consultar() {
    setCargando(true); setError('');
    try {
      const r = await fetch('/api/clasificar', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      setRes(j);
    } catch (e) { setError((e as Error).message || 'Sin conexión'); setRes(null); }
    finally { setCargando(false); }
  }

  return (
    <main>
      <h1>Escribe un ingrediente</h1>
      <input value={texto} onChange={e => setTexto(e.target.value)}
        placeholder="Ej. Bromato de potasio" aria-label="Ingrediente"
        onKeyDown={e => e.key === 'Enter' && texto.trim() && consultar()} />
      <button onClick={consultar} disabled={cargando || !texto.trim()}>
        {cargando ? 'Analizando…' : 'Revisar'}
      </button>
      {error && <p role="alert">{error}</p>}
      {res && (
        <section aria-live="polite">
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', margin: '24px 0' }}>
            <Semaforo estado={res.global} />
            <div>
              <strong>{etiquetaEstado(res.global)}</strong>
              {res.parcial && <p style={{ margin: 0 }}>Resultado parcial: hay ingredientes sin clasificar.</p>}
            </div>
          </div>
          {res.detalle.map((r, i) => <ResultadoIngrediente key={i} r={r} />)}
        </section>
      )}
    </main>
  );
}
