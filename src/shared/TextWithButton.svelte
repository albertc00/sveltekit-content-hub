<script>
  import Button from '$shared/Button.svelte';
  import Tooltip from '$shared/Tooltip.svelte';
  import hasEllipses from '$functions/hasEllipses';

  export let text = 'Hello World';
  export let buttonText = 'Click Me';
  export let boundaryRef = null;

  let textRef;
  $: disabled = textRef && !hasEllipses(textRef);

  let offsetWidth;
</script>

<div class="wrapper">
  <Tooltip title={text} {boundaryRef} {disabled}>
    <p
      bind:this={textRef}
      class="text"
      style={`--button-width: ${offsetWidth}px;`}
    >
      {text}
    </p>
  </Tooltip>
  <div bind:offsetWidth class="button">
    <Button size="xs" preventDefault filled={false} weight={500} on:click
      >{buttonText}</Button
    >
  </div>
</div>

<style lang="scss">
  @use '../styles/app';

  .text {
    margin: 0;
    @include app.text('sm');
    font-family: 'Lato', sans-serif;
    color: app.colors('grey-900');
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .button {
    display: none;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }

  .wrapper {
    position: relative;

    &:hover {
      .text {
        width: calc(100% - (var(--button-width) + 0.25rem));
      }

      .button {
        display: block;
      }
    }
  }
</style>
