export default function objType(obj) {
  const type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  if (Number.isNaN(obj)) return 'NaN';
  return type;
}

export function isArray(obj) {
  return objType(obj) === 'array';
}

export function isObject(obj) {
  return objType(obj) === 'object';
}

export function isScalar(obj) {
  const type = objType(obj);
  return type === 'string' || type === 'number' || type === 'boolean';
}
