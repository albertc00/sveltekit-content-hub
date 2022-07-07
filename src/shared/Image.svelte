<script>
  let loaded = false;
  let init = true;

  let fallbackImage = '&#xe894;'; // Globe

  function fallback(img, codePoint = '') {
    if (codePoint !== '') {
      fallbackImage = codePoint;
    }

    img.addEventListener(
      'load',
      () => {
        loaded = true;
        init = false;
      },
      { once: true }
    );

    img.addEventListener(
      'error',
      () => {
        loaded = false;
        init = false;
      },
      { once: true }
    );
  }
</script>

{#if init || loaded}
  <slot {fallback} />
{:else}
  <span class="fallback material-symbols-outlined">{@html fallbackImage}</span>
{/if}
