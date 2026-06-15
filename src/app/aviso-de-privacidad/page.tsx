import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso de Privacidad",
  description:
    "Aviso de privacidad de MisLíneas conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.",
  alternates: {
    canonical: "/aviso-de-privacidad",
  },
};

export default function AvisoDePrivacidad() {
  const lastUpdated = "15 de junio de 2025";

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fafaf9_0%,#f4f4f5_40%,#ffffff_100%)] font-sans text-zinc-900">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-zinc-900 mb-2">
          Aviso de Privacidad
        </h1>
        <p className="text-sm text-zinc-500 mb-10">
          Última actualización: {lastUpdated}
        </p>

        <div className="prose prose-zinc max-w-none space-y-8 text-sm leading-relaxed text-zinc-700">
          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">
              1. Responsable del tratamiento de datos
            </h2>
            <p>
              <strong>MisLíneas</strong> es una plataforma ciudadana
              independiente, de código abierto, sin fines de lucro, disponible
              en{" "}
              <a
                href="https://mislineas.com.mx"
                className="text-blue-600 hover:underline"
              >
                mislineas.com.mx
              </a>
              . El responsable del tratamiento de los datos es el autor del
              proyecto (disponible en{" "}
              <a
                href="https://github.com/moraxh/MisLineas"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/moraxh/MisLineas
              </a>
              ).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">
              2. Datos personales que se recaban
            </h2>
            <p>
              Para realizar una consulta, el usuario proporciona voluntariamente
              su <strong>CURP</strong> (Clave Única de Registro de Población).
              Este dato es enviado directamente a los portales oficiales de las
              operadoras de telecomunicaciones de México para obtener la
              información de líneas registradas.
            </p>
            <p className="mt-2">
              MisLíneas <strong>no almacena tu CURP</strong> en ningún servidor
              propio. El único registro local es el historial guardado en el
              navegador del propio usuario (
              <code className="bg-zinc-100 px-1 rounded text-xs">
                localStorage
              </code>
              ), que nunca sale de su dispositivo.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">
              3. Finalidad del tratamiento
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Consultar las líneas telefónicas vinculadas a la CURP del
                usuario ante las operadoras participantes.
              </li>
              <li>
                Facilitar el ejercicio de derechos ARCO (Acceso, Rectificación,
                Cancelación u Oposición) ante dichas operadoras.
              </li>
            </ul>
            <p className="mt-2">
              No se utilizan los datos para fines de mercadotecnia, perfilado,
              venta a terceros ni ningún otro fin distinto al descrito.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">
              4. Transferencia de datos
            </h2>
            <p>
              La CURP es transmitida, en tiempo real y de forma cifrada (HTTPS),
              únicamente a los portales oficiales de las operadoras de
              telecomunicaciones para realizar la consulta. MisLíneas actúa como
              intermediario técnico y no retiene una copia de dicha información.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">
              5. Derechos ARCO
            </h2>
            <p>
              Conforme a la{" "}
              <strong>
                Ley Federal de Protección de Datos Personales en Posesión de
                los Particulares (LFPDPPP)
              </strong>
              , tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al
              tratamiento de tus datos personales.
            </p>
            <p className="mt-2">
              Dado que MisLíneas no almacena tus datos en servidores propios,
              el ejercicio de derechos ARCO frente a las operadoras debe
              realizarse directamente ante cada una de ellas a través de sus
              canales oficiales o del portal del{" "}
              <a
                href="https://portal.crt.gob.mx/reporte-fallas-plataforma-registro"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Centro de Registro de Telecomunicaciones (CRT)
              </a>
              .
            </p>
            <p className="mt-2">
              Para cualquier consulta sobre privacidad relacionada con esta
              plataforma, puedes abrir un issue en el repositorio público de
              GitHub.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">
              6. Cookies y almacenamiento local
            </h2>
            <p>
              MisLíneas no utiliza cookies de seguimiento ni herramientas de
              publicidad. Se usa{" "}
              <a
                href="https://vercel.com/docs/analytics"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vercel Analytics
              </a>{" "}
              para estadísticas de uso agregadas y anónimas (sin identificación
              personal). El historial de consultas se guarda únicamente en el{" "}
              <code className="bg-zinc-100 px-1 rounded text-xs">
                localStorage
              </code>{" "}
              del navegador del usuario.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">
              7. Seguridad
            </h2>
            <p>
              Todas las comunicaciones entre tu navegador y los servidores de
              MisLíneas se realizan mediante HTTPS. El código fuente es público
              y auditable en{" "}
              <a
                href="https://github.com/moraxh/MisLineas"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">
              8. Cambios a este aviso
            </h2>
            <p>
              Cualquier modificación a este aviso de privacidad será publicada
              en esta página con la fecha de actualización correspondiente. Se
              recomienda revisarlo periódicamente.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
