---
title: ath-card-selectable
component: ath-card-selectable
status: stable
source:
  figma:
    documentation: https://www.figma.com/design/ts8uR3OicudYSr8L7E0lrd/-v.2.0.0--Aletheia-Web-components?node-id=40008130-6501&m=dev
    componentSet: https://www.figma.com/design/ts8uR3OicudYSr8L7E0lrd/-v.2.0.0--Aletheia-Web-components?node-id=40007878-159810&m=dev
  storybook:
    title: Componentes/Card Selectable/Card Selectable
    stories:
      - Playground
      - ConTag
      - Disabled
      - Size
      - Type
  code:
    path: packages/stencil-library/src/components/card-selectable/card-selectable.tsx
lastUpdated: 2026-02-27
---

# ath-card-selectable

Card interactiva para seleccion unica o multiple con contenido enriquecido (tag, overline, heading, subtitle y body slot).

## API publica

### Props
- disabled: boolean (default false)
- headingText: string
- overline: string
- selected: boolean (default false)
- size: sm | md (default sm)
- subtitle: string
- tag: string
- type: single | multiselect (default single)

### Eventos
- athChange: emite el elemento seleccionado tras interaccion por click o teclado.
- athFocus: emite cuando la card recibe foco.
- athBlur: emite cuando la card pierde foco.

### Metodos
- select(firstLoad: boolean): Promise<void>
- unselect(): Promise<void>

### Slots
- body: contenido adicional de soporte dentro de la card.

## Variantes de diseno (Figma)
- size: sm, md
- state: default, hover, active, focus
- type: single select, multiselect
- selected: false, true
- disabled: false, true

## Accesibilidad
- Gestiona role dinamico: radio (single) o checkbox (multiselect).
- Soporta activacion por teclado con Enter y Space.
- Expone aria-checked y aria-disabled segun estado.
- Requiere etiqueta visible o aria-label para contexto semantico claro.

## Buenas practicas de uso
- Usar ath-card-selectable-group para navegacion por teclado y coordinacion de seleccion entre cards.
- Evitar mezclar type multiselect en escenarios de eleccion exclusiva.
- Mantener textos breves y consistentes entre variantes para comparacion rapida.

## Dependencias
- Depende de ath-tag y ath-icon.
