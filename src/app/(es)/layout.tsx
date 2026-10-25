import type { Viewport } from "next";
import { RootDocument } from "@/components/RootDocument";
import { buildMetadata } from "@/lib/metadata";
import "../globals.css";

export const metadata = buildMetadata("es");

export const viewport: Viewport = {
  themeColor: "#4d1f69",
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="es">{children}</RootDocument>;
}
