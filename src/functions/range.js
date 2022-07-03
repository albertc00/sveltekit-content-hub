export default function range(start = 0, stop, step = 1) {
  let i = start;
  const range = [];

  while (i <= stop) {
    range.push(i);
    i += step;
  }

  return range;
}
