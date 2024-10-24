"use client";
import "./styles/globals.css";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import { CssVarsProvider, extendTheme } from "@mui/joy";

import { usePathname } from "next/navigation";
import Header from "./components/header/page";
import Head from "next/head";

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
    <html lang="th">
      <Head>
            <link rel="icon" href="/favicon.ico" />  {/* ใช้ไอคอนที่อยู่ในโฟลเดอร์ public */}
      </Head>
      <CssVarsProvider theme={theme}>
        <SessionProvider>
          <body  className={`${geistSans.variable} ${geistMono.variable}`}>
            <Header />
            {pathname !== '/' && <Header />}
            <main>{children}</main>
          </body>
        </SessionProvider>
      </CssVarsProvider>
    </html>
  );
}