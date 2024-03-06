import markerPrimary from './assets/tianditu/marker-primary.svg';
import markerSuccess from './assets/tianditu/marker-success.svg';
import markerWarning from './assets/tianditu/marker-warning.svg';
import markerDanger from './assets/tianditu/marker-danger.svg';

import { TDTContextMenu, TDTMap, TDTMarker, TDTMarkerType } from './interface';

export const T = (window as any).T;

const iconSize = new T.Point(25, 41);
const iconAnchor = new T.Point(13, 41);

export class Map {
  private M: any;

  private getIconUrl(type: TDTMarkerType) {
    switch (type) {
      case 'primary':
        return markerPrimary;
      case 'success':
        return markerSuccess;
      case 'warning':
        return markerWarning;
      case 'danger':
        return markerDanger;
    }
  }

  init(options: TDTMap) {
    this.M = new T.Map(options.el);
    this.M.centerAndZoom(new T.LngLat(options.center[0], options.center[1]), options.zoom);
    return this.M;
  }

  marker(options: TDTMarker) {
    const marker = new T.Marker(new T.LngLat(options.lnglat[0], options.lnglat[1]), {
      icon: new T.Icon({ iconUrl: this.getIconUrl(options.type), iconSize, iconAnchor })
    });
    this.M.addOverLay(marker);
    return marker;
  }

  contextMenu(options: TDTContextMenu) {
    const menu = new T.ContextMenu({ width: options.width });

    options.menu.forEach(item => {
      console.log(item);
      menu.addItem(new T.MenuItem(item.text, item.callback));
    });

    this.M.addContextMenu(menu);

    return menu;
  }
}
