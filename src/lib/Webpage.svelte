<script>
  export let gated;
  export let unlocked;
</script>

<div class="webpage">
  <a class="text" target="_blank" href={gated}>Gated</a><span>|</span><a
    class="text"
    target="_blank"
    href={unlocked}>Full version</a
  >
</div>

<style lang="scss">
  @use '../styles/app';

  .webpage {
    display: grid;
    grid-template-columns: max-content max-content max-content;
    gap: 0.75rem;
    align-items: center;
  }

  .text {
    @include app.text('sm');
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    text-decoration: none;
    color: app.colors('blue-350');
  }
</style>
