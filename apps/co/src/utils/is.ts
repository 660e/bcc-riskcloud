export function isFunction(source: any) {
  return toString.call(source) === '[object Function]';
}

export function isObject(source: any) {
  return toString.call(source) === '[object Object]';
}

export function isArray(source: any) {
  return toString.call(source) === '[object Array]';
}

export function isString(source: any) {
  return toString.call(source) === '[object String]';
}

export function isNumber(source: any) {
  return toString.call(source) === '[object Number]';
}

export function isUndefined(source: any) {
  return toString.call(source) === '[object Undefined]';
}

export function isNull(source: any) {
  return toString.call(source) === '[object Null]';
}

export function isDate(source: any) {
  return toString.call(source) === '[object Date]';
}

export function isMath(source: any) {
  return toString.call(source) === '[object Math]';
}

export function isWindow(source: any) {
  return toString.call(source) === '[object Window]';
}

export function isBlob(source: any) {
  return toString.call(source) === '[object Blob]';
}

export function isBoolean(source: any) {
  return toString.call(source) === '[object Boolean]';
}
