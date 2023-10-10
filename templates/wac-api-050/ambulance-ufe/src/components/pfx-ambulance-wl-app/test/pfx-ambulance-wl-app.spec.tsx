import { newSpecPage } from '@stencil/core/testing';
import { ${templateOption:PfxCamel}AmbulanceWlApp } from '../pfx-ambulance-wl-app'; 

describe('pfx-ambulance-wl-app', () => {
  
  it('renders editor', async () => {
    ;
    const page = await newSpecPage({
      url: `http://localhost/entry/@new`,
      components: [${templateOption:PfxCamel}AmbulanceWlApp], 
      html: `<${templateOption:pfx}-ambulance-wl-app base-path="/"></${templateOption:pfx}-ambulance-wl-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual ("${templateOption:pfx}-ambulance-wl-editor");
    
  });

  it('renders list', async () => {
    const page = await newSpecPage({
      url: `http://localhost/ambulance-wl/`,
      components: [${templateOption:PfxCamel}AmbulanceWlApp],
      html: `<${templateOption:pfx}-ambulance-wl-app base-path="/ambulance-wl/"></${templateOption:pfx}-ambulance-wl-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual("${templateOption:pfx}-ambulance-wl-list");
  });
  
});
