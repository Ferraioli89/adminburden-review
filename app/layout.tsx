import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AuthProvider } from "@/components/providers/auth-provider";
import { AppStateProvider } from "@/components/providers/app-state-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

export const metadata: Metadata = {
  title: "Administrative Burden Review",
  description:
    "A collaborative literature review on Administrative Burden and Citizen Experience."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans">
        <AuthProvider>
          <AppStateProvider>
            <SiteHeader />
            <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">{children}</main>
            <SiteFooter />
          </AppStateProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
