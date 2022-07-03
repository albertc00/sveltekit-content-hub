export async function httpFetch(resource, init) {
  const controller = new AbortController();
  const signal = controller.signal;

  const res = await fetch(resource, {
    signal,
    ...init,
  }).catch((error) => console.error(error));

  const data = await res.json();

  return data;
}
