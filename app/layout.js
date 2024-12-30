import localFont from "next/font/local";
import "./globals.css";
import { Outfit } from "next/font/google";
import Header from "./_components/Header";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Grocery App",
  description: "Una pagina diseñada con strapi y multiples categorias",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
