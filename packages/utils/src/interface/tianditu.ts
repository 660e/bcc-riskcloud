export namespace TDT {
  export type MarkerType = 'primary' | 'success' | 'warning' | 'danger';
  export type LngLat = [number, number];

  export interface MapOptions {
    el: string;
    center: LngLat;
    zoom?: number;
  }

  export interface MarkerOptions {
    lnglat: LngLat;
    type?: MarkerType;
  }

  export interface ContextMenuOptions {
    contextMenu: any;
    width?: number;
  }

  export interface MenuItemOptions {
    text: string;
    callback?: () => void;
  }

  export interface CircleOptions {
    lnglat: LngLat;
    radius?: number;
  }

  export interface CenterAndZoomOptions {
    lnglat: LngLat;
    zoom: number;
  }
}
