import { newE2EPage } from '@stencil/core/testing';

describe('pfx-ambulance-wl-list', () => { // @_pfx_@
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pfx-ambulance-wl-list></pfx-ambulance-wl-list>'); // @_pfx_@

    const element = await page.find('pfx-ambulance-wl-list'); // @_pfx_@
    expect(element).toHaveClass('hydrated');
  });
});
