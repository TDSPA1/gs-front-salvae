import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import React from "react";
import 'leaflet/dist/leaflet.css';

export const metadata: Metadata = {
  title: "Salvaê",
  description: "Site desenvolvido para ajudar a população",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
    
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
