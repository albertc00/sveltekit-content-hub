<script>
  import Button from '$shared/Button.svelte';

  export let gated;
  export let unlocked;
</script>

<div class="webpage">
  <a class="text" target="_blank" href={gated}>Gated</a>
  <a class="text" target="_blank" href={unlocked}>Unlocked</a>
</div>

<style lang="scss">
  @use '../styles/app';
  .webpage {
    display: grid;
    grid-template-columns: max-content max-content;
    gap: 0.725rem;
  }

  .text {
    width: 100%;
    @include app.text('sm');
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    text-decoration: none;
    color: app.colors('blue-350');
  }
</style>
