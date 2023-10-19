import { Component, Event, EventEmitter, Host, Prop, State, h,} from '@stencil/core';
import { AmbulanceWaitingListApiFactory, WaitingListEntry } from '../../api/ambulance-wl'


@Component({
  tag: '${templateOption:pfx}-ambulance-wl-list',
  styleUrl: 'pfx-ambulance-wl-list.css',
  shadow: true,
})
export class ${templateOption:PfxCamel}AmbulanceWlList {

  @Event({ eventName: "entry-clicked" }) entryClicked: EventEmitter<string>;

  @Prop() apiBase: string;
  @Prop() ambulanceId: string;
  @State() errorMessage: string;

  waitingPatients: WaitingListEntry[];

  private async getWaitingPatientsAsync(): Promise<WaitingListEntry[]> {
    try {
      const response = await
        AmbulanceWaitingListApiFactory(undefined, this.apiBase).
          getWaitingListEntries(this.ambulanceId)
      if (response.status < 299) {
        return response.data;
      } else {
          this.errorMessage = `Cannot retrieve list of waiting patients: ${response.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve list of waiting patients: ${err.message || "unknown"}`
    }
    return [];
  } 

  async componentWillLoad() {
    this.waitingPatients = await this.getWaitingPatientsAsync();
  }
  
  private isoDateToLocale(iso: string) {
    if (!iso) return '';
    return new Date(Date.parse(iso)).toLocaleTimeString()
  }

  render() {
    return (
      <Host>
        {this.errorMessage
          ? <div class="error">{this.errorMessage}</div>
          : <md-list>
          {this.waitingPatients.map((entry) =>
            <md-list-item
              headline={entry.name}
              supportingText={"Predpokladaný vstup: " + this.isoDateToLocale(entry.estimatedStart)}   
              onClick={() => this.entryClicked.emit(entry.id)}
            >   
              <md-icon slot="start">person</md-icon>   
            </md-list-item>   
          )}   
        </md-list>   
        }
        <md-filled-icon-button class="add-button"
          onclick={() => this.entryClicked.emit("@new")}>
          <md-icon>add</md-icon>
        </md-filled-icon-button>
      </Host>
    );
  }

}
