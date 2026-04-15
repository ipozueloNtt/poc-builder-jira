import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { withActions } from 'storybook/actions/decorator';
import { TableSize, TableColor, TableFrozen, TableStriping, TableSelectable, TableSelectionChangeEvent, TableClickEvent } from '../table.model';

type TableArgs = {
  'color': string;
  'frozen': string;
  'size': string;
  'striped': string;
  'selectable': string;
  'clickable': boolean;
  'no-select-all': boolean;
  'header': string;
  'body': string;
  'footer': string;
  'aria-label': string;
  'aria-labelledby': string;
  'tabindex': number;
  'refresh': () => void;
  'athSelectionChange': (event: CustomEvent<TableSelectionChangeEvent>) => void;
  'athTableClick': (event: CustomEvent<TableClickEvent>) => void;
};

const defaultTableArgs: TableArgs = {
  'color': TableColor.Primary,
  'frozen': TableFrozen.None,
  'size': TableSize.Small,
  'striped': TableStriping.None,
  'selectable': TableSelectable.None,
  'clickable': false,
  'no-select-all': false,
  'header': undefined,
  'body': undefined,
  'footer': undefined,
  'aria-label': 'Listado de usuarios',
  'aria-labelledby': undefined,
  'tabindex': 0,
  'refresh': () => {},
  'athSelectionChange': () => {},
  'athTableClick': () => {},
};

const meta: Meta<TableArgs> = {
  title: 'Componentes/Table/Table',
  component: 'ath-table',
  argTypes: {
    'color': {
      control: 'inline-radio',
      options: Object.values(TableColor),
      description: 'Apariencia del fondo de la tabla',
      table: {
        type: { summary: 'TableAppearanceType' },
        defaultValue: { summary: defaultTableArgs.color },
      },
    },
    'frozen': {
      control: 'inline-radio',
      options: Object.values(TableFrozen),
      description: 'Posición de columna fija',
      table: {
        type: { summary: 'TableFrozenType' },
        defaultValue: { summary: defaultTableArgs.frozen },
      },
    },
    'size': {
      control: 'inline-radio',
      options: Object.values(TableSize),
      description: 'Altura de las filas',
      table: {
        type: { summary: 'TableSizeType' },
        defaultValue: { summary: defaultTableArgs.size },
      },
    },
    'striped': {
      control: 'inline-radio',
      options: Object.values(TableStriping),
      description: 'Patrón de rayas de cebra',
      table: {
        type: { summary: 'TableStripingType' },
        defaultValue: { summary: defaultTableArgs.striped },
      },
    },
    'selectable': {
      control: 'inline-radio',
      options: Object.values(TableSelectable),
      description: 'Modo de selección de filas',
      table: {
        type: { summary: 'TableSelectableType' },
        defaultValue: { summary: defaultTableArgs.selectable },
      },
    },
    'clickable': {
      control: 'boolean',
      description: 'Añade el espacio para el icono de acción al final de cada fila',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: defaultTableArgs.clickable.toString() },
      },
    },
    'no-select-all': {
      control: 'boolean',
      description: 'Oculta el checkbox de seleccionar todo en la cabecera cuando `selectable="multiple"`',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: defaultTableArgs['no-select-all'].toString() },
      },
    },
    'header': {
      control: 'text',
      description: 'Contenido de la cabecera de la tabla. El componente `ath-table-header` incorpora este slot por defecto.',
      table: { category: 'SLOTS', type: { summary: 'html' } },
    },
    'body': {
      control: 'text',
      description: 'Contenido del cuerpo de la tabla. El componente `ath-table-body` incorpora este slot por defecto.',
      table: { category: 'SLOTS', type: { summary: 'html' } },
    },
    'footer': {
      control: 'text',
      description: 'Contenido del pie de la tabla',
      table: { category: 'SLOTS', type: { summary: 'html' } },
    },
    'aria-label': {
      control: 'text',
      description: 'Etiqueta accesible que describe el propósito de la tabla',
      table: {
        category: 'ACCESSIBILITY',
        type: { summary: 'string' },
      },
    },
    'aria-labelledby': {
      control: 'text',
      description: 'Referencia al elemento (id) que aporta la etiqueta accesible',
      table: {
        category: 'ACCESSIBILITY',
        type: { summary: 'string' },
      },
    },
    'tabindex': {
      control: 'number',
      description: 'Indica si la tabla es accesible mediante teclado. Por defecto, el valor es 0, lo que permite que la tabla sea enfocada. Un valor de -1 la hace no enfocable.',
      table: {
        category: 'ACCESSIBILITY',
        type: { summary: 'number' },
        defaultValue: { summary: defaultTableArgs.tabindex.toString() },
      },
    },
    'refresh': {
      name: 'refresh()',
      description: 'Método para refrescar la tabla. Se utiliza para actualizar la tabla cuando se modifica dinámicamente su contenido.',
      table: {
        category: 'METHODS',
        type: { summary: 'function' },
        defaultValue: { summary: 'undefined' },
      },
    },
    'athSelectionChange': {
      action: 'athSelectionChange',
      description: 'Evento que se dispara cuando cambia la selección de filas',
      table: {
        category: 'EVENTS',
        type: { summary: 'CustomEvent<TableSelectionChangeEvent>' },
        defaultValue: { summary: 'undefined' },
      },
    },
    'athTableClick': {
      action: 'athTableClick',
      description: 'Evento que se dispara desde la tabla cuando se hace clic en una fila clickable',
      table: {
        category: 'EVENTS',
        type: { summary: 'CustomEvent<TableClickEvent>' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: { ...defaultTableArgs },
  parameters: {
    docs: {
      subtitle: 'Componente de tabla para mostrar datos estructurados en formato de filas y columnas.',
    },
    actions: {
      handles: ['athSelectionChange', 'athTableClick'],
    },
    controls: { expanded: true },
  },
  decorators: [withActions],
};
export default meta;

type Story = StoryObj<TableArgs>;

const DEFAULT_HEADER = `
      <ath-table-header>
        <ath-table-header-item>ID</ath-table-header-item>
        <ath-table-header-item>Nombre</ath-table-header-item>
        <ath-table-header-item>Email</ath-table-header-item>
        <ath-table-header-item>Estado</ath-table-header-item>
      </ath-table-header>`;

const DEFAULT_BODY = `
      <ath-table-body>
        <ath-table-row value="{ id: 1, name: 'Juan Pérez', email: 'juan.perez@ibercaja.es', status: 'Activo' }">
          <ath-table-row-item>1</ath-table-row-item>
          <ath-table-row-item>Juan Pérez</ath-table-row-item>
          <ath-table-row-item>juan.perez@ibercaja.es</ath-table-row-item>
          <ath-table-row-item><ath-tag>Activo</ath-tag></ath-table-row-item>
        </ath-table-row>
        <ath-table-row value="{ id: 2, name: 'María López', email: 'maria.lopez@ibercaja.es', status: 'Inactivo' }">
          <ath-table-row-item>2</ath-table-row-item>
          <ath-table-row-item>María López</ath-table-row-item>
          <ath-table-row-item>maria.lopez@ibercaja.es</ath-table-row-item>
          <ath-table-row-item><ath-tag color="secondary">Inactivo</ath-tag></ath-table-row-item>
        </ath-table-row>
        <ath-table-row value="{ id: 3, name: 'Carlos Gómez', email: 'carlos.gomez@ibercaja.es', status: 'Pendiente' }">
          <ath-table-row-item>3</ath-table-row-item>
          <ath-table-row-item>Carlos Gómez</ath-table-row-item>
          <ath-table-row-item>carlos.gomez@ibercaja.es</ath-table-row-item>
          <ath-table-row-item><ath-tag color="accent">Pendiente</ath-tag></ath-table-row-item>
        </ath-table-row>
      </ath-table-body>`;

const omittedAttributes = ['header', 'body', 'footer', 'refresh', 'athSelectionChange', 'athTableClick'];

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, omittedAttributes);

    return `
  <div style="width: 100%; position: relative;">
    <ath-table ${attributes}>
      ${args.header || DEFAULT_HEADER}
      ${args.body || DEFAULT_BODY}
      ${args.footer || ''}
    </ath-table>
  </div>`;
  },
  args: { ...defaultTableArgs },
  tags: ['!autodocs'],
};

export const Sizes: Story = {
  name: 'Tamaños',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['size', ...omittedAttributes]);
    const sizes = Object.values(TableSize);

    return sizes
      .map(
        size => `
  <div class="story__item">
    <div class="story__item__label">size: ${size}</div>
    <ath-table size="${size}" ${attributes}>
      ${args.header || DEFAULT_HEADER}
      ${args.body || DEFAULT_BODY}
      ${args.footer || ''}
    </ath-table>
  </div>
`,
      )
      .join('');
  },
  argTypes: {
    size: {
      control: false,
    },
  },
  parameters: {
    storyClass: 'flex-col',
  },
};

export const Colors: Story = {
  name: 'Colores',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['color', ...omittedAttributes]);
    const colors = Object.values(TableColor);

    return colors
      .map(
        color => `
  <div class="story__item" style="padding: 20px;">
    <div class="story__item__label">color: ${color}</div>
    <ath-table color="${color}" ${attributes}>
      ${args.header || DEFAULT_HEADER}
      ${args.body || DEFAULT_BODY}
      ${args.footer || ''}
    </ath-table>
  </div>
`,
      )
      .join('');
  },
  argTypes: {
    color: {
      control: false,
    },
  },
  parameters: {
    storyClass: 'flex-col ath-color-bg--400 ath-border-radius--sm',
  },
};

export const ColumnFixed: Story = {
  name: 'Columna fija',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['frozen', ...omittedAttributes]);
    const columnFixedOptions = [TableFrozen.First, TableFrozen.Last];

    return columnFixedOptions
      .map(
        frozen => `
  <div class="ath-scroll" style="overflow-x: auto; max-width: 400px;">
    <div class="story__item__label">frozen: ${frozen}</div>
    <ath-table frozen="${frozen}" ${attributes}>
      ${args.header || DEFAULT_HEADER}
      ${args.body || DEFAULT_BODY}
      ${args.footer || ''}
    </ath-table>
  </div>`,
      )
      .join('');
  },
  argTypes: {
    frozen: {
      control: false,
    },
  },
  parameters: {
    storyClass: 'justify-around',
    docs: {
      description: {
        story: 'La opción de columna fija `frozen` permite mantener visible una columna al desplazarse horizontalmente en tablas con muchas columnas.',
      },
    },
  },
};

export const Striping: Story = {
  name: 'Patrón de cebra',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['striped', ...omittedAttributes]);
    const stripingOptions = Object.values(TableStriping);

    return stripingOptions
      .map(
        striping => `
  <div class="story__item">
    <div class="story__item__label">striped: ${striping}</div>
    <ath-table striped="${striping}" ${attributes}>
      ${args.header || DEFAULT_HEADER}
      ${args.body || DEFAULT_BODY}
      ${args.footer || ''}
    </ath-table>
  </div>
`,
      )
      .join('');
  },
  argTypes: {
    striped: {
      control: false,
    },
  },
  parameters: {
    storyClass: 'flex-col',
    docs: {
      description: {
        story: 'El patrón de cebra `striped` ayuda a diferenciar visualmente las filas o columnas, mejorando la legibilidad de los datos.',
      },
    },
  },
};

export const CustomWidthAndAlignment: Story = {
  name: 'Anchos y alineaciones personalizados',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, omittedAttributes);
    return `
  <div class="story__item">
    <div class="story__item__label">Tabla con anchos y alineaciones personalizados</div>
    <ath-table ${attributes}>
      <ath-table-header>
        <ath-table-header-item cell-width="80px">ID</ath-table-header-item>
        <ath-table-header-item cell-width="200px">Nombre</ath-table-header-item>
        <ath-table-header-item cell-width="250px" alignment="center">Email</ath-table-header-item>
        <ath-table-header-item alignment="right">Estado</ath-table-header-item>
      </ath-table-header>
      <ath-table-body>
        <ath-table-row>
          <ath-table-row-item>1</ath-table-row-item>
          <ath-table-row-item>Juan Pérez</ath-table-row-item>
          <ath-table-row-item>juan.perez@ibercaja.es</ath-table-row-item>
          <ath-table-row-item><ath-tag>Activo</ath-tag></ath-table-row-item>
        </ath-table-row>
        <ath-table-row>
          <ath-table-row-item>2</ath-table-row-item>
          <ath-table-row-item>María López</ath-table-row-item>
          <ath-table-row-item>maria.lopez@ibercaja.es</ath-table-row-item>
          <ath-table-row-item><ath-tag color="secondary">Inactivo</ath-tag></ath-table-row-item>
        </ath-table-row>
      </ath-table-body>
    </ath-table>
  </div>
`;
  },
  argTypes: {
    header: {
      table: {
        disable: true,
      },
    },
    body: {
      table: {
        disable: true,
      },
    },
    footer: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Se pueden personalizar los anchos de columna usando el atributo `cell-width` y la alineación con `alignment` en los elementos del encabezado. Puedes consultar más detalles en la documentación de [Table Header Item](/docs/componentes-table-table-header-item--docs).',
      },
    },
  },
};

export const WithMenuButton: Story = {
  name: 'Con menú contextual',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, omittedAttributes);
    return `
  <div class="story__item">
    <div class="story__item__label">Tabla con menú contextual</div>
    <ath-table ${attributes}>
      <ath-table-header>
        <ath-table-header-item>ID</ath-table-header-item>
        <ath-table-header-item>Nombre</ath-table-header-item>
        <ath-table-header-item>Email</ath-table-header-item>
        <ath-table-header-item has-interactivity="true" aria-label="Acciones">
          <span class="sr-only">Acciones</span>
        </ath-table-header-item>
      </ath-table-header>
      <ath-table-body>
        <ath-table-row>
          <ath-table-row-item>1</ath-table-row-item>
          <ath-table-row-item>Juan Pérez</ath-table-row-item>
          <ath-table-row-item>juan.perez@ibercaja.es</ath-table-row-item>
          <ath-table-row-item>
            <ath-menu-button color="secondary" alignment="right" clear="true" icon="menu" ath-aria-label="Menú de opciones">
              <ath-menu-button-item icon="show" text="Ver detalle"></ath-menu-button-item>
              <ath-menu-button-item icon="pdf_file" text="Descargar justificante"></ath-menu-button-item>
              <ath-menu-button-item icon="operate" text="Cambiar cuenta de cargo"></ath-menu-button-item>
            </ath-menu-button>
          </ath-table-row-item>
        </ath-table-row>
        <ath-table-row>
          <ath-table-row-item>2</ath-table-row-item>
          <ath-table-row-item>María López</ath-table-row-item>
          <ath-table-row-item>maria.lopez@ibercaja.es</ath-table-row-item>
          <ath-table-row-item>
            <ath-menu-button color="secondary" alignment="right" clear="true" icon="menu" ath-aria-label="Menú de opciones">
              <ath-menu-button-item icon="show" text="Ver detalle"></ath-menu-button-item>
              <ath-menu-button-item icon="signature" text="Firmar"></ath-menu-button-item>
            </ath-menu-button>
          </ath-table-row-item>
        </ath-table-row>
      </ath-table-body>
    </ath-table>
  </div>`;
  },
  argTypes: {
    header: {
      table: {
        disable: true,
      },
    },
    body: {
      table: {
        disable: true,
      },
    },
    footer: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    storyClass: 'flex-col',
    docs: {
      description: {
        story:
          'Añade el atributo `has-interactivity` en `ath-table-header-item` para indicar que la columna contiene elementos interactivos (como un menú contextual), lo que deshabilitará los eventos de clic de fila en esas celdas.',
      },
    },
  },
};

export const SelectionSingle: Story = {
  name: 'Selección simple',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['selectable', ...omittedAttributes]);
    return `
  <div class="story__item">
    <div class="story__item__label">Tabla con selección simple</div>
    <ath-table id="tableSingle" selectable="${TableSelectable.Single}" ${attributes}>
      ${args.header || DEFAULT_HEADER}
      ${args.body || DEFAULT_BODY}
      ${args.footer || ''}
    </ath-table>
    <div id="singleOutput" class="ath-body--md ath-color-text--default">Seleccionado: []</div>
  </div>
  <script>
    (function(){
      const t = document.getElementById('tableSingle');
      const out = document.getElementById('singleOutput');
      if(t && out){
        t.addEventListener('athSelectionChange', function(e){
          const d = e.detail || { selectedIndexes: [] };
          out.textContent = 'Seleccionado: [' + (d.selectedIndexes||[]).join(', ') + ']';
        });
      }
    })();
  </script>`;
  },
  argTypes: {
    selectable: { control: false },
    header: { table: { disable: true } },
    body: { table: { disable: true } },
    footer: { table: { disable: true } },
  },
  parameters: {
    storyClass: 'flex-col',
    docs: {
      description: {
        story: 'Activa la selección simple con `selectable="single"`. Solo una fila puede estar seleccionada a la vez.',
      },
    },
  },
};

export const SelectionMultiple: Story = {
  name: 'Selección múltiple',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['selectable', ...omittedAttributes]);
    return `
  <div class="story__item">
    <div class="story__item__label">Tabla con selección múltiple</div>
    <ath-table id="tableMultiple" selectable="${TableSelectable.Multiple}" ${attributes}>
      ${args.header || DEFAULT_HEADER}
      ${args.body || DEFAULT_BODY}
      ${args.footer || ''}
    </ath-table>
    <div id="multipleOutput" class="ath-body--md ath-color-text--default">Seleccionados: []</div>
  </div>
  <script>
    (function(){
      const t = document.getElementById('tableMultiple');
      const out = document.getElementById('multipleOutput');
      if(t && out){
        t.addEventListener('athSelectionChange', function(e){
          const d = e.detail || { selectedIndexes: [] };
          out.textContent = 'Seleccionados: [' + (d.selectedIndexes||[]).join(', ') + ']';
        });
      }
    })();
  </script>`;
  },
  argTypes: {
    selectable: { control: false },
    header: { table: { disable: true } },
    body: { table: { disable: true } },
    footer: { table: { disable: true } },
  },
  parameters: {
    storyClass: 'flex-col',
    docs: {
      description: {
        story: 'Activa la selección múltiple con `selectable="multiple"`. Puedes seleccionar varias filas y se emitirá `athSelectionChange` con los índices seleccionados.',
      },
    },
  },
};

export const ClickableRows: Story = {
  name: 'Filas clickables',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['clickable', ...omittedAttributes]);
    return `
  <div class="story__item">
    <div class="story__item__label">Tabla con filas clickables</div>
    <ath-table id="tableClickable" clickable="true" ${attributes}>
      <ath-table-header>
        <ath-table-header-item>ID</ath-table-header-item>
        <ath-table-header-item>Nombre</ath-table-header-item>
        <ath-table-header-item>Email</ath-table-header-item>
        <ath-table-header-item>Estado</ath-table-header-item>
        <ath-table-header-item has-interactivity="true">
          <span class="sr-only">Acciones</span>
        </ath-table-header-item>
      </ath-table-header>
      <ath-table-body>
        <ath-table-row clickable="true" clickable-aria-label="Navegar a detalle de Juan Pérez">
          <ath-table-row-item is-header="true" class="ath-h6">1</ath-table-row-item>
          <ath-table-row-item>Juan Pérez</ath-table-row-item>
          <ath-table-row-item>juan.perez@ibercaja.es</ath-table-row-item>
          <ath-table-row-item><ath-tag>Activo</ath-tag></ath-table-row-item>
          <ath-table-row-item>
            <ath-menu-button color="secondary" alignment="right" clear="true" icon="menu" ath-aria-label="Menú de opciones">
              <ath-menu-button-item icon="show" text="Ver detalle"></ath-menu-button-item>
              <ath-menu-button-item icon="pdf_file" text="Descargar justificante"></ath-menu-button-item>
            </ath-menu-button>
          </ath-table-row-item>
        </ath-table-row>
        <ath-table-row clickable="true" clickable-aria-label="Navegar a detalle de María López">
          <ath-table-row-item is-header="true" class="ath-h6">2</ath-table-row-item>
          <ath-table-row-item has-interactivity="true">
            María López
            <ath-tooltip heading-text="Al pulsar sobre esta celda, no se genera ningún evento" position="right" has-arrow="true" color="secondary" trigger="click">
              <ath-tooltip-trigger icon="info" size="sm" />
            </ath-tooltip>
          </ath-table-row-item>
          <ath-table-row-item>maria.lopez@ibercaja.es</ath-table-row-item>
          <ath-table-row-item><ath-tag color="secondary">Inactivo</ath-tag></ath-table-row-item>
          <ath-table-row-item>
            <ath-menu-button color="secondary" alignment="right" clear="true" icon="menu" ath-aria-label="Menú de opciones">
              <ath-menu-button-item icon="show" text="Ver detalle"></ath-menu-button-item>
              <ath-menu-button-item icon="signature" text="Firmar"></ath-menu-button-item>
            </ath-menu-button>
          </ath-table-row-item>
        </ath-table-row>
      </ath-table-body>
    </ath-table>
    <div id="clickOutput" class="ath-body--md ath-color-text--default">Última fila pulsada: ninguna</div>
  </div>
  <script>
    (function(){
      const t = document.getElementById('tableClickable');
      const out = document.getElementById('clickOutput');
      if(t && out){
        t.addEventListener('athTableClick', function(e){
          const d = e.detail || {};
          out.textContent = 'Última fila pulsada: índice ' + (d.rowIndex !== undefined ? d.rowIndex : 'N/A') + 
                           (d.rowValue ? ' (valor: ' + JSON.stringify(d.rowValue) + ')' : '');
        });
      }
    })();
  </script>`;
  },
  argTypes: {
    clickable: { control: false },
    header: { table: { disable: true } },
    body: { table: { disable: true } },
    footer: { table: { disable: true } },
  },
  parameters: {
    storyClass: 'flex-col',
    docs: {
      description: {
        story:
          'Activa la columna clickable con `clickable="true"` en `ath-table`. ' +
          'Para habilitar que una fila sea clickable, hay que añadir la propiedad `clickable="true"` en los `ath-table-row` que se deseen.\n\n' +
          'Al hacer clic en una fila clickable se emite el evento `athTableClick` con información de la fila. ' +
          'En caso de que la columna esté configurada con elementos interactivos (`has-interactivity="true"`), no se disparará el evento de clic de fila en esas celdas. ' +
          'En este ejemplo, la columna del menú y la celda con el tooltip tienen `has-interactivity="true"`, por lo que hacer clic en ellas no dispara el evento de fila.\n\n' +
          'Puedes usar la propiedad `clickable-aria-label` en cada `ath-table-row` para proporcionar una etiqueta descriptiva que los lectores de pantalla anunciarán cuando el usuario navegue por la fila (por defecto es "Navegar").',
      },
    },
  },
};

export const RowWithHeaderCell: Story = {
  name: 'Fila con celda de cabecera',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, omittedAttributes);
    return `
  <div class="story__item">
    <div class="story__item__label">Fila con celda de cabecera</div>
      <ath-table ${attributes}>
        <ath-table-header>
          <ath-table-header-item>ID</ath-table-header-item>
          <ath-table-header-item>Nombre</ath-table-header-item>
          <ath-table-header-item>Email</ath-table-header-item>
          <ath-table-header-item>Estado</ath-table-header-item>
        </ath-table-header>
        <ath-table-body>
          <ath-table-row>
            <ath-table-row-item is-header="true" class="ath-h6">1</ath-table-row-item>
            <ath-table-row-item>Juan Pérez</ath-table-row-item>
            <ath-table-row-item>juan.perez@ibercaja.es</ath-table-row-item>
            <ath-table-row-item><ath-tag>Activo</ath-tag></ath-table-row-item>
          </ath-table-row>
          <ath-table-row>
            <ath-table-row-item is-header="true" class="ath-h6">2</ath-table-row-item>
            <ath-table-row-item>María López</ath-table-row-item>
            <ath-table-row-item>maria.lopez@ibercaja.es</ath-table-row-item>
            <ath-table-row-item><ath-tag color="secondary">Inactivo</ath-tag></ath-table-row-item>
          </ath-table-row>
        </ath-table-body>
      </ath-table>
  </div>`;
  },
  argTypes: {
    header: {
      table: {
        disable: true,
      },
    },
    body: {
      table: {
        disable: true,
      },
    },
    footer: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    storyClass: 'flex-col',
    docs: {
      description: {
        story: 'Puedes utilizar el atributo `is-header` en `ath-table-row-item` para indicar que una celda es una cabecera de fila.',
      },
    },
  },
};

export const HeaderWithTooltip: Story = {
  name: 'Tooltip en la cabecera',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, omittedAttributes);

    return `
  <div style="width: 100%; position: relative;">
    <ath-table ${attributes}>
     <ath-table-header>
        <ath-table-header-item>ID</ath-table-header-item>
        <ath-table-header-item> 
          <div style="display: flex; gap: 8px">
            <span>Nombre</span> 
            <ath-tooltip heading-text="Esto es un tooltip" has-arrow="true" trigger="hover" position="bottom" style="display: flex; align-items: center;">
              <ath-tooltip-trigger aria-label="Más información"/>
            </ath-tooltip>
          </div>
        </ath-table-header-item>
        <ath-table-header-item>Email</ath-table-header-item>
        <ath-table-header-item>Estado</ath-table-header-item>
      </ath-table-header>
      ${args.body || DEFAULT_BODY}
      ${args.footer || ''}
    </ath-table>
  </div>`;
  },
  args: { ...defaultTableArgs },
  parameters: {
    docs: {
      description: {
        story: 'Personaliza los elementos de la tabla utilizando componentes como `ath-tooltip`.',
      },
    },
  },
};

export const RefreshMethod: Story = {
  name: 'Modificación dinámica',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, omittedAttributes);

    return `
  <div style="width: 100%">
    <div class="story__item">
      <div class="story__item__label">Tabla con método refresh()</div>
      <div class="story__item__label">
        <ath-button id="addRowButton" color="secondary">Añadir fila</ath-button>
      </div>
      <ath-table id="demoTable" ${attributes}>
        ${args.header || DEFAULT_HEADER}
        <ath-table-body id="tableBody">
          <ath-table-row>
            <ath-table-row-item>1</ath-table-row-item>
            <ath-table-row-item>Juan Pérez</ath-table-row-item>
            <ath-table-row-item>juan.perez@ibercaja.es</ath-table-row-item>
            <ath-table-row-item><ath-tag>Activo</ath-tag></ath-table-row-item>
          </ath-table-row>
          <ath-table-row>
            <ath-table-row-item>2</ath-table-row-item>
            <ath-table-row-item>María López</ath-table-row-item>
            <ath-table-row-item>maria.lopez@ibercaja.es</ath-table-row-item>
            <ath-table-row-item><ath-tag color="secondary">Inactivo</ath-tag></ath-table-row-item>
          </ath-table-row>
        </ath-table-body>
        ${args.footer || ''}
      </ath-table>
    </div>
    
    <script>
      (function() {
        const table = document.getElementById('demoTable');
        const addRowButton = document.getElementById('addRowButton');
        const tableBody = document.getElementById('tableBody');
        let rowCounter = 3;
        
        if (table && addRowButton && tableBody) {
          // Add row button click handler
          addRowButton.addEventListener('click', function() {
            const newRow = document.createElement('ath-table-row');
            newRow.innerHTML = \`
              <ath-table-row-item>\${rowCounter}</ath-table-row-item>
              <ath-table-row-item>Usuario \${rowCounter}</ath-table-row-item>
              <ath-table-row-item>usuario\${rowCounter}@ibercaja.es</ath-table-row-item>
              <ath-table-row-item><ath-tag color="success">Nuevo</ath-tag></ath-table-row-item>
            \`;
            tableBody.appendChild(newRow);
            rowCounter++;
            
            // Automatically refresh table after adding row
            table.refresh();
          });
        }
      })();
    </script>
  </div>`;
  },
  argTypes: {
    header: {
      table: {
        disable: true,
      },
    },
    body: {
      table: {
        disable: true,
      },
    },
    footer: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    storyClass: 'flex-col',
    docs: {
      description: {
        story: `
El componente \`ath-table\` incluye un método público \`refresh()\` que permite actualizar la tabla cuando se modifica dinámicamente su contenido.

**Ejemplo de uso en Angular:**

    <!-- app.component.html -->
    <ath-table #tableRef>
    ...

    # app.component.ts
    @ViewChild('tableRef', { read: ElementRef }) athTableRef!: ElementRef<HTMLAthTableElement>;

    refreshTable() {
      this.athTableRef.nativeElement.refresh();
    }
`,
      },
    },
  },
};

export const CollapsableRows: Story = {
  name: 'Filas colapsables',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, omittedAttributes);
    return `
  <div class="story__item">
    <div class="story__item__label">Tabla con filas colapsables</div>
    <ath-table ${attributes}>
      <ath-table-header>
        <ath-table-header-item>ID</ath-table-header-item>
        <ath-table-header-item>Nombre</ath-table-header-item>
        <ath-table-header-item>Estado</ath-table-header-item>
      </ath-table-header>
      <ath-table-body>
        <!-- Grupo 1 (expandido por defecto) -->
        <ath-table-row row-id="grp-1" has-children expanded>
          <ath-table-row-item>G1</ath-table-row-item>
          <ath-table-row-item>Grupo A</ath-table-row-item>
          <ath-table-row-item><ath-tag>Activo</ath-tag></ath-table-row-item>
        </ath-table-row>
        <ath-table-row parent-id="grp-1">
          <ath-table-row-item>1.1</ath-table-row-item>
          <ath-table-row-item>Elemento A1</ath-table-row-item>
          <ath-table-row-item><ath-tag color="secondary">Inactivo</ath-tag></ath-table-row-item>
        </ath-table-row>
        <ath-table-row parent-id="grp-1">
          <ath-table-row-item>1.2</ath-table-row-item>
          <ath-table-row-item>Elemento A2</ath-table-row-item>
          <ath-table-row-item><ath-tag>Activo</ath-tag></ath-table-row-item>
        </ath-table-row>

        <!-- Fila independiente (sin hijos) -->
        <ath-table-row>
          <ath-table-row-item>100</ath-table-row-item>
          <ath-table-row-item>Fila suelta</ath-table-row-item>
          <ath-table-row-item><ath-tag color="accent">Pendiente</ath-tag></ath-table-row-item>
        </ath-table-row>

        <!-- Grupo 2 (colapsado por defecto) -->
        <ath-table-row row-id="grp-2" has-children>
          <ath-table-row-item>G2</ath-table-row-item>
          <ath-table-row-item>Grupo B</ath-table-row-item>
          <ath-table-row-item><ath-tag color="secondary">Inactivo</ath-tag></ath-table-row-item>
        </ath-table-row>
        <ath-table-row parent-id="grp-2">
          <ath-table-row-item>2.1</ath-table-row-item>
          <ath-table-row-item>Elemento B1</ath-table-row-item>
          <ath-table-row-item><ath-tag>Activo</ath-tag></ath-table-row-item>
        </ath-table-row>
        <ath-table-row parent-id="grp-2">
          <ath-table-row-item>2.2</ath-table-row-item>
          <ath-table-row-item>Elemento B2</ath-table-row-item>
          <ath-table-row-item><ath-tag color="secondary">Inactivo</ath-tag></ath-table-row-item>
        </ath-table-row>
      </ath-table-body>
    </ath-table>
  </div>`;
  },
  argTypes: {
    header: { table: { disable: true } },
    body: { table: { disable: true } },
    footer: { table: { disable: true } },
  },
  parameters: {
    storyClass: 'flex-col',
    docs: {
      description: {
        story:
          'Usa `row-id` en filas padre y `parent-id` en filas hijas. El componente agrupa los hijos bajo un `ath-collapse` y permite expandir/colapsar con el botón del chevron.',
      },
    },
  },
};
