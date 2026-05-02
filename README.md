# MisLíneas

Herramienta web para consultar qué líneas telefónicas están registradas bajo tu CURP en México. Antes de esto, tenías que entrar a más de 100 portales distintos de operadoras y OMVs para saber si alguien registró líneas a tu nombre. Esta app lo hace todo en una sola consulta.

## El problema que resuelve

En México cualquier persona puede registrar una línea telefónica usando el CURP de otra persona. No existe un portal centralizado del gobierno donde puedas ver todas las líneas asociadas a tu identidad. Esto se traduce en fraudes, suplantación de identidad y líneas usadas para actividades ilícitas a nombre de personas que ni siquiera saben que están registradas.

MisLíneas consulta en paralelo a los operadores y OMVs que exponen algún mecanismo de verificación, y te regresa los resultados conforme van llegando.

## Cobertura

Telcel, AT&T y más de 80 OMVs que operan bajo Red Altan y otras redes. La lista completa con el estado de cada operador está en `OPERATORS.md`.

## Cómo correrlo

Necesitas Node.js y pnpm.

```bash
pnpm install
pnpm dev
```

Para producción:

```bash
pnpm build
pnpm start
```

No requiere variables de entorno ni API keys externas.

## Stack

Next.js con App Router, React 19, TypeScript y Tailwind CSS 4. Las consultas a proveedores corren en paralelo con `Promise.allSettled` y los resultados se transmiten como stream NDJSON para que la UI vaya mostrando resultados sin esperar a que terminen todos los proveedores.

## Derechos ARCO

Si encuentras líneas que no reconoces, la app incluye información sobre cómo presentar solicitudes ARCO (Acceso, Rectificación, Cancelación y Oposición) ante cada operadora.

## Contexto legal

Esta herramienta solo consulta información sobre tu propio CURP. El uso para consultar CURPs de terceras personas sin su consentimiento puede ser contrario a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
