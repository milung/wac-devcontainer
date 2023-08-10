import { Component, Host, Prop, State, h, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'pfx-ambulance-wl-editor', // @_pfx_@
  styleUrl: 'pfx-ambulance-wl-editor.css', // @_pfx_@
  shadow: true,
})
export class PfxAmbulanceWlEditor {  // @_pfx_@

  @Prop() entryId: string;

  @Event({eventName: "editor-closed"}) editorClosed: EventEmitter<string>;

  @State() private duration = 15

  private handleSliderInput(event: Event) {
    this.duration = +(event.target as HTMLInputElement).value;
  }

  render() {
    return (
      <Host>
        <md-filled-text-field label="Meno a Priezvisko" >
          <md-icon slot="leadingicon">person</md-icon>
        </md-filled-text-field>

        <md-filled-text-field label="Registračné číslo pacienta" >
          <md-icon slot="fingerprint">person</md-icon>
        </md-filled-text-field>

        <md-filled-text-field label="Čakáte od" disabled>
          <md-icon slot="leadingicon">watch_later</md-icon>
        </md-filled-text-field>

        <md-filled-select label="Dôvod návštevy">
          <md-icon slot="leadingicon">sick</md-icon>
          <md-select-option value="folowup" headline="Kontrola"></md-select-option>
          <md-select-option value="nausea" headline="Nevoľnosť"></md-select-option>
          <md-select-option value="fever" headline="Horúčka"></md-select-option>
          <md-select-option value="ache-in-throat" headline="Bolesti hrdla"></md-select-option>
        </md-filled-select>

        <div class="duration-slider">
          <span class="label">Predpokladaná doba trvania:&nbsp; </span>
          <span class="label">{this.duration}</span>
          <span class="label">&nbsp;minút</span>
          <md-slider
            min="2" max="45" value={this.duration} ticks labeled
            oninput={this.handleSliderInput.bind(this)}></md-slider>
        </div>

        <md-divider inset></md-divider>

        <div class="actions">
          <md-tonal-button id="delete"
            onClick={() => this.editorClosed.emit("delete")}>
            <md-icon slot="icon">delete</md-icon>
            Zmazať
          </md-tonal-button>
          <span class="stretch-fill"></span>
          <md-outlined-button id="cancel"
            onClick={() => this.editorClosed.emit("cancel")}>
            Zrušiť
          </md-outlined-button>
          <md-filled-button id="confirm"
            onClick={() => this.editorClosed.emit("store")}>
            <md-icon slot="icon">save</md-icon>
            Uložiť
          </md-filled-button>
        </div>
      </Host>
    );
  }

}
