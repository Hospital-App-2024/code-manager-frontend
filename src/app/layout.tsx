import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner"
import { auth } from "@/auth";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Code Manager",
  description: "Code Manager",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()

  return (
    <html lang="es">
      <body className={fontSans.className}>
        <SessionProvider session={session}>
          { children }
          <Toaster richColors position="top-center"/>
        </SessionProvider>
      </body>
    </html>
  );
}
