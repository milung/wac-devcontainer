import { newE2EPage } from '@stencil/core/testing';

describe('pfx-ambulance-wl-app', () => {  // 
  it('renders', async () => {
    const page = await newE2EPage();
    
    await page.setContent('<pfx-ambulance-wl-app></pfx-ambulance-wl-app>');  // 

    const element = await page.find('pfx-ambulance-wl-app');  // 
    expect(element).toHaveClass('hydrated');
  });
});
