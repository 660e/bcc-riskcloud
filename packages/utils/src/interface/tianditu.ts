export type TMarkerType = 'primary' | 'success' | 'warning' | 'danger';
export type TLngLat = [number, number];

export interface TMap {
  el: string;
  center: TLngLat;
  zoom: number;
}

export interface TMarker {
  lnglat: TLngLat;
  type: TMarkerType;
}

export interface TContextMenu {
  contextMenu: any;
  width: number;
}

export interface TMenuItem {
  text: string;
  callback: () => void;
}

export interface TCircle {
  lnglat: TLngLat;
  radius: number;
}
