import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NeuralBackground } from "@/components/ui/neural-background";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Sumukh Ramagiri — Machine Learning Engineer",
  description:
    "Portfolio of Sumukh Ramagiri (@sumukhramagiri) — Machine Learning Engineer building scalable AI/ML and Generative AI systems.",
  openGraph: {
    title: "Sumukh Ramagiri — Machine Learning Engineer",
    description:
      "Machine Learning Engineer building scalable AI/ML and Generative AI systems.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumukh Ramagiri — Machine Learning Engineer",
    description:
      "Machine Learning Engineer building scalable AI/ML and Generative AI systems.",
    creator: "@sumukhramagiri",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-grid">
        <NeuralBackground />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
