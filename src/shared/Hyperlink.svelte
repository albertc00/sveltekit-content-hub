<script>
  import Tooltip from '$shared/Tooltip.svelte';
  import hasEllipses from '$functions/hasEllipses.js';

  export let link;
  export let text;
  export let as = 'p';
  export let favicon = true;
  export let iconSize = 16;
  export let wrapperRef;

  let textRef;
  $: disabled = textRef && !hasEllipses(textRef);
</script>

{#if link}
  <div class="wrapper">
    <Tooltip title={text} {disabled} boundaryRef={wrapperRef}>
      <svelte:element this={as} class="hyperlink">
        <a href={link} class="link" target="_blank" class:favicon>
          {#if favicon}
            <img
              class="favicon"
              src={`https://s2.googleusercontent.com/s2/favicons?domain=${link}`}
              alt="Company logo"
              width={iconSize}
              height={iconSize}
              loading="lazy"
            />
          {/if}
          <span class="text" bind:this={textRef}>{text}</span>
        </a>
      </svelte:element>
    </Tooltip>
  </div>
{/if}

<style lang="scss">
  @use '../styles/app';

  @include app.root {
    .hyperlink {
      margin: 0;
    }

    .link {
      width: 100%;
      @include app.text('sm');
      font-family: 'Lato', sans-serif;
      font-weight: 600;
      text-decoration: none;
      color: app.colors('blue-350');

      &.favicon {
        display: inline-flex;
        gap: 0.75rem;
        align-items: center;
      }
    }

    .text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .wrapper {
      position: relative;
      box-sizing: border-box;
      @include app.text('sm');
      font-family: 'Lato', sans-serif;
      color: app.colors('grey-900');
      border-radius: 0.25rem;
    }
  }
</style>
