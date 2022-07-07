<script>
  import TextWithButton from '$shared/TextWithButton.svelte';
  import Results from '$lib/CaseResult.svelte';
  import useModal from '$functions/useModal';

  export let results;
  export let title;
  export let wrapperRef;

  $: text = results.map(({ label, value }) => `${value} ${label}`).join('; ');

  const [show] = useModal({ title: 'Case Study Results' }, Results, {
    results,
    title,
  });
</script>

<TextWithButton
  {text}
  buttonText="Details"
  boundaryRef={wrapperRef}
  on:click={() => show()}
/>
