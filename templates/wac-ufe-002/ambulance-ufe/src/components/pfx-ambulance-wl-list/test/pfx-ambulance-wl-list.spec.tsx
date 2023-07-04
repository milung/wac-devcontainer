import { newSpecPage } from '@stencil/core/testing';
import { PfxAmbulanceWlList } from '../pfx-ambulance-wl-list';  // @_pfx_@

describe('pfx-ambulance-wl-list', () => {  // @_pfx_@
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PfxAmbulanceWlList],  // @_pfx_@
      html: `<pfx-ambulance-wl-list></pfx-ambulance-wl-list>`,  // @_pfx_@
    });
    expect(page.root).toEqualHtml(` 
      <pfx-ambulance-wl-list>` +  /* @_pfx_@ */ + `
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pfx-ambulance-wl-list>` +  /* @_pfx_@ */ + `
    `);
  });
});
