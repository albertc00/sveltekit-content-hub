<script>
  import { onMount } from 'svelte';
  import Tooltip from '$shared/Tooltip.svelte';
  import hasEllipses from '$functions/hasEllipses.js';

  export let text;
  export let wrapperRef;

  $: if (Array.isArray(text)) {
    text = text.join(', ');
  }

  let decodeHtml;

  $: dec = decodeHtml ? decodeHtml(text) : text;

  onMount(() => {
    decodeHtml = (() => {
      const text = document.createElement('textarea');

      return (html) => {
        text.innerHTML = html;
        return text.value;
      };
    })();
  });

  let slotRef;
  $: disabled = slotRef && !hasEllipses(slotRef);
</script>

<Tooltip title={dec} boundaryRef={wrapperRef} {disabled}>
  <div bind:this={slotRef} class="cell">
    {dec}
  </div>
</Tooltip>

<style lang="scss">
  @use '../styles/app';

  .cell {
    @include app.text('sm');
    font-family: 'Lato', sans-serif;
    color: app.colors('grey-900');
    padding: 0.25rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
