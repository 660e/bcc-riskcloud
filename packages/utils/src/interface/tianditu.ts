export type TDTMarkerType = 'primary' | 'success' | 'warning' | 'danger';

export interface TDTContextMenu {
  menu: any;
  width: number;
}

export interface TDTMap {
  el: string;
  center: [number, number];
  zoom: number;
}

export interface TDTMarker {
  lnglat: [number, number];
  type: TDTMarkerType;
}
