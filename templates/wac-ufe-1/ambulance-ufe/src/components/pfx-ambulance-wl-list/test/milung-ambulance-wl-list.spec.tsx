import { newSpecPage } from '@stencil/core/testing';
import { MilungAmbulanceWlList } from '../milung-ambulance-wl-list'; // @_milung_@

describe('milung-ambulance-wl-list', () => { // @_milung_@
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PfxAmbulanceWlList],
      html: `<milung-ambulance-wl-list></milung-ambulance-wl-list>`, // @_milung_@
    });
    expect(page.root).toEqualHtml(`
      <milung-ambulance-wl-list>   <!-- @_milung_@ -->
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </milung-ambulance-wl-list>  <!-- @_milung_@ -->
    `);
  });
});