import './globals.css';
export const metadata = { title: 'Lubo', description: 'Escáner de ingredientes con semáforo' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="es"><body>{children}</body></html>);
}
