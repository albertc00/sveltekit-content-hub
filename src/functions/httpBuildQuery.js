import { isArray, isObject, isScalar } from './objType';

function entries(obj) {
  if (isArray(obj)) {
    return obj.map((d, i) => [i, d]);
  } else if (isObject(obj)) {
    return Object.entries(obj);
  }

  return [[0, obj]];
}

function httpBuildQueryHelper(data, name) {
  const out = [];

  for (const [key, val] of entries(data)) {
    if (isArray(val)) {
      out.push(httpBuildQueryHelper(val, `${name}[${key}]`));
    } else if (isScalar(val)) {
      out.push(
        `${name}[${encodeURIComponent(key)}]=${encodeURIComponent(val)}`
      );
    } else if (isObject(val)) {
      out.push(httpBuildQueryHelper(val, `${name}[${key}]`));
    }
  }

  return out.join('&');
}

export default function httpBuildQuery(data) {
  const out = [];

  for (const [key, val] of entries(data)) {
    if (val === null || val === undefined) {
      continue;
    }

    if (isScalar(val)) {
      out.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
      continue;
    }

    if (isArray(val) || isObject(val)) {
      out.push(httpBuildQueryHelper(val, encodeURIComponent(key)));
      continue;
    }

    return null;
  }

  return out.join('&');
}
