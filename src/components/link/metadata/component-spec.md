---
title: ath-link
component: ath-link
status: stable
source:
  figma:
    documentation: https://www.figma.com/design/ts8uR3OicudYSr8L7E0lrd/-v.2.0.0--Aletheia-Web-components?node-id=40012383-214924&m=dev
    extractionPrompt: figma-design-doc-to-operational-metadata
  storybook:
    title: Componentes/Link
    url: https://aletehia.vercel.app/?path=/docs/componentes-link--docs
    docsJson: https://aletehia.vercel.app/docs.json
    canonicalStoryId: componentes-link--docs
    mcpStatus: gap-manifest-404
    fallbackSources:
      - packages/stencil-library/storybook-static/index.json
      - packages/stencil-library/src/components/link/stories/link.stories.tsx
      - packages/stencil-library/src/components/link/stories/link.argtypes.ts
  code:
    path: packages/stencil-library/src/components/link/link.tsx
    docsJson: packages/stencil-library/docs.json
lastUpdated: 2026-02-19
---

# ath-link

Componente de enlace interactivo para navegacion interna o externa con soporte de icono, tamano y atributos ARIA.

## API publica

### Props
- `ariaDescribedby`: `string`
- `ariaLabel`: `string`
- `ariaLabelledby`: `string`
- `disabled`: `boolean`
- `externalLabel`: `string`
- `icon`: `string`
- `iconAriaLabel`: `string`
- `linkHref`: `string`
- `linkTarget`: `self | parent | blank | top` (default `blank`)
- `size`: `sm | md | lg` (default `md`)
- `underline`: `boolean` (default `true`)

### Eventos
- `athClick`
- `athFocus`
- `athBlur`

### Slots
- `default`: texto visible del enlace.

## Storybook operativo

### Stories
- `componentes-link--playground` - Playground
- `componentes-link--con-icono` - Con Icono
- `componentes-link--disabled` - Disabled
- `componentes-link--sin-subrayado` - Sin Subrayado
- `componentes-link--size` - Size

### Arg validation
- `coveredProps`: ariaDescribedby, ariaLabel, ariaLabelledby, disabled, icon, iconAriaLabel, linkHref, linkTarget, size, underline
- `missingProps`: externalLabel
- `invalidArgs`: ninguno

## Foundations (Figma)

### Referencias
- `figma:documentation-link-40012383:214924` (content)
- `figma:documentation-link-size-example-40012481:26086` (layout)
- `figma:documentation-link-state-example-40012481:26888` (a11y)
- `figma:documentation-link-token-snapshot` (tokens)

### Tokens usados
- color: ath/color/fg/primary/default, ath/color/fg/primary/hovered, ath/color/icon/primary/default, ath/color/icon/primary/hovered, ath/color/border/focus
- spacing: ath/spacing/between/100
- typography: ath/font/family/primary, ath/font/size/body/sm, ath/font/size/body/md, ath/font/weight/medium
- shadow: ath/box-shadow/drop/clear/focus

### Variantes semanticas
- state/default, state/hover, state/focus
- size/sm, size/md

### Theming
- mode: `light`
- binding de color/icon/focus/spacing/typography con tokens de Figma.

## Accesibilidad
- Role: `link`
- Soporta `aria-label`, `aria-labelledby`, `aria-describedby`.
- En `linkTarget=blank` agrega etiqueta adicional para contexto de enlace externo.
- Mantiene foco natural; para casos icon-only debe proveerse etiqueta accesible.

## Runtime hints
- planner: `layoutRole=navigation`, `regionAffinity=[content,list-item]`, `priority=medium`
- resolver: `allowedRegions=[content,list-item]`, `defaultRegion=content`
- assembler: `nodeType=component`, `maxDepth=1`, `deterministicOrder=true`

## Dependencias
- Usa: `ath-icon`
- Consumidores detectados en `docs.json`: ninguno

## Gaps documentados
- Storybook MCP no disponible para este entorno (error `manifest 404`).
- `canonicalStoryId` y stories resueltos desde build local de Storybook + source de stories.
