<script>
  import Button from '$shared/Button.svelte';

  export let pdf;
  export let center = false;
  let copied = false;

  const copy = async () => {
    await navigator.clipboard.writeText(pdf);
    copied = true;

    setTimeout(() => {
      copied = !copied;
    }, 2000);
  };
</script>

<div class="wrapper" class:center>
  <Button size="xs" preventDefault filled={false} weight={500} href={pdf}
    >View PDF</Button
  >

  <button class="copy" on:click={copy}>
    <span class="material-symbols-outlined" class:copied>&#xe14d;</span>
  </button>
</div>

<style lang="scss">
  @use '../styles/app';

  @include app.root {
    .wrapper {
      display: grid;
      grid-template-columns: max-content max-content;
      gap: 1rem;
      align-items: center;

      &.center {
        justify-content: center;
      }

      .copy {
        all: unset;
      }

      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20;
        color: app.colors('blue-400');
        cursor: pointer;
      }

      .copied {
        font-variation-settings: 'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 20;
      }
    }
  }
</style>
