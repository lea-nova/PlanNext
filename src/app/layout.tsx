
// layout : réutiliser la mise en page. 
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
// import IBMPlexSans from "next/font/local";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export const metadata: Metadata = {
  title: "Plan Next - Un esprit clair, une liste à jour",
  description: "To do list, gérer ses listes et les tâches que l'on inscrit.",
  applicationName: "Plan Next"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
      </head>
      {/* <body
        className={` ${IBMPlexSansBold.variable} antialiased `}
      > */}
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-tr from-[#FAF8D4] via-[#E2D4FA] to-[#7C66A5]`}
        // className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#E3DFF2]`}
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#e9e5fa]`}
      // className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#fffee8]`}
      >

        <main className="  flex flex-col min-h-screen ">
          {children}

        </main>
        <footer className="text-center "> <p>&copy; 2024 PlanNext.</p></footer>
      </body>
    </html >
  );
}
