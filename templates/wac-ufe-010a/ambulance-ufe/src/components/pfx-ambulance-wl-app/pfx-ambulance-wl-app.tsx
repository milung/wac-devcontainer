import { Component, Host, Prop, State, h } from '@stencil/core';

declare global {
  interface Window { navigation: any; }
}

@Component({
  tag: 'pfx-ambulance-wl-app', // @_pfx_@
  styleUrl: 'pfx-ambulance-wl-app.css', // @_pfx_@
  shadow: true,
})
export class PfxAmbulanceWlApp { // @_pfx_@

  @State() private relativePath = "";

  @Prop() basePath: string=""

  componentWillLoad() {
    const baseUri = new URL(this.basePath, document.baseURI || "/").pathname;

    const toRelative = (path: string) => {
      if (path.startsWith( baseUri)) {
        this.relativePath = path.slice(baseUri.length)
      } else {
        this.relativePath = ""
      }
    }

    window.navigation?.addEventListener("navigate", (ev: Event) => {
      if ((ev as any).canIntercept) { (ev as any).intercept(); }
      let path = new URL((ev as any).destination.url).pathname;
      toRelative(path);  
    });
    
    toRelative(location.pathname)
  }


  render() {
    let element = "list"
    let entryId = "@new"

    if ( this.relativePath.startsWith("entry/"))
    {
      element = "editor";
      entryId = this.relativePath.split("/")[1]
    }

    const navigate = (path:string) => {
      const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
      window.navigation.navigate(absolute)
    }

    return (
      <Host>
        { element === "editor" 
        ? <pfx-ambulance-wl-editor entry-id={entryId}  // @_pfx_@
          oneditor-closed={ () => window.navigation.navigate("./list")}
        ></pfx-ambulance-wl-editor>  // @_pfx_@
        : <pfx-ambulance-wl-list   // @_pfx_@
           onentry-clicked={ (ev: CustomEvent<string>)=> navigate("./entry/" + ev.detail) } >
          </pfx-ambulance-wl-list>  // @_pfx_@
        }
        
      </Host>
    );
  }

}
