import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthStepper } from '../stepper';
import { AthStep } from '../step/step';
import { AthIcon } from 'components/icon/icon';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthStepper, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

describe('ath-stepper', () => {
  it('renders list', async () => {
    const page = await testPage('<ath-stepper clickable="false"></ath-stepper>');
    const list = page.root.shadowRoot.querySelector('[role="list"]');
    expect(list).toBeTruthy();
  });

  it('inject default classes', async () => {
    const page = await testPage('<ath-stepper clickable="false"></ath-stepper>');
    const stepperDiv = page.root.shadowRoot.querySelector('.ath-stepper');
    expect(stepperDiv).toHaveClass('ath-stepper--horizontal');
    const list = stepperDiv.querySelector('[role="list"]');
    expect(list).toHaveClass('ath-step_group');
  });

  it('inject orientation class', async () => {
    const page = await testPage('<ath-stepper clickable="false" orientation="vertical"></ath-stepper>');
    const stepperDiv = page.root.shadowRoot.querySelector('.ath-stepper');
    expect(stepperDiv).toHaveClass('ath-stepper--vertical');
  });

  it('inject orientation class to steps', async () => {
    const page = await testPage('<ath-stepper clickable="false" orientation="vertical"><ath-step></ath-step></ath-stepper>', [AthStep]);
    const athStep = page.root.querySelector('ath-step');
    const stepDiv = athStep.shadowRoot.querySelector('.ath-step');
    expect(stepDiv).toHaveClass('ath-step--left--md');
  });

  it('inject size class to steps', async () => {
    const page = await testPage('<ath-stepper clickable="false" size="sm"><ath-step></ath-step></ath-stepper>', [AthStep]);
    const athStep = page.root.querySelector('ath-step');
    const stepDiv = athStep.shadowRoot.querySelector('.ath-step');
    expect(stepDiv).toHaveClass('ath-step--center--sm');
  });

  it('renders heading text', async () => {
    const page = await testPage('<ath-stepper clickable="false" heading-text="PRÉSTAMO DIGITAL"></ath-stepper>');
    const stepDiv = page.root.shadowRoot.querySelector('.ath-stepper_heading-text');
    expect(stepDiv.textContent).toBe('PRÉSTAMO DIGITAL');
  });

  it('renders heading icon', async () => {
    const page = await testPage('<ath-stepper clickable="false" heading-text="PRÉSTAMO DIGITAL" heading-icon="loan"></ath-stepper>', [AthStep, AthIcon]);
    const athIcon = page.root.shadowRoot.querySelector('ath-icon');
    expect(athIcon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('assets/images/sprites/core/sprites.svg#loan');
  });

  it('only renders heading icon if the heading text is present', async () => {
    const page = await testPage('<ath-stepper clickable="false" heading-icon="loan"></ath-stepper>', [AthStep, AthIcon]);
    const athIcon = page.root.shadowRoot.querySelector('ath-icon');
    expect(athIcon).toBeFalsy();
  });

  it('generates step-numbers increasingly', async () => {
    const page = await testPage('<ath-stepper clickable="false"><ath-step></ath-step><ath-step></ath-step><ath-step></ath-step></ath-stepper>', [AthStep, AthIcon]);
    const firstStep = page.root.querySelector('ath-step');
    const firstStepNumber = firstStep.shadowRoot.querySelector('.ath-step__number');
    expect(firstStepNumber.innerHTML).toContain('1');
    const lastStep = page.root.querySelectorAll('ath-step')[2];
    const lastStepNumber = lastStep.shadowRoot.querySelector('.ath-step__number');
    expect(lastStepNumber.innerHTML).toContain('3');
  });

  it('starts generating step-numbers from start-from', async () => {
    const page = await testPage('<ath-stepper clickable="false" start-from="3"><ath-step></ath-step><ath-step></ath-step></ath-stepper>', [AthStep, AthIcon]);
    const firstStep = page.root.querySelector('ath-step');
    const firstStepNumber = firstStep.shadowRoot.querySelector('.ath-step__number');
    expect(firstStepNumber.innerHTML).toContain('3');
  });
});

describe('ath-steps', () => {
  // Props
  it('inject host props', async () => {
    const page = await testPage('<ath-stepper clickable="false"><ath-step></ath-step></ath-stepper>', [AthStep]);
    const step = page.root.querySelector('ath-step');
    expect(step.number).toBe(1);
    expect(step.alignment).toBe('center');
    expect(step.size).toBe('md');
  });

  it('inject alignment from orientation', async () => {
    const page = await testPage('<ath-stepper clickable="false" orientation="vertical"><ath-step></ath-step></ath-stepper>', [AthStep]);
    const step = page.root.querySelector('ath-step');
    expect(step.alignment).toBe('left');
  });

  it('inject tabindex to link', async () => {
    const page = await testPage('<ath-stepper clickable="false"><ath-step></ath-step></ath-stepper>', [AthStep]);
    const step = page.root.querySelector('ath-step');
    const divButton = step.shadowRoot.querySelector('.ath-step-wrapper');
    expect(divButton.getAttribute('tabindex')).toBe('-1');
  });

  it('generate first step-number', async () => {
    const page = await testPage('<ath-stepper clickable="false"><ath-step></ath-step></ath-stepper>', [AthStep]);
    const step = page.root.querySelector('ath-step');
    const stepNumber = step.shadowRoot.querySelector('.ath-step__number');
    expect(stepNumber.innerHTML).toContain('1');
  });

  it('inject heading-text', async () => {
    const page = await testPage('<ath-stepper clickable="false"><ath-step heading-text="Heading text"></ath-step></ath-stepper>', [AthStep]);
    const step = page.root.querySelector('ath-step');
    const headingText = step.shadowRoot.querySelector('.header-text');
    expect(headingText.innerHTML).toBe('Heading text');
  });

  it('inject action-text', async () => {
    const page = await testPage('<ath-stepper><ath-step action-text="Action text"></ath-step></ath-stepper>', [AthStep]);
    const step = page.root.querySelector('ath-step');

    await page.waitForChanges();
    const actionText = step.shadowRoot.querySelector('.action-text');
    expect(actionText).toBeTruthy();
    expect(actionText.innerHTML).toContain('Action text');
  });

  it('action-text is not visible if step is readonly', async () => {
    const page = await testPage('<ath-stepper><ath-step action-text="Action text" readonly></ath-step></ath-stepper>', [AthStep]);
    const step = page.root.querySelector('ath-step');

    await page.waitForChanges();
    const actionText = step.shadowRoot.querySelector('.action-text');
    expect(actionText).toBeFalsy();
  });

  it('action-text is not visible if step is disabled', async () => {
    const page = await testPage('<ath-stepper><ath-step action-text="Action text" disabled></ath-step></ath-stepper>', [AthStep]);
    const step = page.root.querySelector('ath-step');

    await page.waitForChanges();
    const actionText = step.shadowRoot.querySelector('.action-text');
    expect(actionText).toBeFalsy();
  });

  it('action-text is not visible if step is selected', async () => {
    const page = await testPage('<ath-stepper><ath-step action-text="Action text" selected></ath-step></ath-stepper>', [AthStep]);
    const step = page.root.querySelector('ath-step');

    await page.waitForChanges();
    const actionText = step.shadowRoot.querySelector('.action-text');
    expect(actionText).toBeFalsy();
  });

  it('inject clickable prop to steps', async () => {
    const page = await testPage('<ath-stepper><ath-step></ath-step></ath-stepper>', [AthStep]);
    const step = page.root.querySelector('ath-step');
    expect(step.clickable).toBeTruthy();
    const divButton = step.shadowRoot.querySelector('.ath-step');
    expect(divButton).toHaveClass('ath-step--clickable');
  });

  it('hides last divider line in vertical orientation', async () => {
    const page = await testPage('<ath-stepper clickable="false" orientation="vertical"><ath-step></ath-step><ath-step></ath-step></ath-stepper>', [AthStep]);
    const step = page.root.querySelectorAll('ath-step')[1];
    const dividerLine = step.shadowRoot.querySelector('.line') as HTMLElement;
    expect(dividerLine).toHaveClass('hidden');
  });

  // Classes
  it('inject complete class', async () => {
    const page = await testPage('<ath-stepper clickable="false" ><ath-step is-complete></ath-step><ath-step></ath-step></ath-stepper>', [AthStep]);
    const step = page.root.querySelector('ath-step');
    const divButton = step.shadowRoot.querySelector('.ath-step');
    expect(divButton).toHaveClass('ath-step--complete');
  });

  it('inject selected class', async () => {
    const page = await testPage('<ath-stepper clickable="false" ><ath-step selected></ath-step><ath-step></ath-step></ath-stepper>', [AthStep]);
    const step = page.root.querySelector('ath-step');
    const divButton = step.shadowRoot.querySelector('.ath-step');
    expect(divButton).toHaveClass('ath-step--selected');
  });

  it('inject disabled class', async () => {
    const page = await testPage('<ath-stepper clickable="false"><ath-step disabled></ath-step><ath-step></ath-step></ath-stepper>', [AthStep]);
    const step = page.root.querySelector('ath-step');
    const divButton = step.shadowRoot.querySelector('.ath-step');
    expect(divButton).toHaveClass('ath-step--disabled');
  });

  it('inject readonly class to steps', async () => {
    const page = await testPage('<ath-stepper clickable="false" readonly><ath-step></ath-step></ath-stepper>', [AthStep]);
    const athStep = page.root.querySelector('ath-step');
    const stepDiv = athStep.shadowRoot.querySelector('.ath-step');
    expect(stepDiv).toHaveClass('ath-step--readonly');
  });

  it('renders collapse button when is vertical and expandible', async () => {
    const page = await testPage(
      '<ath-stepper clickable="false" orientation="vertical"><ath-step heading-text="Default" action-text="Editar" is-collapsable>Slot content</ath-step></ath-stepper>',
      [AthStep, AthIcon],
    );
    const athStep = page.root.querySelector('ath-step');
    const athIcon = athStep.shadowRoot.querySelector('ath-icon');
    expect(athIcon.shadowRoot.querySelector('svg use').getAttribute('href')).toContain('assets/images/sprites/core/sprites.svg#chevron_down');
  });

  it('hides expandible content by default', async () => {
    const page = await testPage(
      '<ath-stepper clickable="false" orientation="vertical"><ath-step heading-text="Default" action-text="Editar" is-collapsable>Slot content</ath-step></ath-stepper>',
      [AthStep],
    );
    const athStep = page.root.querySelector('ath-step');
    const heading = athStep.shadowRoot.querySelector('.header-text');
    const panel = heading.nextSibling;
    expect(panel).toHaveClass('ath-visibility-hidden');
  });

  it('expands slot', async () => {
    const page = await testPage(
      '<ath-stepper clickable="false" orientation="vertical"><ath-step heading-text="Default" action-text="Editar" is-collapsable is-expanded>Slot content</ath-step></ath-stepper>',
      [AthStep, AthIcon],
    );
    const athStep = page.root.querySelector('ath-step');

    const heading = athStep.shadowRoot.querySelector('.header-text');
    const panel = heading.nextSibling;
    expect(panel).not.toHaveClass('ath-visibility-hidden');
  });

  //Events
  it('should emit athClick when the div with role="button" is clicked', async () => {
    const page = await newSpecPage({
      components: [AthStep],
      html: `<ath-step action-text="Click me" clickable></ath-step>`,
    });

    const athStep = page.root;
    const athClick = jest.fn();

    athStep.addEventListener('athClick', athClick);

    const stepDiv = athStep.shadowRoot.querySelector('.ath-step-wrapper') as HTMLLinkElement;
    stepDiv.click();

    await page.waitForChanges();

    expect(athClick).toHaveBeenCalled();
  });

  it('should emit athClick when the div with role="button" is focused and Enter or Space is pressed', async () => {
    const page = await newSpecPage({
      components: [AthStep],
      html: `<ath-step action-text="Click me" clickable></ath-step>`,
    });

    const athStep = page.root;
    const athClick = jest.fn();

    athStep.addEventListener('athClick', athClick);

    const stepDiv = athStep.shadowRoot.querySelector('.ath-step-wrapper') as HTMLDivElement;

    // Simulate pressing Enter
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    stepDiv.dispatchEvent(enterEvent);

    await page.waitForChanges();

    expect(athClick).toHaveBeenCalledTimes(1);

    // Simulate pressing Space
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
    stepDiv.dispatchEvent(spaceEvent);

    await page.waitForChanges();

    expect(athClick).toHaveBeenCalledTimes(2);
  });

  // Collapse / Expand
  it('should toggle isExpanded when handleCollapse is called', async () => {
    const page = await newSpecPage({
      components: [AthStep],
      html: `<ath-stepper clickable="false" orientation="vertical"><ath-step is-collapsable></ath-step></ath-stepper>`,
    });

    const athStep = page.rootInstance;

    // Inicialmente, isExpanded debe ser false
    expect(athStep.isExpanded).toBeFalsy();

    // Llamar a handleCollapse sin evento
    athStep.handleCollapse();
    expect(athStep.isExpanded).toBe(true);

    // Llamar a handleCollapse nuevamente
    athStep.handleCollapse();
    expect(athStep.isExpanded).toBe(false);
  });

  // Selection
  it('selects the second step when clicked and adds ath-step--selected class', async () => {
    const page = await testPage(
      `<ath-stepper>
      <ath-step action-text="Editar"></ath-step>
      <ath-step action-text="Editar"></ath-step>
    </ath-stepper>`,
      [AthStep],
    );

    const steps = page.root.querySelectorAll('ath-step');
    const secondStep = steps[1];

    const secondStepWrapper = secondStep.shadowRoot.querySelector('.ath-step-wrapper') as HTMLDivElement;

    secondStepWrapper.click();
    await page.waitForChanges();

    const secondStepDiv = secondStep.shadowRoot.querySelector('.ath-step');

    expect(secondStepDiv).toHaveClass('ath-step--selected');
  });

  // Accesibility
  it('inject listtitem role to step', async () => {
    const page = await testPage('<ath-stepper><ath-step></ath-step></ath-stepper>', [AthStep]);
    const step = page.root.querySelector('ath-step');
    expect(step.getAttribute('role')).toBe('listitem');
  });

  it('inject button role by default to interactive wrapper', async () => {
    const page = await testPage('<ath-stepper clickable><ath-step action-text="Editar"></ath-step></ath-stepper>', [AthStep]);
    const athStep = page.root.querySelector('ath-step');
    const stepDiv = athStep.shadowRoot.querySelector('.ath-step-wrapper');
    expect(stepDiv.getAttribute('role')).toBe('button');
  });

  it('inject link role to interactive wrapper', async () => {
    const page = await testPage('<ath-stepper clickable  ath-role="link"><ath-step action-text="Editar"></ath-step></ath-stepper>', [AthStep]);
    const athStep = page.root.querySelector('ath-step');
    const stepDiv = athStep.shadowRoot.querySelector('.ath-step-wrapper');
    expect(stepDiv.getAttribute('role')).toBe('link');
  });

  it('should set correct aria-label on ath-step-wrapper, without state', async () => {
    const page = await testPage(
      `<ath-stepper ath-aria-label="Paso [number] de [total], [heading-text], selecciona para [action-text] [state-label]">
        <ath-step heading-text="Step Heading" action-text="Editar"></ath-step>
      </ath-stepper>
      `,
      [AthStep],
    );

    const athStep = page.root.querySelector('ath-step');
    await page.waitForChanges();

    const stepWrapper = athStep.shadowRoot.querySelector('.ath-step-wrapper');
    expect(stepWrapper.getAttribute('aria-label')).toBe('Paso 1 de 1, Step Heading, selecciona para Editar ');
  });

  it('should set correct aria-label on ath-step-wrapper, with state COMPLETED', async () => {
    const page = await testPage(
      `<ath-stepper ath-aria-label="Paso [number] de [total], [heading-text], selecciona para [action-text] [state-label]" completed-label="completado">
        <ath-step heading-text="Step Heading" action-text="Editar" is-complete></ath-step>
      </ath-stepper>
      `,
      [AthStep],
    );

    const athStep = page.root.querySelector('ath-step');
    await page.waitForChanges();

    const stepWrapper = athStep.shadowRoot.querySelector('.ath-step-wrapper');
    expect(stepWrapper.getAttribute('aria-label')).toBe('Paso 1 de 1, Step Heading, selecciona para Editar completado');
  });

  it('should set correct aria-label on ath-step-wrapper, with state ERROR', async () => {
    const page = await testPage(
      `<ath-stepper ath-aria-label="Paso [number] de [total], [heading-text], selecciona para [action-text] [state-label]" error-label="error" >
        <ath-step heading-text="Step Heading" action-text="Editar" feedback="error"></ath-step>
      </ath-stepper>
      `,
      [AthStep],
    );

    const athStep = page.root.querySelector('ath-step');
    await page.waitForChanges();

    const stepWrapper = athStep.shadowRoot.querySelector('.ath-step-wrapper');
    expect(stepWrapper.getAttribute('aria-label')).toBe('Paso 1 de 1, Step Heading, selecciona para Editar error');
  });

  it('should set correct aria-live, without state', async () => {
    const page = await testPage(
      `
      <ath-stepper clickable="false" aria-live-message="Paso [number] de [total], [heading-text], selecciona para [action-text] [state-label]">
        <ath-step heading-text="Step Heading" action-text="Editar" selected="true"></ath-step>
      </ath-stepper>
      `,
      [AthStep],
    );

    const athStep = page.root.querySelector('ath-step');
    await page.waitForChanges();

    const ariaLive = athStep.shadowRoot.querySelector('.ath-visibility-hidden');
    expect(ariaLive.textContent).toBe('Paso 1 de 1, Step Heading, selecciona para Editar ');
  });

  it('should set correct aria-live, with state COMPLETED', async () => {
    const page = await testPage(
      `
      <ath-stepper clickable="false" aria-live-message="Paso [number] de [total], [heading-text], selecciona para [action-text] [state-label]" completed-label="completado">
        <ath-step heading-text="Step Heading" action-text="Editar" is-complete selected="true"></ath-step>
      </ath-stepper>
      `,
      [AthStep],
    );

    const athStep = page.root.querySelector('ath-step');
    await page.waitForChanges();

    const ariaLive = athStep.shadowRoot.querySelector('.ath-visibility-hidden');
    expect(ariaLive.textContent).toBe('Paso 1 de 1, Step Heading, selecciona para Editar completado');
  });

  it('should set correct aria-live, with state ERROR', async () => {
    const page = await testPage(
      `
      <ath-stepper clickable="false" aria-live-message="Paso [number] de [total], [heading-text], selecciona para [action-text] [state-label]" error-label="error">
        <ath-step heading-text="Step Heading" action-text="Editar" feedback="error" selected="true"></ath-step>
      </ath-stepper>
      `,
      [AthStep],
    );

    const athStep = page.root.querySelector('ath-step');
    await page.waitForChanges();

    const ariaLive = athStep.shadowRoot.querySelector('.ath-visibility-hidden');
    expect(ariaLive.textContent).toBe('Paso 1 de 1, Step Heading, selecciona para Editar error');
  });
});
