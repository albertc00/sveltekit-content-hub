<script>
  import { createEventDispatcher } from 'svelte';

  export let searchQuery = '';
  export let placeholder = 'Type keywords to find';
  export let delay = 750;

  const dispatch = createEventDispatcher();

  $: searchTerm = searchQuery.trim();
  let timer;

  $: {
    clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch('search', searchTerm);
    }, delay);
  }

  $: empty = searchTerm.length === 0;
</script>

<form on:submit|preventDefault>
  <div class="wrapper">
    <input
      type="search"
      class:empty
      {placeholder}
      spellcheck={true}
      bind:value={searchTerm}
    />
    {#if empty}
      <span class="icon material-symbols-outlined">&#xe8b6;</span>
    {/if}
  </div>
</form>

<style lang="scss">
  @use '../styles/app';

  form {
    width: 100%;
  }

  .wrapper {
    position: relative;
    border-radius: 0.375rem;
  }

  input {
    display: inline-block;
    width: 100%;
    padding: 0.5rem 0.75rem;
    margin: 0;
    @include app.text('sm');
    font-family: 'Lato', sans-serif;
    color: app.colors('grey-400');
    border: 1px solid app.colors('grey-200');
    border-radius: 0.375rem;
    // box-shadow: 0px 8px 9px -6px rgb(95 115 128 / 44%);

    &.empty {
      padding-right: calc(24px + 0.5rem);
    }

    &:focus {
      outline: 0 none;
    }
  }

  .icon {
    position: absolute;
    top: 50%;
    right: 0.375rem;
    transform: translateY(-50%);
    color: app.colors('grey-400');
  }
</style>
