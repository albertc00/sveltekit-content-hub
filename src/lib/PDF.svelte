<script>
  export let link;

  let copied = false;

  function handleCopy() {
    navigator.clipboard.writeText(link).then(() => {
      copied = true;

      setTimeout(() => {
        copied = false;
      }, 500);
    });
  }
</script>

<div class="pdf">
  <a class="link" href={link} target="_blank">
    <slot />
  </a>
  {#if copied}
    <span class="abs copied material-symbols-outlined">&#xe86c;</span>
  {:else}
    <button
      type="button"
      class="abs copy material-symbols-outlined"
      on:click={handleCopy}>&#xe14d;</button
    >
  {/if}
</div>

<style lang="scss">
  @use '../styles/app';

  .pdf {
    position: relative;
    display: inline-block;
    @include app.text('sm');
  }

  .link {
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    text-decoration: none;
    color: app.colors('blue-350');
  }

  .copy {
    padding: 0;
    border: 0 none;
    background: transparent;
    color: app.colors('grey-400', 0.7);
    cursor: pointer;

    &:hover {
      color: app.colors('grey-400');
    }
  }

  .copied {
    font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    color: app.colors('blue-350', 0.8);
  }

  .abs {
    position: absolute;
    top: 50%;
    right: calc((0.75rem + 24px) * -1);
    transform: translateY(-50%);
  }
</style>
