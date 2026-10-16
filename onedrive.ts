// SOLO LECTURA. No existe ninguna función de escritura.
let token: { valor: string; expira: number } | null = null;

async function accessToken(): Promise<string> {
  if (token && token.expira > Date.now() + 60_000) return token.valor;
  const r = await fetch('https://login.microsoftonline.com/consumers/oauth2/v2.0/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.MS_CLIENT_ID!,
      client_secret: process.env.MS_CLIENT_SECRET!,
      refresh_token: process.env.MS_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
      scope: 'Files.Read offline_access',
    }),
  });
  if (!r.ok) throw new Error('No se pudo autenticar con OneDrive');
  const j = await r.json();
  token = { valor: j.access_token, expira: Date.now() + j.expires_in * 1000 };
  return token.valor;
}

const base = () =>
  `https://graph.microsoft.com/v1.0/me/drive/items/${process.env.ONEDRIVE_FILE_ID}`;

export async function comprobarCambio(): Promise<string> {
  const r = await fetch(`${base()}?select=eTag`, {
    headers: { Authorization: `Bearer ${await accessToken()}` },
  });
  if (!r.ok) throw new Error('No se pudo consultar OneDrive');
  return (await r.json()).eTag as string;
}

export async function leerArchivo(): Promise<Buffer> {
  const r = await fetch(`${base()}/content`, {
    headers: { Authorization: `Bearer ${await accessToken()}` },
  });
  if (!r.ok) throw new Error('No se pudo leer el archivo');
  return Buffer.from(await r.arrayBuffer());
}
