---
title: ath-badge
component: ath-badge
status: stable
source:
  figma:
    documentation: https://www.figma.com/design/ts8uR3OicudYSr8L7E0lrd/-v.2.0.0--Aletheia-Web-components?node-id=40012000-9245&m=dev
    componentSet: https://www.figma.com/design/ts8uR3OicudYSr8L7E0lrd/-v.2.0.0--Aletheia-Web-components?node-id=40000448-1841&m=dev
  storybook:
    title: Componentes/Badge
    stories:
      - Playground
      - Type
      - Color
      - Position
  code:
    path: packages/stencil-library/src/components/badge/badge.tsx
lastUpdated: 2026-02-13
---

# ath-badge

Indicador visual para notificaciones, estados o cantidades sobre un elemento contenedor.

## API publica

### Props
- `color`: `accent | danger | disabled | info | success | warning` (default `BADGE_DEFAULT_COLOR`)
- `distanceX`: `number` (default `0`)
- `distanceY`: `number` (default `0`)
- `label`: `any`
- `max`: `number` (default `MAX_VALUE`)
- `position`: `right | top-right`
- `type`: `dot | numeric` (default `BADGE_DEFAULT_TYPE`)
- `value`: `number` (default `0`)

### Eventos
- No expone eventos publicos.

### Metodos
- No expone metodos publicos.

### Partes de Shadow DOM
- No expone `shadow parts`.

## Variantes de diseno (Figma)
- `type`: `dot`, `numeric`
- `color`: `accent`, `danger`, `success`, `warning`, `info`, `disabled`
- `position`: `top-right`, `right`
- `size`: `not-supported`
- `loading`: `not-supported`

## Foundations: Cuando usarlo
- Para mostrar notificaciones o actualizaciones (mensajes no leidos, alertas, novedades).
- Para resaltar estados de un elemento en contexto.
- Para indicar conteos o cantidades sobre un item.

## Foundations: Cuando no usarlo
- Cuando la informacion no aporta valor y se usa solo de forma estetica.
- Cuando se genera saturacion visual por exceso de badges.
- Cuando la informacion no se puede mantener actualizada dinamicamente.
- Cuando pretende reemplazar informacion esencial que debe mostrarse explicitamente.

## Foundations: Buenas practicas
- El badge es decorativo: no debe comunicar significado por si solo.
- Acompanarlo siempre de contexto textual o iconografico.
- En `dot`, el elemento contenedor debe aportar el significado.
- En modo numerico, no superar 999; usar `+max` a partir del umbral.

## Foundations: Jerarquia
- `top-right` para iconos y botones icon-only.
- `right` para items con texto.
- Semantica de color recomendada:
  - `danger`: alertas o cantidades negativas.
  - `success`: estados positivos o ingresos.
  - `warning`: avisos no criticos.
  - `info`: informacion.

## Foundations: Accesibilidad
- Contraste minimo 4.5:1 para texto del badge sobre su fondo.
- Contraste minimo 3:1 entre contenedor del badge y fondo de la superficie.
- No depender solo de color para significado (WCAG 1.4.11).
- No ocultar contenido relevante al superponer el badge.
- El badge no debe recibir foco: el foco es del contenedor interactivo.

## Dependencias
- Depende de: ninguna.
- Consumido por: `ath-menu-horizontal`, `ath-menu-lateral`.
