import { newSpecPage } from '@stencil/core/testing';
import { ${templateOption:PfxCamel}AmbulanceWlEditor } from '../pfx-ambulance-wl-editor';

describe('${templateOption:pfx}-ambulance-wl-editor buttons', () => {
  it(' shall be of different type', async () => {
    const page = await newSpecPage({
      components: [${templateOption:PfxCamel}AmbulanceWlEditor],
      html: `<${templateOption:pfx}-ambulance-wl-editor entry-id="@new"></${templateOption:pfx}-ambulance-wl-editor>`,
    });
    let items: any = await page.root.shadowRoot.querySelectorAll("md-filled-button");
    expect(items.length).toEqual(1);
    items = await page.root.shadowRoot.querySelectorAll("md-outlined-button");
    expect(items.length).toEqual(1);

    items = await page.root.shadowRoot.querySelectorAll("md-filled-tonal-button");
    expect(items.length).toEqual(1);
  });
});
