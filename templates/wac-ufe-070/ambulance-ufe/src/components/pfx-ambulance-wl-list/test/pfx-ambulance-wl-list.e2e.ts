import { newE2EPage } from '@stencil/core/testing';

describe('${templateOption:pfx}-ambulance-wl-list', () => { 
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<${templateOption:pfx}-ambulance-wl-list></${templateOption:pfx}-ambulance-wl-list>');

    const element = await page.find('${templateOption:pfx}-ambulance-wl-list'); 
    expect(element).toHaveClass('hydrated');
  });
});
