export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 500,
  OVERDUE = 401,
  TIMEOUT = 30000,
  TYPE = 'success'
}

export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export enum ContentTypeEnum {
  JSON = 'application/json;charset=UTF-8',
  TEXT = 'text/plain;charset=UTF-8',
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface TreeSelectOption {
  label: string;
  value: string | number;
  children?: TreeSelectOption[];
}

export interface TDTMap {
  el: string;
  center: [number, number];
  zoom: number;
}

export interface TDTMarker {
  lnglat: [number, number];
  type: 'primary' | 'success' | 'warning' | 'danger';
}
