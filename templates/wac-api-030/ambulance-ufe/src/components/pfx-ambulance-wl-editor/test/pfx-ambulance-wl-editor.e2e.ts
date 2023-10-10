import { newE2EPage } from '@stencil/core/testing';

describe('${templateOption:pfx}-ambulance-wl-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<${templateOption:pfx}-ambulance-wl-editor></${templateOption:pfx}-ambulance-wl-editor>'); 

    const element = await page.find('${templateOption:pfx}-ambulance-wl-editor');
    expect(element).toHaveClass('hydrated');
  });
});
