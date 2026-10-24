import { Inter, Bodoni_Moda,JetBrains_Mono} from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], display: "swap" });

const display = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Velmora | High Perfumery & Extrait de Parfump",
  description:
    "Discover Velmora, a high end niche fragrance house. Hand poured in small batches using rare, ethically sourced botanical ingredients",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`  h-full antialiased`}>
      <body className={`${inter.className} ${display.variable} ${mono.variable} text-neutral-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
