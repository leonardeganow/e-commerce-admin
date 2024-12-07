import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import TanstackQueryClientProvider from "@/components/tanstackQuery";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "E-commerce-admin",
  description: "admin portal for e-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}  antialiased`}>
        <TanstackQueryClientProvider>
          <Toaster />
          {children}
        </TanstackQueryClientProvider>
      </body>
    </html>
  );
}
