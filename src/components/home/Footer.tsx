import Image from "next/image";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="mt-20 pt-8 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
      <div className="flex items-center gap-2 font-medium text-zinc-900">
        <Image
          src={logo}
          alt="MisLíneas"
          width={20}
          height={20}
          className="rounded"
        />{" "}
        MisLíneas
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 text-xs font-medium">
        <span>Plataforma ciudadana independiente</span>
        <span className="hidden md:block text-zinc-300">&bull;</span>
        <span>No afiliado al Gobierno de México</span>
        <span className="hidden md:block text-zinc-300">&bull;</span>
        <a
          href="https://github.com/moraxh/MisLineas"
          className="hover:text-black transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Repositorio Open Source
        </a>
      </div>
    </footer>
  );
}
