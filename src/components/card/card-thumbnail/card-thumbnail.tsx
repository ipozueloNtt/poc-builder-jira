import { Component, ComponentInterface, Prop, JSX, h, Host, State, Method } from '@stencil/core';
import { ThumbnailType, ThumbnailTypes } from './card-thumbnail.model';

@Component({
  tag: 'ath-card-thumbnail',
  styleUrls: ['card-thumbnail.scss'],
  shadow: true,
})
export class AthCardThumbnail implements ComponentInterface {
  /**
   * Text for top tag
   **/
  @Prop() topTag: string;

  /**
   * Text for bottom tag
   **/
  @Prop() bottomTag: string;

  /**
   * type of thumnail
   **/
  @Prop() type: ThumbnailTypes = ThumbnailType.Default;

  /**
   * text highlight
   **/
  @Prop() highlightText: string;

  @State() isFluid = false;
  @State() isVertical = true;

  @Method() async updateTypeCard(isFluid: boolean, isVertical: boolean) {
    this.isFluid = isFluid;
    this.isVertical = isVertical;
  }

  private getClassNames = () => ({
    'ath-card-thumbnail': true,
    'fluid': this.isFluid,
    'fixed': !this.isFluid,
    'horizontal': !this.isVertical,
    'vertical': this.isVertical,
  });

  private renderTag(position) {
    const tagLabel = position === 'top' ? this.topTag : this.bottomTag;
    const color = position === 'top' ? 'secondary' : 'primary';
    return <ath-tag heading-text={tagLabel} color={color}></ath-tag>;
  }

  render(): JSX.Element {
    return (
      <Host>
        <div class={this.getClassNames()}>
          <div class="ath-card-thumbnail_image">
            <slot name="img-thumbnail"></slot>
          </div>
          {!!this.topTag && this.type === ThumbnailType.Default && <div class="ath-card-thumbnail_top-tag">{this.renderTag('top')}</div>}
          {!!this.bottomTag && this.type === ThumbnailType.Default && <div class="ath-card-thumbnail_bottom-tag">{this.renderTag('bottom')}</div>}
          {this.type === ThumbnailType.Highlight && <div class="ath-card-thumbnail_highlight">{this.highlightText}</div>}
          {this.type === ThumbnailType.Avatar && (
            <div class="ath-card-thumbnail_avatar">
              <slot name="avatar"></slot>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
