<script>
  import Tooltip from '$shared/Tooltip.svelte';
  import hasEllipses from '$functions/hasEllipses.js';

  export let link;
  export let text = 'I am a hyperlink';
  export let favicon = false;
  export let copyButton = false;
  export let wrapperRef = null;

  let textRef;
  $: disabled = textRef && !hasEllipses(textRef);

  let textRefWidth;

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

{#if link}
  <div
    class="hyperlink"
    class:copyButton
    style={`--text-ref-width: ${textRefWidth}px;`}
  >
    <Tooltip title={text} {disabled} boundaryRef={wrapperRef}>
      <a href={link} class="link" target="_blank">
        {#if favicon}
          <img
            class="favicon"
            src={`https://s2.googleusercontent.com/s2/favicons?domain=${link}`}
            alt="Company logo"
            width="16"
            height="16"
            loading="lazy"
          />
        {/if}
        <span class="text" bind:this={textRef} bind:offsetWidth={textRefWidth}>
          {text}
        </span>
      </a>
    </Tooltip>
    {#if copyButton}
      {#if copied}
        <span class="abs copied material-symbols-outlined">&#xe86c;</span>
      {:else}
        <button
          type="button"
          class="abs copy material-symbols-outlined"
          on:click={handleCopy}>&#xe14d;</button
        >
      {/if}
    {/if}
  </div>
{/if}

<style lang="scss">
  @use '../styles/app';

  .hyperlink {
    margin: 0;
    position: relative;
  }

  .link {
    width: 100%;
    @include app.text('sm');
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    text-decoration: none;
    color: app.colors('blue-350');

    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .copyButton {
    .link {
      width: calc(100% - (24px + 0.75rem));
    }
  }

  .text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    left: calc(var(--text-ref-width) + 0.75rem);
    transform: translateY(-50%);
  }
</style>
