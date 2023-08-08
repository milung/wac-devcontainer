import { newSpecPage } from '@stencil/core/testing';
import { PfxAmbulanceWlEditor } from '../pfx-ambulance-wl-editor'; // @_pfx_@

describe('pfx-ambulance-wl-editor buttons', () => { // @_pfx_@
  it(' shall be of different type', async () => {
    const page = await newSpecPage({
      components: [PfxAmbulanceWlEditor],
      html: `<pfx-ambulance-wl-editor entry-id="@new"></pfx-ambulance-wl-editor>`, // @_pfx_@
    });
    let items: any = await page.root.shadowRoot.querySelectorAll("md-filled-button");
    expect(items.length).toEqual(1);
    items = await page.root.shadowRoot.querySelectorAll("md-outlined-button");
    expect(items.length).toEqual(1);

    items = await page.root.shadowRoot.querySelectorAll("md-tonal-button");
    expect(items.length).toEqual(1);
  });
});
