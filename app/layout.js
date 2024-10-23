"use client";
import "./styles/globals.css";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import { CssVarsProvider, extendTheme } from "@mui/joy";

import { usePathname } from "next/navigation";
import Header from "./components/header/page";

const theme = extendTheme();

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

export default function RootLayout({ children }) {
  const pathname = usePathname();
  
  return (
    <html lang="th" data-color-scheme="light">
      <CssVarsProvider theme={theme}>
        <SessionProvider>
          <body style={{ margin: 0 }} className={`${geistSans.variable} ${geistMono.variable}`}>
            {pathname !== '/' && <Header />} {/* แสดง Header เมื่อไม่ใช่หน้าแรก */}
            <div style={{ marginTop: '80px' }}>
              {children}
            </div>
          </body>
        </SessionProvider>
      </CssVarsProvider>
    </html>
  );
}