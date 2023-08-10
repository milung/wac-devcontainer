import { newSpecPage } from '@stencil/core/testing';
import { PfxAmbulanceWlList } from '../pfx-ambulance-wl-list';  // @_pfx_@

describe('pfx-ambulance-wl-list', () => {  // @_pfx_@
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PfxAmbulanceWlList],  // @_pfx_@
      html: `<pfx-ambulance-wl-list></pfx-ambulance-wl-list>`,  // @_pfx_@
    });

    const wlList = page.rootInstance as PfxAmbulanceWlList; // @_pfx_@
    const expectedPatients = wlList?.waitingPatients?.length

    const items = page.root.shadowRoot.querySelectorAll("md-list-item");
    expect(items.length).toEqual(expectedPatients);

  });
});
