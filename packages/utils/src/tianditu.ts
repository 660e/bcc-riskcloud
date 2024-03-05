import markerPrimary from './assets/tianditu/marker-primary.svg';

export const T = (window as any).T;

export const MarkerIconPrimary = new T.Icon({
  iconUrl: markerPrimary,
  iconSize: new T.Point(25, 41),
  iconAnchor: new T.Point(13, 41)
});
