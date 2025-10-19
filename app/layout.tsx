import type { Metadata } from "next";
import "./globals.css"; // Импорт глобальных стилей Tailwind

export const metadata: Metadata = {
  title: "Weather App Demo", // Заголовок приложения
  description: "Демо погоды на Next.js", // Описание
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"> {/* Язык en, можно сменить на ru */}
      <body className="antialiased"> {/* Класс для сглаживания шрифтов */}
        {children} {/* Здесь будет контент из page.tsx */}
      </body>
    </html>
  );
}
