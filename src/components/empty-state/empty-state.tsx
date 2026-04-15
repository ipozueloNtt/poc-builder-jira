import { Component, ComponentInterface, Host, Prop, State, h } from '@stencil/core';
import { EmptyStateType, EmptyStateTypes, HeadingSize, HeadingSizes } from './empty-state.model';
import { FcPictogram } from 'sharedfc/input';

@Component({
  tag: 'ath-empty-state',
  styleUrl: 'empty-state.scss',
  shadow: true,
})
export class AthEmptyState implements ComponentInterface {
  /**
   * Indicates the type of empty state
   */
  @Prop() type: EmptyStateTypes = EmptyStateType.Empty;

  /**
   * Indicates if the image will be hidden
   * Does not apply when type is 'loading'
   */
  @Prop() hideImage = false;

  /**
   * Text to empty state heading
   */
  @Prop() headingText: string;

  /**
   * Indicates the heading level for the empty state.
   */
  @Prop() headingLevel = 4;

  /**
   * Indicates the heading size for the heading text.
   */
  @Prop() headingSize: HeadingSizes = HeadingSize.Sm;

  /**
   * Text to empty state description.
   */
  @Prop() description: string;

  /**
   * Accesibility label for loading state (only when type is 'loading')
   */
  @Prop() loadingLabel: string;

  @State() announcedLoadingText = '';

  private liveTimer?: number;

  componentDidLoad() {
    if (this.type === EmptyStateType.Loading) {
      this.scheduleLiveAnnounce();
    }
  }

  disconnectedCallback() {
    this.clearLiveTimer();
  }

  private scheduleLiveAnnounce() {
    this.clearLiveTimer();
    this.liveTimer = window.setTimeout(() => {
      this.announcedLoadingText = this.loadingLabel || 'Cargando…';
    }, 150);
  }

  private clearLiveTimer() {
    if (this.liveTimer) {
      clearTimeout(this.liveTimer);
      this.liveTimer = undefined;
    }
  }
  private getPictogramName() {
    switch (this.type) {
      case EmptyStateType.Empty:
        return 'illu_empty';
      case EmptyStateType.SearchNoResults:
        return 'illu_search';
      case EmptyStateType.Error:
        return 'illu_error_connection';
      default:
        return this.type;
    }
  }

  private transformHeadingSize(): string {
    const transform = {
      sm: '4',
      md: '3',
      lg: '2',
    };

    return transform[this.headingSize] || transform.sm;
  }

  private getClassNames = () => ({
    'ath-empty-state': true,
    'ath-empty-state--hide-image': this.hideImage && this.type !== EmptyStateType.Loading,
  });

  render() {
    const HeadingTag = `h${this.headingLevel}` as keyof HTMLElementTagNameMap;
    const headingSizeClass = this.transformHeadingSize();

    if (this.type === EmptyStateType.Loading) {
      return (
        <Host>
          <div class="ath-empty-state--loading" role="status">
            <div class="sr-only">{this.announcedLoadingText}</div>
            <img class="ath-empty-state--loading-gif" src="./assets/images/loading.gif" alt="" />
          </div>
        </Host>
      );
    }

    return (
      <Host>
        <div class={this.getClassNames()}>
          {!this.hideImage && (
            <div class={`ath-empty-state--image ${this.type}`}>
              <FcPictogram name={this.getPictogramName()} />
            </div>
          )}

          <div class="ath-empty-state-info">
            {this.headingText && <HeadingTag class={`ath-h${headingSizeClass} heading`}>{this.headingText}</HeadingTag>}
            {this.description && <p class="description">{this.description}</p>}
            <slot name="body"></slot>
          </div>
          <slot name="footer"></slot>
        </div>
      </Host>
    );
  }
}
