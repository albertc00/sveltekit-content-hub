<script>
  import range from '$functions/range';

  export let data = null;
  export let columns;
  export let initialRowCount = 10;

  $: _columns = columns.filter(({ show }) => show);

  let windowWidth;
  let wrapperRef;
  let excessWidth;

  $: if (windowWidth && wrapperRef) {
    const maxCols = window.matchMedia('(min-width: 1281px)').matches ? 7 : 5;
    const colWidth = wrapperRef?.clientWidth / maxCols;
    const colCount = _columns.length;
    const excessCols = Math.max(colCount - maxCols, 0);
    excessWidth = colWidth * excessCols;
  }

  const maxRows = 10;
  let headerRef;
  let rowRef = [];
  let maxHeight;

  $: if (headerRef && rowRef[0] && wrapperRef) {
    const headerHeight = headerRef.offsetHeight;
    const rowHeight = rowRef[0].offsetHeight;
    const scrollXHeight = wrapperRef.offsetHeight - wrapperRef.clientHeight;
    maxHeight = headerHeight + rowHeight * maxRows + scrollXHeight;
  }

  let dummyRows = [];
  $: if (!data) {
    dummyRows = range(1, initialRowCount);
  }
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div
  class="table-wrapper"
  bind:this={wrapperRef}
  style:max-height={`${maxHeight}px`}
>
  <table cellspacing="0" style:width={`calc(100% + ${excessWidth}px)`}>
    <thead bind:this={headerRef}>
      <tr>
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
        {#each data as row, i (row.id)}
          <tr bind:this={rowRef[i]}>
            {#each _columns as { id, as } (id)}
              {#if as === 'th'}
                <th>
                  <slot name="cell" {row} col={id} {wrapperRef} />
                </th>
              {:else}
                <td>
                  <slot name="cell" {row} col={id} {wrapperRef} />
                </td>
              {/if}
            {/each}
          </tr>
        {/each}
      {:else}
        {#each dummyRows as dummyRow, i (dummyRow)}
          <tr bind:this={rowRef[i]}>
            {#each _columns as { id } (id)}
              <td>
                <div class="skeleton" />
              </td>
            {/each}
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>

<style lang="scss">
  @use '../styles/app';

  $border-color: app.colors('grey-400', 0.225);

  .table-wrapper {
    width: 100%;
    overflow-y: scroll;
    overflow-x: scroll;
    border: 1px solid $border-color;
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
    background-color: #fff;

    tr {
      background-color: app.colors('grey-400', 0.125);
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
      border: 1px solid $border-color;

      border-top-width: 0;
      border-right-width: 0;
      border-bottom-width: 1px;

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
        background-color: app.colors('grey-400', 0.05);
      }
    }

    td {
      @include app.text('sm');
      font-family: 'Lato', sans-serif;
      padding: 0.5rem 1rem;
      border: 1px solid $border-color;

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

  .skeleton {
    height: 1.25rem;
    @include app.text('sm');
    font-family: 'Lato', sans-serif;
    background: #eee;
    background: linear-gradient(
      110deg,
      #ececec71 8%,
      #e2e2e2a8 18%,
      #ececec8f 35%
    );
    border-radius: 0.25rem;
    background-size: 200% 100%;
    animation: 2s shine linear infinite;
  }

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }
</style>
