import { newE2EPage } from '@stencil/core/testing';

describe('milung-ambulance-wl-list', () => { // @_milung_@
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<milung-ambulance-wl-list></milung-ambulance-wl-list>'); // @_milung_@

    const element = await page.find('milung-ambulance-wl-list'); // @_milung_@
    expect(element).toHaveClass('hydrated');
  });
});