import { Component, Element, Event, EventEmitter, Host, Listen, Prop, State, Watch, h } from '@stencil/core';

@Component({
  tag: 'ath-collapse',
  styleUrl: 'collapse.scss',
  shadow: true,
})
export class AthCollapse {
  private timeoutHideContent: NodeJS.Timeout;
  private timeoutChangeOverflow: NodeJS.Timeout;
  private animationtime = 500;

  @Element() el: HTMLElement;

  /**
   * If the component is expanded by default
   */
  @Prop({ mutable: true, reflect: true }) show = false;

  @State() isExpanded: boolean;
  @State() collapseHeight: string;
  @State() overflowHidden: boolean = true;

  /**
   * Event to emit if the component is expanded or collapsed.
   */
  @Event() athCollapseState: EventEmitter<{ id: string; isExpanded: boolean }>;

  @Listen('athToggleCollapse', { target: 'window' })
  handleCollapse(event: CustomEvent<string>) {
    const targetId = event.detail;

    if (!targetId || targetId !== this.el?.id) return;

    this.isExpanded = !this.isExpanded;
    this.athCollapseState.emit({ id: this.el.id, isExpanded: this.isExpanded });

    clearTimeout(this.timeoutHideContent);
    clearTimeout(this.timeoutChangeOverflow);

    if (this.isExpanded) {
      this.show = true;
      this.timeoutChangeOverflow = setTimeout(() => {
        this.overflowHidden = false;
      }, this.animationtime);
    } else {
      this.timeoutHideContent = setTimeout(() => (this.show = false), this.animationtime);
      this.overflowHidden = true;
    }
  }

  @Listen('resize', { target: 'window' })
  handleResize() {
    this.getCollapseHeight();
  }

  @Watch('isExpanded')
  async handleExpanded() {
    await this.getCollapseHeight();
  }

  private getClassNames = () => ({
    'ath-collapse': true,
    'ath-collapse--expanded': this.isExpanded,
    'ath-collapse--collapsed': !this.isExpanded,
    'ath-collapse--overflow-hidden': this.overflowHidden,
  });

  private getCollapseHeight = async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    await new Promise(resolve => requestAnimationFrame(resolve));

    const collapseElement = this.el.shadowRoot?.querySelector('.ath-collapse') as HTMLElement;
    if (collapseElement && this.isExpanded) {
      const prevHeight = collapseElement.style.height;
      collapseElement.style.height = 'auto';
      const newHeight = collapseElement.scrollHeight;
      collapseElement.style.height = prevHeight;

      await new Promise(resolve => requestAnimationFrame(resolve));
      this.collapseHeight = `${newHeight}px`;
    } else {
      this.collapseHeight = '0px';
    }
  };

  componentWillLoad() {
    this.isExpanded = this.show;
    this.athCollapseState.emit({ id: this.el?.id, isExpanded: this.isExpanded });
  }

  componentDidLoad() {
    this.getCollapseHeight();
  }

  disconnectedCallback() {
    clearTimeout(this.timeoutHideContent);
    clearTimeout(this.timeoutChangeOverflow);
  }

  render() {
    return (
      <Host>
        <div>
          <div class={this.getClassNames()} style={{ height: this.collapseHeight }}>
            {this.show && <slot></slot>}
          </div>
        </div>
      </Host>
    );
  }
}
