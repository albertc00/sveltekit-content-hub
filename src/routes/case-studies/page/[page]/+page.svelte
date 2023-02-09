<script>
  import CaseStudies from '$lib/CaseStudies.svelte';
  export let data;
</script>

<svelte:head>
  <title>Callbox Case Studies</title>
  <meta
    name="description"
    content="Find out how Callbox helped clients increase their sales and achieve greater business opportunities"
  />
  <meta
    name="keywords"
    content="callbox content hub, content hub, callbox, callbox content, callbox hub"
  />
</svelte:head>

<CaseStudies {data} />
