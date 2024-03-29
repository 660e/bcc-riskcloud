export namespace TDT {
  export type Icon = 'primary' | 'success' | 'warning' | 'danger';
  export type LngLat = [number, number];
  export type Level = 'country' | 'province' | 'city' | 'district';

  export interface Marker {
    id: number;
    label: string;
    lnglat: LngLat;
    icon?: Icon;
    drag?: boolean;
  }

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

  export interface PolygonOptions {
    color?: string;
    weight?: number;
    opacity?: number;
    fillColor?: string;
    fillOpacity?: number;
    lineStyle?: 'solid' | 'dashed';
  }
}
