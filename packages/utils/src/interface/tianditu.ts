export namespace TDT {
  export type Icon = 'primary' | 'success' | 'warning' | 'danger';
  export type LngLat = [number, number];

  export interface MenuItem {
    text: string;
    callback?: (lnglat: LngLat) => void;
  }
}
