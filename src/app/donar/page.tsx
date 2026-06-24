"use client";

import { useEffect } from "react";

const KOFI_URL = "https://ko-fi.com/moraxh";

export default function DonarPage() {
  useEffect(() => {
    window.location.replace(KOFI_URL);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center text-sm text-zinc-500">
      Redirigiendo a Ko-fi...
    </main>
  );
}
