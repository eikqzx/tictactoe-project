"use client";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { CssVarsProvider, extendTheme } from "@mui/joy";
import Header from "./components/header/page";
import { usePathname } from "next/navigation";


const theme = extendTheme();

export default function RootLayout({ children }) {
  const pathname = usePathname();
  console.log(pathname,"router.pathname");
  
  return (
    <html lang="en" data-color-scheme="light">
      <CssVarsProvider theme={theme}>
        <SessionProvider>
          <body style={{ margin: 0 }}>
           {pathname !== '/' ? <Header /> : null}
            <div style={{ marginTop: '80px' }}>
              {children}
            </div>
          </body>
        </SessionProvider>
      </CssVarsProvider>
    </html>
  );
}
