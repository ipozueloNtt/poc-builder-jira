---
title: ath-tag
component: ath-tag
status: stable
source:
  figma:
    documentation: https://www.figma.com/design/ts8uR3OicudYSr8L7E0lrd/-v.2.0.0--Aletheia-Web-components?node-id=40012185-9743&m=dev
    componentSet: https://www.figma.com/design/ts8uR3OicudYSr8L7E0lrd/-v.2.0.0--Aletheia-Web-components?node-id=40000956-12773&m=dev
  storybook:
    title: Componentes/Tag
    stories:
      - Playground
      - Color
      - Size
      - Icon
  code:
    path: packages/stencil-library/src/components/tag/tag.tsx
lastUpdated: 2026-02-21
---

# ath-tag

Componente de etiquetado visual para estados y clasificaciones breves. Permite configurar color semantico, tamano y un icono opcional junto al texto.

## API publica

### Props
- `color`: `primary | secondary | accent | danger | warning | success | disabled` (default `primary`)
- `size`: `sm | md | lg` (default `md`)
- `icon`: `string`
- `headingText`: `string`

### Eventos
- No expone eventos publicos.

### Metodos
- No expone metodos publicos.

### Slots
- `default`: texto alternativo cuando no se define `heading-text`.

## Variantes de diseno (Figma)
- `color`: `primary`, `secondary`, `accent`, `danger`, `warning`, `success`, `disabled`
- `size`: `sm`, `md`, `lg`
- `theme`: `light`, `dark` (documentado en pagina de uso)

## Accesibilidad
- El contenido textual del tag debe mantenerse corto y comprensible.
- Si el icono aporta significado, debe reforzar (no sustituir) el texto.
- Evitar tags sin contenido visible (`heading-text` o `slot`).

## Buenas practicas de uso
- Utilizar tags para estados o categorias compactas.
- Mantener consistencia semantica entre color y mensaje.
- Evitar parrafos o contenido largo dentro del tag.

## Dependencias
- Depende de `ath-icon`.
- Consumido por: `ath-card-selectable`, `ath-card-thumbnail`.
