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
          href="/aviso-de-privacidad"
          className="hover:text-black transition-colors"
        >
          Aviso de Privacidad
        </a>
        <span className="hidden md:block text-zinc-300">&bull;</span>
        <a
          href="https://github.com/moraxh/MisLineas"
          className="hover:text-black transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Repositorio Open Source
        </a>
        <span className="hidden md:block text-zinc-300">&bull;</span>
        <a
          href="mailto:contact@moraxh.dev"
          className="flex items-center gap-1.5 hover:text-black transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5"
            aria-hidden="true"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          contact@moraxh.dev
        </a>
      </div>
    </footer>
  );
}
