import markerPrimary from './assets/tianditu/marker-primary.svg';
import markerSuccess from './assets/tianditu/marker-success.svg';
import markerWarning from './assets/tianditu/marker-warning.svg';
import markerDanger from './assets/tianditu/marker-danger.svg';

import { TDTMap, TDTMarker } from './interface';

export const T = (window as any).T;

const iconSize = new T.Point(25, 41);
const iconAnchor = new T.Point(13, 41);

export class Map {
  private el: string;
  private center: [number, number];
  private zoom: number;

  constructor(options: TDTMap) {
    this.el = options.el;
    this.center = options.center;
    this.zoom = options.zoom;
  }

  init() {
    const M = new T.Map(this.el);
    M.centerAndZoom(new T.LngLat(this.center[0], this.center[1]), this.zoom);
    return M;
  }

  marker(options: TDTMarker) {
    let iconUrl: any;
    switch (options.type) {
      case 'primary':
        iconUrl = markerPrimary;
        break;
      case 'success':
        iconUrl = markerSuccess;
        break;
      case 'warning':
        iconUrl = markerWarning;
        break;
      case 'danger':
        iconUrl = markerDanger;
        break;
    }
    return new T.Marker(new T.LngLat(options.lnglat[0], options.lnglat[1]), {
      icon: new T.Icon({ iconUrl, iconSize, iconAnchor })
    });
  }
}
