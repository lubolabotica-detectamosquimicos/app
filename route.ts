import { NextRequest, NextResponse } from 'next/server';
import { obtenerIndice } from '@/lib/lista-cache';
import { permitir } from '@/lib/limites';
import { clasificarLista } from '@/core/semaforo/clasificar';
import { separarIngredientes } from '@/core/normalizar/normalizar';

const MAX_INGREDIENTES = 60;

export async function POST(req: NextRequest) {
  // TODO paso 4: verificar sesión de Firebase y membresía aquí.
  const ip = req.headers.get('x-forwarded-for') ?? 'local';
  if (!permitir(ip)) return NextResponse.json({ error: 'Demasiadas consultas' }, { status: 429 });

  const { texto } = await req.json().catch(() => ({ texto: '' }));
  if (typeof texto !== 'string' || !texto.trim())
    return NextResponse.json({ error: 'Texto vacío' }, { status: 400 });

  const entradas = separarIngredientes(texto).slice(0, MAX_INGREDIENTES);
  try {
    const { idx, version } = await obtenerIndice();
    // Solo se devuelven las filas coincidentes, nunca la lista completa.
    return NextResponse.json({ ...clasificarLista(entradas, idx), version });
  } catch {
    return NextResponse.json({ error: 'Sin conexión con la base. Intenta de nuevo.' }, { status: 503 });
  }
}
