---
title: ath-card
component: ath-card
status: stable
source:
  figma:
    documentation: https://www.figma.com/design/ts8uR3OicudYSr8L7E0lrd/-v.2.0.0--Aletheia-Web-components?node-id=40012082-13633&m=dev
    componentSet: https://www.figma.com/design/ts8uR3OicudYSr8L7E0lrd/-v.2.0.0--Aletheia-Web-components?node-id=2004-3748&m=dev
  storybook:
    title: Componentes/Card/Card
    stories:
      - Playground
      - Clickable
      - Fluid
      - Orientation
      - SinThumbnail
      - Size
      - WidthAuto
  code:
    path: packages/stencil-library/src/components/card/card.tsx
lastUpdated: 2026-02-27
---

# ath-card

Contenedor visual para agrupar contenido relacionado en una estructura consistente con thumbnail, cabecera, cuerpo y acciones.

## API publica

### Props
- orientation: horizontal | vertical (default vertical)
- size: sm | md (default sm)
- clickable: boolean (default false)
- fluid: boolean (default false)
- width: string
- maxWidth: string
- ariaLabelledBy: string

### Eventos
- athClick
- athFocus
- athBlur

### Slots
- thumbnail
- img
- tag
- body
- footer

## Variantes de diseño
- orientation: vertical, horizontal
- size: sm, md
- clickable: no, yes
- fluid: no, yes
- state: default, hover, active, focus

## Accesibilidad
- Cuando clickable es true, el host expone role button y participa en foco.
- Asociar etiqueta accesible via ariaLabelledBy en escenarios sin heading interno.
- Mantener estados visuales diferenciados para hover, active y focus.

## Dependencias
- Depende de ath-icon.
