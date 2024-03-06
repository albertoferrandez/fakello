import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import DashBoard from "./components/DashBoard";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "FakeLlo",
  description: "Herramienta de gestión de proyectos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="flex flex-col h-screen">
        <DashBoard>
          {children}
        </DashBoard>
      </body>
    </html>
  );
}
