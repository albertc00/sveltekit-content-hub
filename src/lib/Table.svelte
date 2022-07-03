<script>
  import Skeleton from '$lib/Skeleton.svelte';
  import { onMount } from 'svelte';
  import range from '$functions/range';

  export let data = null;
  export let columns;
  export let wrapperRef = null;
  export let initialRowCount = 10;

  $: _columns = columns.filter(({ show }) => show);

  let mql;

  onMount(() => {
    mql = window.matchMedia('(min-width: 1281px)');
  });

  $: maxCols = mql?.matches ? 6 : 5;
  $: visible = columns.filter(({ show }) => show);
  $: colCount = visible.length;
  $: excessCols = Math.max(colCount - maxCols, 0);

  let headerRef;
  let rowRef;
  $: headerHeight = headerRef?.offsetHeight;
  $: rowHeight = rowRef?.offsetHeight;
  $: wrapperScrollXHeight = wrapperRef?.offsetHeight - wrapperRef?.clientHeight;

  $: dummyRows = range(1, initialRowCount);
</script>

<div
  class="table-wrapper"
  bind:this={wrapperRef}
  style:max-height={`calc(${headerHeight}px + (${rowHeight}px * 10) + ${wrapperScrollXHeight}px)`}
>
  <table cellspacing="0" style:width={`calc(100% + (250px * ${excessCols}))`}>
    <thead>
      <tr bind:this={headerRef}>
        {#each _columns as { id, title, headerComponent } (id)}
          <th>
            {#if headerComponent}
              <svelte:component this={headerComponent} text={title} />
            {:else}
              {title}
            {/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#if data}
        {#each data as row (row.id)}
          <tr bind:this={rowRef}>
            {#each _columns as { id, as } (id)}
              {#if as === 'th'}
                <th>
                  <slot name="cell" {row} col={id} />
                </th>
              {:else}
                <td>
                  <slot name="cell" {row} col={id} />
                </td>
              {/if}
            {/each}
          </tr>
        {/each}
      {:else}
        {#each dummyRows as dummyRow (dummyRow)}
          <tr bind:this={rowRef}>
            {#each _columns as { id, show } (id)}
              {#if show}
                <td>
                  <Skeleton />
                </td>
              {/if}
            {/each}
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>

<style lang="scss">
  @use '../styles/app';

  .table-wrapper {
    width: 100%;
    overflow-y: scroll;
    overflow-x: scroll;
    border-top: 1px solid app.colors('grey-200');
    border-left: 1px solid app.colors('grey-200');
  }

  table {
    border-collapse: separate;
    table-layout: fixed;
  }

  thead {
    position: sticky;
    top: 0;
    z-index: 99;
    border-top: 0 none;

    tr {
      background-color: app.colors('grey-150');
    }

    th {
      padding: 0.625rem 1rem;
      @include app.text('sm');
      font-family: 'Work Sans', sans-serif;
      font-weight: 500;
      letter-spacing: 0.025em;
      text-align: left;
      text-transform: uppercase;
      color: app.colors('grey-900');
      border: 1px solid app.colors('grey-200');

      border-top-width: 0;
      border-right-width: 0;
      border-bottom-width: 2px;

      &:first-child {
        border-left-width: 0;
      }

      &:last-child {
        border-right-width: 1px;
      }
    }
  }

  tbody {
    tr {
      &:hover {
        background-color: app.colors('grey-100');
      }
    }

    td {
      @include app.text('sm');
      font-family: 'Lato', sans-serif;
      padding: 0.5rem 1rem;
      border: 1px solid app.colors('grey-200');

      border-top-width: 0;
      border-right-width: 0;

      &:first-child {
        border-left-width: 0;
      }

      &:last-child {
        border-right-width: 1px;
      }
    }
  }
</style>
