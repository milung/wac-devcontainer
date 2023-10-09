import { newSpecPage } from '@stencil/core/testing';
import { PfxAmbulanceWlApp } from '../pfx-ambulance-wl-app'; // // 

describe('pfx-ambulance-wl-app', () => {
  
  it('renders editor', async () => {
    ;
    const page = await newSpecPage({
      url: `http://localhost/entry/@new`,
      components: [PfxAmbulanceWlApp],  // 
      html: `<pfx-ambulance-wl-app base-path="/"></pfx-ambulance-wl-app>`, // 
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual ("pfx-ambulance-wl-editor"); // 
    
  });

  it('renders list', async () => {
    const page = await newSpecPage({
      url: `http://localhost/ambulance-wl/`,
      components: [PfxAmbulanceWlApp], // 
      html: `<pfx-ambulance-wl-app base-path="/ambulance-wl/"></pfx-ambulance-wl-app>`, // 
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual("pfx-ambulance-wl-list"); // 
  });
  
});
