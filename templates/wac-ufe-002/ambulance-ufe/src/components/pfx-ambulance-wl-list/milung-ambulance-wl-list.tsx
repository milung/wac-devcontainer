import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'milung-ambulance-wl-list', // @_milung_@
  styleUrl: 'milung-ambulance-wl-list.css', // @_milung_@
  shadow: true,
})
export class MilungAmbulanceWlList { // @_milung_@

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}