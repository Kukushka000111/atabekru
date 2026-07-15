import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import { Providers } from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "atabek.ru",
  description: "Персональный сайт-портфолио — Command Palette интерфейс",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Providers>
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
