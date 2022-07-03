<script>
  import TextWithButton from '$shared/TextWithButton.svelte';
  import useModal from '$functions/useModal';
  import CaseStudyDetails from '$lib/CaseStudyDetails.svelte';

  export let data;
  export let wrapperRef;

  const [show] = useModal({ title: 'Case Study Details' }, CaseStudyDetails, {
    data,
  });
</script>

<TextWithButton
  text={data.title}
  buttonText="Details"
  boundaryRef={wrapperRef}
  on:click={() => show()}
/>
