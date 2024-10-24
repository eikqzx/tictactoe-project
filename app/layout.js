import "./styles/globals.css";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import ClientSideContent from "./components/clientSideContent/page";
import ClientThemeProvider from "./clientThemeProvider";

const geistSans = localFont({
  src: "./styles/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./styles/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "TicTacToe",
  description: "TicTacToe Game Application",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <ClientThemeProvider>
        <SessionProvider>
          <body  className={`${geistSans.variable} ${geistMono.variable}`}>
            <ClientSideContent />
            <main>{children}</main>
          </body>
        </SessionProvider>
      </ClientThemeProvider>
    </html>
  );
}