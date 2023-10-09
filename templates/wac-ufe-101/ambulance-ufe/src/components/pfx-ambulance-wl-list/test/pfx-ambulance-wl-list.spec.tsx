import { newSpecPage } from '@stencil/core/testing';
import { ${templateOption:PfxCamel}AmbulanceWlList } from '../pfx-ambulance-wl-list';

describe('${templateOption:pfx}-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [${templateOption:PfxCamel}AmbulanceWlList],
      html: `<${templateOption:pfx}-ambulance-wl-list></${templateOption:pfx}-ambulance-wl-list>`,
    });

    const wlList = page.rootInstance as ${templateOption:PfxCamel}AmbulanceWlList;
    const expectedPatients = wlList?.waitingPatients?.length

    const items = page.root.shadowRoot.querySelectorAll("md-list-item");
    expect(items.length).toEqual(expectedPatients);

  });
});
