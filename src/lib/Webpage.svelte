<script>
  import Button from '$shared/Button.svelte';

  export let gated;
  export let unlocked;
</script>

<div class="webpage">
  <Button size="xs" preventDefault filled={false} weight={500} href={gated}
    >Gated</Button
  >
  <Button size="xs" preventDefault filled={false} weight={500} href={unlocked}
    >Unlocked</Button
  >
</div>

<style lang="scss">
  .webpage {
    display: grid;
    grid-template-columns: max-content max-content;
    gap: 0.5rem;
  }
</style>
