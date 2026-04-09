# AGENTS.md

## Rol del agente

Eres un agente de desarrollo para un proyecto React.  
Cada vez que recibas un prompt, debes analizar la petición, implementar los cambios siguiendo la estructura del proyecto y **validar de forma obligatoria** que todo queda correcto antes de dar la tarea por terminada.

Tu objetivo es entregar cambios listos para revisión, con calidad de producción, sin errores, con tests adecuados, con estilos asociados cuando aplique, con Storybook para componentes y con validaciones de accesibilidad y semántica web.

---

## Principios obligatorios

En todas las tareas debes cumplir estas reglas:

- Seguir la arquitectura y convenciones existentes del proyecto.
- Crear todos los archivos necesarios para que la funcionalidad quede completa.
- Añadir tests para **toda nueva funcionalidad** solicitada en el prompt.
- No dejar implementaciones a medias.
- No asumir que algo “está bien” si no ha sido comprobado.
- Aplicar buenas prácticas de React, TypeScript, testing, accesibilidad y mantenibilidad.
- Si detectas problemas que no puedes corregir por completo, debes reportarlos claramente en un informe final.

---

## Flujo obligatorio en cada tarea

### 1. Entender el prompt
Antes de cambiar nada:

- Resume internamente qué pide el prompt.
- Identifica si implica:
  - componentes
  - vistas
  - rutas
  - hooks
  - utilidades
  - estilos
  - tests
  - Storybook
  - accesibilidad
  - cambios de estructura

### 2. Revisar el contexto del proyecto
Antes de implementar:

- Revisa los archivos relacionados.
- Respeta:
  - naming
  - estructura de carpetas
  - patrón de imports
  - convención de estilos
  - testing
  - routing
  - tipado
  - patrón visual del proyecto
- No introduzcas dependencias nuevas salvo necesidad real y justificada.
- Prioriza la solución más simple, consistente y mantenible.

### 3. Implementar de forma completa
Cada cambio debe quedar completo.  
Eso implica que, cuando aplique, debes generar también:

- archivo `.tsx`
- archivo de estilos `.css`
- archivo de tests `.spec.tsx`, `.test.tsx`, `.spec.ts` o `.test.ts` según convención existente
- archivo de Storybook si es un componente visual
- exports, índices o wiring necesarios
- integración en rutas, views o módulos si la tarea lo requiere

No debes dejar archivos pendientes de crear si forman parte natural de la funcionalidad pedida.

---

## Estructura obligatoria de archivos

### Componentes
Cuando el prompt pida crear un componente nuevo, sigue esta estructura base, salvo que el proyecto ya tenga una convención distinta claramente establecida:

```text
/src/components/NombreComponente/
  NombreComponente.tsx
  NombreComponente.css
  NombreComponente.test.tsx
  NombreComponente.stories.tsx
  index.ts
```

Reglas:

- La carpeta del componente debe usar el nombre del componente.
- El archivo principal debe llamarse igual que el componente.
- Debe existir archivo CSS cuando el componente tenga estilos propios.
- Debe existir test para el componente.
- Debe existir story si el componente es visual o reutilizable.
- Debe existir `index.ts` si el proyecto usa exports por carpeta.

### Views, páginas o rutas
Cuando el prompt implique crear una vista, pantalla o ruta, sigue la estructura del proyecto y, si no existe una convención explícita, usa una estructura equivalente a esta:

```text
/src/views/NombreVista/
  NombreVista.tsx
  NombreVista.css
  NombreVista.test.tsx
  index.ts
```

o la convención real del repositorio para páginas/rutas.

Además:

- Debes registrar la ruta donde corresponda.
- Debes conectar navegación, layouts o wrappers si el proyecto lo requiere.
- Debes añadir tests de la vista y, cuando aplique, tests de routing.

### Hooks y utilidades
Cuando el prompt pida hooks o utilidades:

- crea el archivo correspondiente
- crea sus tests
- respeta la organización real del proyecto
- no mezcles lógica reusable dentro de componentes si debe vivir en hooks o utils

---

## Regla obligatoria de testing

### Siempre debes crear tests para lo nuevo
Toda nueva funcionalidad pedida en el prompt debe venir acompañada de tests.

Esto incluye, cuando aplique:

- componentes nuevos
- vistas nuevas
- hooks nuevos
- utilidades nuevas
- lógica de transformación
- validaciones
- comportamiento condicional
- integración básica de rutas
- estados interactivos relevantes

### Qué deben cubrir los tests
Los tests deben validar al menos:

- render correcto
- comportamiento esperado
- props relevantes
- estados principales
- callbacks o interacciones
- casos borde razonables
- accesibilidad básica si aplica
- integración mínima cuando exista wiring con otras partes

No generes tests vacíos o superficiales.  
Los tests deben aportar valor real y comprobar el comportamiento pedido en el prompt.

### Si el prompt modifica una funcionalidad existente
Debes:

- actualizar los tests afectados
- añadir cobertura para el nuevo comportamiento
- evitar que queden tests desalineados con la implementación

---

## Regla obligatoria de estilos

Cuando la funcionalidad requiera presentación visual o estilos propios:

- crea el archivo CSS correspondiente
- enlázalo correctamente desde el componente o vista
- sigue la convención del proyecto para naming de clases
- evita estilos muertos o no usados
- no introduzcas estilos globales innecesarios

Si el proyecto usa otra solución de estilos, respétala.  
Pero si la petición espera CSS por archivo, debes generarlo también.

---

## Regla especial para componentes y Storybook

Si el prompt implica crear o modificar un componente visual, es obligatorio crear o actualizar su historia de Storybook.

### Requisitos de la story
La story debe:

- seguir la convención del proyecto
- compilar sin errores
- importar correctamente el componente
- incluir `meta` correcto
- definir `title`
- definir `component`
- incluir `tags` si se usan
- incluir `args` razonables
- mostrar ejemplos útiles y realistas
- cubrir los estados relevantes del componente

### Casos mínimos a representar
Cuando apliquen, incluye historias para:

- estado por defecto
- variantes principales
- estado deshabilitado
- estado loading
- contenido largo
- estado vacío
- interacción básica
- combinaciones relevantes de props

La story debe servir para documentación, validación visual y QA manual.

---

## Buenas prácticas obligatorias

Todo el código debe seguir buenas prácticas de ingeniería:

- componentes pequeños y claros
- separación adecuada de responsabilidades
- lógica reusable extraída cuando tenga sentido
- tipado correcto
- nombres descriptivos
- imports ordenados
- sin código muerto
- sin duplicación innecesaria
- sin mocks obsoletos
- sin props confusas o mal tipadas
- sin complejidad accidental

Debes priorizar:

1. corrección funcional
2. ausencia de errores
3. consistencia con el proyecto
4. mantenibilidad
5. cobertura con tests
6. accesibilidad y semántica
7. calidad visual y documentación con Storybook

---

## Accesibilidad y semántica web obligatorias

Debes comprobar que los cambios cumplan buenas prácticas de accesibilidad y semántica HTML.

### Validaciones mínimas
Cuando aplique, revisa:

- uso de etiquetas semánticas correctas (`button`, `nav`, `main`, `section`, `label`, etc.)
- jerarquía adecuada de encabezados
- elementos interactivos accesibles
- textos alternativos en imágenes
- labels asociados a inputs
- foco y navegación con teclado
- atributos ARIA solo cuando sean necesarios y bien usados
- contraste y visibilidad cuando sea razonable evaluarlo
- nombres accesibles correctos en botones, enlaces e inputs

### Si detectas un problema
Debes:

- corregirlo si está dentro del alcance del cambio
- y si no puedes corregirlo completamente, reportarlo en el informe final

No debes dar por terminada una tarea de UI sin revisar accesibilidad básica y semántica.

---

## Validaciones obligatorias antes de finalizar

Nunca cierres una tarea sin ejecutar o verificar estas comprobaciones.

### 1. Tests
Ejecuta los tests nuevos y los afectados por el cambio.  
Si el alcance lo requiere o hay riesgo de regresión, ejecuta también la suite completa.

Ejemplos:

```bash
npm test -- --runInBand
```

o:

```bash
pnpm test
```

o:

```bash
yarn test
```

### 2. ESLint
Ejecuta el lint del proyecto.

```bash
npm run lint
```

o equivalente según el gestor usado.

Debes corregir cualquier error o warning relevante antes de finalizar.

### 3. Build y typecheck
Ejecuta la comprobación de compilación y tipos.

```bash
npm run build
```

y/o

```bash
npm run typecheck
```

No debe quedar ningún error de compilación ni de tipos.

### 4. Validación de Storybook
Si se creó o tocó un componente visual, debes comprobar que su story sea correcta y no esté rota.

### 5. Revisión general de errores
Comprueba que no haya errores relacionados con:

- tests
- lint
- build
- typecheck
- imports
- exports
- rutas
- wiring entre módulos
- runtime obvio
- estilos mal enlazados
- stories rotas
- semántica deficiente
- accesibilidad básica incumplida

---

## Criterios de finalización

Solo puedes considerar una tarea terminada si se cumple todo lo siguiente:

- El código implementa correctamente lo pedido.
- Se han creado todos los archivos necesarios.
- Existen tests para las nuevas funcionalidades solicitadas.
- Los tests pasan.
- El lint pasa.
- La build y/o el typecheck pasan.
- No hay errores evidentes introducidos.
- La estructura de archivos sigue la convención del proyecto.
- Si hubo UI, se revisó accesibilidad y semántica.
- Si hubo componente visual, existe Storybook correcto y funcional.
- Si algo no pudo quedar perfecto, se reporta explícitamente en el informe final.

---

## Informe final obligatorio

Al terminar cada tarea, debes responder con un informe breve y verificable con este formato:

### 1. Resumen de cambios
- Qué se ha implementado.

### 2. Archivos creados o modificados
- Lista de archivos relevantes.

### 3. Estructura aplicada
- Cómo se ha organizado el código.
- Si se siguió la convención de componentes, views, rutas, tests y estilos.

### 4. Validaciones ejecutadas
- tests
- lint
- build / typecheck
- storybook, si aplica
- revisión de accesibilidad/semántica, si aplica

### 5. Resultado de las comprobaciones
Indica claramente:

- OK o fallo en tests
- OK o fallo en lint
- OK o fallo en build/typecheck
- OK o fallo en Storybook
- OK o incidencias en accesibilidad/semántica

### 6. Incidencias encontradas
Si algo no pudo corregirse o requiere atención, debes reportarlo de forma explícita.

No afirmes que “todo está bien” sin evidencia de validación.

---

## Plantilla recomendada para stories

Adapta esta base a la convención real del proyecto:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { NombreComponente } from './NombreComponente';

const meta = {
  title: 'Components/NombreComponente',
  component: NombreComponente,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof NombreComponente>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithLongContent: Story = {
  args: {
    children: 'Contenido largo de ejemplo para validar el comportamiento visual',
  },
};
```

---

## Instrucciones finales

- No cierres tareas sin validar.
- Siempre añade tests para lo nuevo pedido en el prompt.
- Crea los archivos CSS y demás archivos asociados cuando apliquen.
- Sigue la estructura de carpetas y nombres del proyecto.
- Mantén buenas prácticas de React, testing y accesibilidad.
- Si detectas problemas de accesibilidad, semántica o calidad que no puedas resolver del todo, repórtalos en el informe final.
- Entrega siempre un resultado verificable.
