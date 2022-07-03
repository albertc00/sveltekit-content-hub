<script>
  import { createEventDispatcher } from 'svelte';
  import getPageNumbers, {
    LEFT_PAGE,
    RIGHT_PAGE,
  } from '$functions/getPageNumbers';

  export let totalRecords;
  export let perPage = 10;
  export let currentPage = 1;
  export let adjacent = 1;

  const perPages = [10, 20, 30];

  $: totalPages = Math.ceil(totalRecords / perPage);
  $: pages = getPageNumbers(totalPages, currentPage, adjacent);

  const dispatch = createEventDispatcher();

  function handlePerPage() {
    dispatch('perPage', perPage);
  }
</script>

<nav>
  <ul>
    {#each pages as page (page)}
      {#if page === LEFT_PAGE}
        <li>
          <slot name="left" page={currentPage - adjacent * 2 - 1} />
        </li>
      {:else if page === RIGHT_PAGE}
        <li>
          <slot name="right" page={currentPage + adjacent * 2 + 1} />
        </li>
      {:else}
        <li>
          <slot name="page" {page} />
        </li>
      {/if}
    {/each}
  </ul>
  <select bind:value={perPage} on:change={handlePerPage}>
    {#each perPages as pp}
      <option value={pp}>{pp} per page</option>
    {/each}
  </select>
</nav>

<style lang="scss">
  @use '../styles/app';

  nav {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    padding: 1rem 0;
  }

  ul {
    @include app.reset-list;
    display: flex;
    gap: 0.5rem;
  }

  select {
    display: inline-block;
    @include app.text('sm');
    font-family: 'Lato', sans-serif;
    margin: 0;
    padding: 0.25rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    color: app.colors('grey-900');

    &:focus {
      outline: 1px solid app.colors('grey-400', 0.375);
    }
  }
</style>
