import { newE2EPage } from '@stencil/core/testing';

describe('pfx-ambulance-wl-editor', () => {  // @_pfx_@
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pfx-ambulance-wl-editor></pfx-ambulance-wl-editor>');   // @_pfx_@

    const element = await page.find('pfx-ambulance-wl-editor');
    expect(element).toHaveClass('hydrated');
  });
});
