import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import TanstackQueryClientProvider from "@/components/tanstackQuery";
import { Rubik } from "next/font/google";

export const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
      <body className={`${rubik.className}  antialiased`}>
        <TanstackQueryClientProvider>
          <Toaster />
          {children}
        </TanstackQueryClientProvider>
      </body>
    </html>
  );
}
