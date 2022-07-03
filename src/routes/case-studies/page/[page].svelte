<script context="module">
  export async function load({ fetch, params, url: { searchParams } }) {
    const controller = new AbortController();
    const signal = controller.signal;

    const page = params.page;
    // const perPage = searchParams.has('per_page')
    //   ? searchParams.get('per_page')
    //   : 10;
    const url = `https://www.callboxinc.com/wp-json/cch/v1/case-studies?page=${page}&${searchParams.toString()}`;

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

<CaseStudies {data} />
