import { newE2EPage } from '@stencil/core/testing';

describe('pfx-ambulance-wl-list', () => { // 
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pfx-ambulance-wl-list></pfx-ambulance-wl-list>'); // 

    const element = await page.find('pfx-ambulance-wl-list'); // 
    expect(element).toHaveClass('hydrated');
  });
});
