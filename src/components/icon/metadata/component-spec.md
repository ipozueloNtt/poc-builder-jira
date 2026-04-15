---
title: ath-icon
component: ath-icon
status: stable
source:
  figma:
    documentation: https://www.figma.com/design/ts8uR3OicudYSr8L7E0lrd/-v.2.0.0--Aletheia-Web-components?node-id=40015250-40828&m=dev
    overviewNode: 40015250:40972
    useNode: 40015250:40845
    accessibilityNode: 40015250:40829
  storybook:
    title: Componentes/Icon
    canonicalStoryId: componentes-icon--docs
    stories:
      - Playground
      - Size
      - Color
    extractionMode: fallback-local-index-and-csf
    gap: storybook-mcp manifest 404
  code:
    path: packages/stencil-library/src/components/icon/icon.tsx
    docsJsonTag: ath-icon
lastUpdated: 2026-02-20
---

# ath-icon

Componente atomico para representar iconos SVG del sistema mediante sprite, con variantes de tamano y color semanticamente alineadas con Figma.

## API publica

### Props
- `icon`: `string` (identificador del sprite)
- `size`: `xs | sm | md | lg` (default runtime: `md`)
- `color`: `default | primary | info | accent | error | warning | success | inverse | disabled | inherit`
- `aria-label`: `string` (nombre accesible explicito)
- `aria-labelledby`: `string` (referencia a texto accesible externo)

### Eventos y metodos
- Sin eventos publicos.
- Sin metodos publicos.

### Slots y partes
- Sin slots.
- Sin shadow parts expuestos.

## Variantes operativas

### Tamano
- `xs` (16px), `sm` (20px), `md` (24px), `lg` (32px).

### Color
- Feedback: `success`, `error`, `warning`, `info`.
- Marca y estados: `primary`, `accent`, `inverse`, `disabled`, `default`, `inherit`.

## Foundations (Figma)
- Referencias trazadas a nodos: `40015250:40828`, `40015250:40972`, `40015250:40845`, `40015250:40829`.
- Reglas de uso clave:
  - Usar icono como refuerzo visual, no como reemplazo exclusivo de informacion critica.
  - Mantener consistencia de tamano respecto al componente padre.
  - En iconos informativos/interactivos, asegurar contraste minimo 3:1.
  - Para iconos interactivos, asegurar area minima de 24x24px (recomendado 44x44px).
- Tematizacion observada en Figma: modos `light` y `dark`.

## Accesibilidad
- Si no existe `aria-label` ni `aria-labelledby`, el host queda decorativo (`aria-hidden=true`).
- Si existe nombre accesible, el host expone `role=img` y atributos ARIA normalizados.
- Figma indica acompanar iconos con texto visible cuando aportan significado funcional.

## Dependencias
- Dependencias directas: ninguna.
- Consumido por multiples componentes del DS (por ejemplo: `ath-button`, `ath-link`, `ath-tag`, `ath-tabs`).

## Gaps documentados
- Storybook MCP no disponible durante la extraccion (manifest 404).
- Se utilizo fallback local con `storybook-static/index.json` y `icon.stories.tsx`.
