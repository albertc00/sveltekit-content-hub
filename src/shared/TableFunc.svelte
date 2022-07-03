<script>
  import Button from './Button.svelte';
  export let data;
  export let text;
  import CaseResult from '$lib/CaseResult.svelte';
  import useModal from '$functions/useModal';

  const [show] = useModal({ title: 'Case Study Preview' }, CaseResult, {
    title: data.title,
    text: text,
  });
</script>

<div>
  <Button
    size="xs"
    preventDefault
    filled={false}
    weight={500}
    on:click={() => show()}>Results</Button
  >
</div>
