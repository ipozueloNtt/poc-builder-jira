# AGENT-simple.md

## Rol

Eres un agente de IA que trabaja dentro de este proyecto React.

Tu objetivo es hacer cambios pequeños y seguros, sin ejecutar procesos pesados ni tareas que ralenticen el flujo.

---

## Reglas principales

1. Haz solo lo que pide el prompt.
2. No instales paquetes ni dependencias.
3. No ejecutes tests.
4. No ejecutes build.
5. No lances procesos largos o pesados.
6. No cambies archivos no relacionados.
7. Mantén el estilo y estructura ya existentes del proyecto.
8. Antes de terminar, revisa que no hayas dejado errores obvios en el código.
9. Si el prompt pide crear un componente, crea también una historia simple de Storybook si el proyecto ya usa Storybook.
10. Si falta contexto, revisa primero el código existente antes de inventar estructuras nuevas.

---

## Checklist rápida para cada prompt

### 1. Entender la tarea
- Lee el prompt.
- Identifica qué archivo o archivos debes tocar.
- Limita el cambio al alcance pedido.

### 2. Revisar el contexto mínimo
Antes de editar:
- mira la estructura de carpetas relacionada,
- revisa un componente parecido si existe,
- comprueba nombres, imports, estilos y convención de archivos.

### 3. Implementar el cambio
- haz el cambio solicitado,
- reutiliza patrones ya existentes,
- evita complejidad innecesaria,
- no refactorices partes no pedidas.

### 4. Revisión rápida obligatoria
Antes de dar la tarea por terminada, comprueba manualmente:
- que no haya imports rotos,
- que no haya exports rotos,
- que no haya props mal nombradas,
- que no haya errores de sintaxis evidentes,
- que no haya rutas o archivos inventados sin confirmar,
- que no hayas dejado código a medias.

---

## Regla especial para componentes

Si el prompt es crear un componente:
1. crea el componente con la convención del proyecto,
2. define props claras,
3. mantén TSX ,
4. usa nombres coherentes,
5. crea una historia de Storybook siempre que se genere un componente visual.
6. crea el test unitario del componente.

---

## Regla especial para Storybook

Si el proyecto ya tiene Storybook y creas un componente, añade una historia mínima que incluya:

- `meta` correcto,
- `title`,
- `component`,
- una historia `Default`,
- ejemplos con `args` simples y realistas.

---

## Qué NO debes hacer

- No instalar dependencias.
- No ejecutar `npm install`, `pnpm install` o `yarn`.
- No correr build.
- No correr procesos de larga duración.
- No tocar configuración global salvo que el prompt lo pida.
- No inventar librerías ni utilidades que no existan.

---

## Definición de terminado

Una tarea se considera terminada cuando:
- el cambio pedido está hecho,
- el código se ve coherente con el proyecto,
- no hay errores obvios a simple revisión,
- los imports y exports parecen correctos,
- el test unitario pasa,
- y, si aplica, el componente tiene su historia básica de Storybook.

---

## Formato de respuesta al terminar

Responde siempre de forma breve con:

- Cambios realizados
- Archivos creados o modificados
- Revisión rápida completada
- Storybook creada
- test del nuevo componente

Ejemplo:

- Cambios realizados:
  - Se creó el componente solicitado.
- Archivos modificados:
  - `src/components/Button/Button.tsx`
  - `src/components/Button/Button.stories.tsx`
- Revisión rápida:
  - Imports y sintaxis revisados
- Storybook:
  - Sí

---

## Instrucción final

Para cada prompt:
- revisa que no haya errores obvios,
- no ejecutes tareas pesadas,
- revisa si tiene hisotria el nuevo componente
- revisa que el test está pasando