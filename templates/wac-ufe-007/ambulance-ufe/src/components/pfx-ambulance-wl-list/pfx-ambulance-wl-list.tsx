import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'pfx-ambulance-wl-list', // @_pfx_@
  styleUrl: 'pfx-ambulance-wl-list.css', // @_pfx_@
  shadow: true,
})
export class PfxAmbulanceWlList { // @_pfx_@

  waitingPatients: any[]; 
  private async getWaitingPatientsAsync(){  
    return await Promise.resolve(  
      [{  
          name: 'Jožko Púčik',  
          patientId: '10001',  
          since: new Date(Date.now() - 10 * 60).toISOString(),  
          estimatedStart: new Date(Date.now() + 65 * 60).toISOString(),  
          estimatedDurationMinutes: 15,  
          condition: 'Kontrola'  
      }, {  
          name: 'Bc. August Cézar',  
          patientId: '10096',  
          since: new Date(Date.now() - 30 * 60).toISOString(),  
          estimatedStart: new Date(Date.now() + 30 * 60).toISOString(),  
          estimatedDurationMinutes: 20,  
          condition: 'Teploty'  
      }, {  
          name: 'Ing. Ferdinand Trety',  
          patientId: '10028',  
          since: new Date(Date.now() - 72 * 60).toISOString(),  
          estimatedStart: new Date(Date.now() + 5 * 60).toISOString(),  
          estimatedDurationMinutes: 15,  
          condition: 'Bolesti hrdla'  
      }]  
    );  
  } 

  async componentWillLoad() {
    this.waitingPatients = await this.getWaitingPatientsAsync();
  }
  
  private isoDateToLocale(iso:string) {
    if(!iso) return '';
    return new Date(Date.parse(iso)).toLocaleTimeString()
  }


  render() {
    return (
      <Host>
        <md-list>   
          {this.waitingPatients.map(entry =>   
            <md-list-item   
              headline={entry.name}   
              supportingText={"Predpokladaný vstup: " + this.isoDateToLocale(entry.estimatedStart)}   
            >   
              <md-icon slot="start">person</md-icon>   
            </md-list-item>   
          )}   
        </md-list>   
      </Host>
    );
  }

}
