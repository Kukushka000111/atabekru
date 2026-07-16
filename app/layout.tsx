import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "atabek.ru — Divine Gallery",
  description:
    "Цифровая галерея Атабека. Искусство звука и кода в духе Neo-Renaissance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${cinzel.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
