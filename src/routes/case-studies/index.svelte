<script context="module">
  export async function load({ fetch }) {
    const controller = new AbortController();
    const signal = controller.signal;

    const url =
      'https://www.callboxinc.com/wp-json/cch/v1/case-studies?per_page=10&page=1';

    const res = await fetch(url, { signal });
    const data = await res.json();

    if (res.ok) {
      return {
        props: {
          data,
        },
      };
    }

    return {
      status: res.status,
      error: new Error("Couldn't fetch case studies."),
    };
  }
</script>

<script>
  import CaseStudies from '$lib/CaseStudies.svelte';
  export let data;
</script>

<svelte:head>
  <title>Case Studies</title>
</svelte:head>

<CaseStudies {data} />
