import { newE2EPage } from '@stencil/core/testing';

describe('${templateOption:pfx}-ambulance-wl-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    
    await page.setContent('<${templateOption:pfx}-ambulance-wl-app></${templateOption:pfx}-ambulance-wl-app>');

    const element = await page.find('${templateOption:pfx}-ambulance-wl-app');
    expect(element).toHaveClass('hydrated');
  });
});
