import { WHY_CARDS } from "@/lib/data/content";

export function WhySection() {
  return (
    <section className="grid sm:grid-cols-3 gap-6">
      <div className="sm:col-span-3 mb-2">
        <h2 className="text-2xl font-bold text-zinc-900">
          ¿Por qué usar MisLíneas?
        </h2>
        <p className="text-zinc-600">
          Centralizamos la fragmentación del ecosistema móvil mexicano.
        </p>
      </div>
      {WHY_CARDS.map((card) => (
        <div
          key={card.title}
          className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm"
        >
          <card.icon className="w-6 h-6 text-black mb-4" />
          <h3 className="font-semibold text-zinc-900 mb-2">{card.title}</h3>
          <p className="text-sm text-zinc-600">{card.body}</p>
        </div>
      ))}
    </section>
  );
}
