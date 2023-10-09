import { newSpecPage } from '@stencil/core/testing';
import { ${templateOption:PfxCamel}AmbulanceWlList } from '../pfx-ambulance-wl-list';  

describe('${templateOption:pfx}-ambulance-wl-list', () => {  
  it('renders', async () => {
    const page = await newSpecPage({
      components: [${templateOption:PfxCamel}AmbulanceWlList],  
      html: `<${templateOption:pfx}-ambulance-wl-list></${templateOption:pfx}-ambulance-wl-list>`,  
    });
    expect(page.root).toEqualHtml(
      <${templateOption:pfx}-ambulance-wl-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </${templateOption:pfx}-ambulance-wl-list>
    );
  });
});
