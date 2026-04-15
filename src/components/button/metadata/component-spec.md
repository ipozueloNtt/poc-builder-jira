---
title: ath-button
component: ath-button
status: stable
source:
  figma:
    documentation: https://www.figma.com/design/ts8uR3OicudYSr8L7E0lrd/-v.2.0.0--Aletheia-Web-components?node-id=40012058-7091&m=dev
    componentSet: https://www.figma.com/design/ts8uR3OicudYSr8L7E0lrd/-v.2.0.0--Aletheia-Web-components?node-id=4378-1624&m=dev
  storybook:
    title: Componentes/Button
    stories:
      - Playground
      - Color
      - Size
      - Clear
      - Icon Position
      - Disabled
      - Autofocus
      - Full Width
  code:
    path: packages/stencil-library/src/components/button/button.tsx
lastUpdated: 2026-02-13
---

# ath-button

Componente de accion principal/secundaria con soporte de tamano, icono, estado deshabilitado, modo clear y ancho completo.

## API publica

### Props
- `color`: `primary | secondary` (default `primary`)
- `size`: `xs | sm | md | lg` (default `md`)
- `type`: `button | submit | reset` (default `button`)
- `iconPosition`: `none | left | right | icon-only` (default `none`)
- `icon`: `string`
- `clear`: `boolean` (default `false`)
- `fullWidth`: `boolean` (default `false`)
- `disabled`: `boolean` (default `false`)

### Eventos
- `athClick`
- `athFocus`
- `athBlur`

### Metodos
- `setFocus(): Promise<void>`

### Partes de Shadow DOM
- `button-styles`

## Variantes de diseno (Figma)
- `color`: `primary`, `secondary`
- `clear`: `no`, `yes`
- `size`: `xs`, `sm`, `md`, `lg`
- `icon-position`: `none`, `left`, `right`, `icon-only`
- `state`: `default`, `hover`, `active`, `focus`
- `disabled`: `no`, `yes`

## Accesibilidad
- El host expone `role="button"`.
- Soporta atributos ARIA desde Storybook (`aria-label`, `aria-controls`, `aria-describedby`, `aria-expanded`, `aria-haspopup`, `aria-pressed`).
- Gestion de teclado en componente para `Enter`/`Space`.
- En estado `disabled`, se evita interaccion y se ajusta `tabindex`.

## Buenas practicas de uso
- Usar `color="primary"` para accion principal de pantalla.
- Usar `secondary` o `clear` para acciones secundarias.
- Reservar `icon-only` para acciones reconocibles con `aria-label` obligatorio.
- Evitar mas de una accion primaria en el mismo bloque visual.

## Dependencias
- Depende de `ath-icon`.
- Consumido por: `ath-calendar`, `ath-datepicker`, `ath-datepicker-range`, `ath-input-counter`, `ath-menu-button`, `ath-pagination`.
