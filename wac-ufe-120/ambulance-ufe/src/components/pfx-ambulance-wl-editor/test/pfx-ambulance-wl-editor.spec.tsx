import { newSpecPage } from '@stencil/core/testing';
import { PfxAmbulanceWlEditor } from '../pfx-ambulance-wl-editor'; // @_pfx_@

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Condition, WaitingListEntry } from '../../../api/ambulance-wl';

describe('pfx-ambulance-wl-editor', () => { // @_pfx_@
  const sampleEntry: WaitingListEntry = {
    id: "entry-1",
    patientId: "p-1",
    name: "Juraj Prvý",
    waitingSince: "20240203T12:00",
    estimatedDurationMinutes: 20,
    condition: {
      "value": "Nevoľnosť",
      "code": "nausea",
      "reference": "https://zdravoteka.sk/priznaky/nevolnost/"
    }
  };

  const sampleConditions: Condition[] = [
    {
        "value": "Teploty",
        "code": "subfebrilia",
        "reference": "https://zdravoteka.sk/priznaky/zvysena-telesna-teplota/",
        "typicalDurationMinutes": 20
    },
    {
        "value": "Nevoľnosť",
        "code": "nausea",
        "reference": "https://zdravoteka.sk/priznaky/nevolnost/",
        "typicalDurationMinutes": 45
    },
  ];

  let delay = async (miliseconds: number) => await new Promise<void>(resolve => {
      setTimeout(() => resolve(), miliseconds);
  })

  let mock: MockAdapter;

  beforeAll(() => { mock = new MockAdapter(axios); });
  afterEach(() => { mock.reset(); });

  it('buttons shall be of different type', async () => {

    mock.onGet(/^.*\/entries\/.+/).reply(200, sampleEntry);
    mock.onGet(/^.*\/condition$/).reply(200, sampleConditions);

    const page = await newSpecPage({
      components: [PfxAmbulanceWlEditor], // @_pfx_@
      html: `<pfx-ambulance-wl-editor entry-id="test-entry" ambulance-id="test-ambulance" api-base="http://sample.test/api"></pfx-ambulance-wl-editor>`, // @_pfx_@
    });

    await delay(300);
    await page.waitForChanges();
    
    let items: any = await page.root.shadowRoot.querySelectorAll("md-filled-button");
    expect(items.length).toEqual(1);
    items = await page.root.shadowRoot.querySelectorAll("md-outlined-button");
    expect(items.length).toEqual(1);

    items = await page.root.shadowRoot.querySelectorAll("md-tonal-button");
    expect(items.length).toEqual(1);
  });

  it('first text field is patient name', async () => {
    
    mock.onGet(/^.*\/entries\/.+/).reply(200, sampleEntry);
    mock.onGet(/^.*\/condition$/).reply(200, sampleConditions);

    const page = await newSpecPage({
      components: [PfxAmbulanceWlEditor], // @_pfx_@
      html: `<pfx-ambulance-wl-editor entry-id="test-entry" ambulance-id="test-ambulance" api-base="http://sample.test/api"></pfx-ambulance-wl-editor>`, // @_pfx_@
    });
    await delay(300);
    await page.waitForChanges();

    let items: any = await page.root.shadowRoot.querySelectorAll("md-filled-text-field");
    expect(items.length).toBeGreaterThanOrEqual(1);
    const item = items[0] as HTMLInputElement;
    expect(item.getAttribute("value")).toEqual(sampleEntry.name);
    
  });

});