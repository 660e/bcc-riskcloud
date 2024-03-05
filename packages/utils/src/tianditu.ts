import markerPrimary from './assets/tianditu/marker-primary.svg';
import markerSuccess from './assets/tianditu/marker-success.svg';
import markerWarning from './assets/tianditu/marker-warning.svg';
import markerDanger from './assets/tianditu/marker-danger.svg';

export const T = (window as any).T;

const iconSize = new T.Point(25, 41);
const iconAnchor = new T.Point(13, 41);

export const MarkerIconPrimary = new T.Icon({ iconUrl: markerPrimary, iconSize, iconAnchor });
export const MarkerIconSuccess = new T.Icon({ iconUrl: markerSuccess, iconSize, iconAnchor });
export const MarkerIconWarning = new T.Icon({ iconUrl: markerWarning, iconSize, iconAnchor });
export const MarkerIconDanger = new T.Icon({ iconUrl: markerDanger, iconSize, iconAnchor });
