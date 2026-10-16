# Lubo

Web app (PWA) que escanea o recibe ingredientes y responde con semáforo
(verde / amarillo / rojo) leyendo una base Excel en OneDrive.

## Reglas de la base
- El Excel es **solo lectura** para la app y solo lo edita el dueño.
- Col. A = color · B = ingrediente · C = uso · D = riesgo funcional o beneficio.
- El usuario nunca ve el archivo: la API devuelve solo las filas consultadas.
- Ingrediente no encontrado = N. Nunca se asume verde.

## Estructura
app/ (pantallas y /api) · core/ (lógica pura) · config/ · lib/ · components/ · tests/

## Instalación
1. npm install
2. cp .env.example .env.local y completar
3. npm run dev
4. npm test

## Microsoft (cuenta personal, solo lectura)
Registrar app en Azure con permisos delegados Files.Read y offline_access,
obtener el refresh token una sola vez con la cuenta dueña del archivo y
guardarlo en MS_REFRESH_TOKEN. Nunca subir estos valores a GitHub.

## Despliegue
Conectar a Vercel y cargar las variables de .env.example en Project Settings.

## Estado
Hecho: motor, lector de Excel, /api/clasificar, pantalla manual, pruebas.
Pendiente: escáner con cámara (OCR), Firebase Auth, Mercado Pago (COP),
panel admin, token offline, diseño de AI Studio.

Aviso: la clasificación es informativa y no reemplaza consejo profesional.
