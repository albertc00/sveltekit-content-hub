<script>
  export let href = '';
  export let type = 'button';
  export let preventDefault = false;
  export let disabled = false;
  export let filled = true;
  export let size = 'base';
  export let weight = 700;
  export let color = 'blue-400';
</script>

{#if href}
  <a
    class={`button ${size} ${color}`}
    class:filled
    {href}
    style:font-weight={weight}
    target="_blank"
  >
    <slot />
  </a>
{:else if preventDefault}
  <button
    {type}
    class={`button ${size} ${color}`}
    class:filled
    on:click|preventDefault
    {disabled}
    style:font-weight={weight}
  >
    <slot />
  </button>
{:else}
  <button
    {type}
    class={`button ${size} ${color}`}
    class:filled
    on:click
    {disabled}
    style:font-weight={weight}
  >
    <slot />
  </button>
{/if}

<style lang="scss">
  @use '../styles/app';

  $color: app.colors('blue-400');

  .button {
    &.blue-700 {
      $color: app.colors('blue-700');
    }

    display: inline-block;
    @include app.text('base');
    font-family: 'Lato', sans-serif;
    padding: 0.375rem 1rem;
    border: 1px solid $color;
    border-radius: 0.2rem;
    background-color: #fff;
    color: $color;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;

    &.xs {
      @include app.text('xs');
      padding: 0.18rem 0.625rem;
    }

    &.sm {
      @include app.text('sm');
      padding: 0.18rem 0.625rem;
    }

    &.filled {
      background-color: $color;
      color: #fff;
      transition: none;
    }

    &:hover {
      background-color: $color;
      color: #fff;
    }

    &:disabled {
      border-color: app.colors('grey-150');
      background-color: app.colors('grey-150');
      color: app.colors('grey-200');
      cursor: not-allowed;
    }
  }

  a.button {
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }
</style>
