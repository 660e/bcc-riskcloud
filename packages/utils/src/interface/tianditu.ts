export namespace TDT {
  export type Icon = 'primary' | 'success' | 'warning' | 'danger';
  export type LngLat = [number, number];

  export interface MenuItem {
    text: string;
    callback?: (lnglat: LngLat) => void;
  }

  export interface CircleOptions {
    color?: string;
    weight?: number;
    opacity?: number;
    fillColor?: string;
    fillOpacity?: number;
    lineStyle?: 'solid' | 'dashed';
  }
}
