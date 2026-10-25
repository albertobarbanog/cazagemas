import { HomePage } from "@/components/HomePage";

// Regenera la página cada 15 minutos para que el feed de Instagram se mantenga al día.
// Debe coincidir con REVALIDATE_SECONDS en lib/behold.ts.
export const revalidate = 900;

export default function Page() {
  return <HomePage locale="es" />;
}
