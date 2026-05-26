import { Database, FileX, Search } from "lucide-react";
import { WHY_CARDS } from "@/lib/data/content";

export function WhySection() {
  return (
    <div className="space-y-10 pt-4">
      <section className="grid sm:grid-cols-3 gap-6">
        <div className="sm:col-span-3 mb-2">
          <p className="text-zinc-600">
            Centralizamos la fragmentación del ecosistema móvil mexicano.
          </p>
        </div>
        {WHY_CARDS.map((card) => (
          <div
            key={card.title}
            className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl"
          >
            <card.icon className="w-6 h-6 text-black mb-4" />
            <h3 className="font-semibold text-zinc-900 mb-2">{card.title}</h3>
            <p className="text-sm text-zinc-600">{card.body}</p>
          </div>
        ))}
      </section>

      <section>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">
            ¿Cómo funciona por debajo?
          </h2>
          <p className="text-zinc-600 text-sm">
            Nuestro proceso es completamente transparente. Creemos que cuando
            entiendes qué hacemos con tus datos, la confianza es natural.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-[2px] bg-zinc-200" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white border-2 border-zinc-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Search className="w-8 h-8 text-black" />
            </div>
            <h3 className="font-bold text-zinc-900 mb-2">
              1. Ingresas tu CURP
            </h3>
            <p className="text-xs text-zinc-600 max-w-[200px]">
              Solo tú conoces este dato. Se envía cifrado a nuestro servidor
              puente.
            </p>
          </div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white border-2 border-zinc-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Database className="w-8 h-8 text-black" />
            </div>
            <h3 className="font-bold text-zinc-900 mb-2">
              2. Consulta Oficial
            </h3>
            <p className="text-xs text-zinc-600 max-w-[200px]">
              Hacemos la misma consulta pública que tú harías en las páginas de
              Telcel, AT&T, etc.
            </p>
          </div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white border-2 border-zinc-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <FileX className="w-8 h-8 text-black" />
            </div>
            <h3 className="font-bold text-zinc-900 mb-2">
              3. Destrucción de Datos
            </h3>
            <p className="text-xs text-zinc-600 max-w-[200px]">
              Te mostramos los resultados y destruimos tu CURP. Nada se guarda
              en bases de datos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
