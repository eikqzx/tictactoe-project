"use client";
import { usePathname } from "next/navigation";
import Header from "../header/page";

export default function ClientSideContent() {
  const pathname = usePathname();

  return (
    <>
      {pathname !== '/' && <Header />}
    </>
  );
}
