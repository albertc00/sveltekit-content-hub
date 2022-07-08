<script>
  import TableCell from '$shared/TableCell.svelte';
  // @ts-ignore
  import { goto } from '$app/navigation';
  // @ts-ignore
  import { navigating } from '$app/stores';
  import Table from '$lib/Table.svelte';
  import Pagination from '$shared/Pagination.svelte';
  import { category, caseStudyCols as columns } from '$stores/store';
  import httpBuildQuery from '$functions/httpBuildQuery';
  import Search from '$lib/SearchForm.svelte';

  import useModal from '$functions/useModal';
  import ShowHideCols from '$shared/ShowHideCols.svelte';
  import Filter from '$lib/Filter.svelte';
  import DropdownActions from './DropdownActions.svelte';

  import Webpage from '$lib/Webpage.svelte';
  import Title from '$lib/Title.svelte';
  import Hyperlink from '$shared/Hyperlink.svelte';
  import ResultsCell from '$lib/ResultsCell.svelte';
  import Image from '$shared/Image.svelte';

  export let data;

  $: caseStudies = data.data;
  $: totalRecords = data.foundPosts;
  $: s = data.s ?? '';
  $: currentPage = data.page;
  $: perPage = data.perPage;
  $: filters = data.filters ?? [];

  function handleSearch({ detail }) {
    const route = buildRoute({
      page: 1,
      perPage,
      s: detail,
      filters,
    });
    goto(route);
  }

  const baseUrl = '/case-studies/page/';
  const ddaText = 'Table actions';
  const ddaActions = [
    { text: 'Edit columns', id: 'EDIT_COLUMNS' },
    { text: 'Coming soon...', id: 'COMING_SOON_1' },
    { text: 'Coming soon...', id: 'COMING_SOON_2' },
  ];
  const selec = [
    { id: 1, label: 'Case Studies' },
    { id: 2, label: 'Coming Soon...' },
    { id: 3, label: 'Coming Soon...' },
  ];

  function handlePerPage({ detail: perPage }) {
    const route = buildRoute({ page: 1, perPage, s, filters });
    goto(route);
  }

  //FILTERS👾👾👾
  const exclude = ['pdf', 'results', 'webpage'];
  $: [showfilters, hidefilters] = useModal({ title: 'All filters' }, Filter, {
    properties: $columns
      .filter(({ id }) => !exclude.includes(id))
      .map(({ id, title }) => ({ id, text: title })),
    filters,
    onClose: handleFilterClose,
    onApply: handleFilterApply,
  });

  function handleFilterApply(filters) {
    hidefilters();
    const route = buildRoute({ page: 1, perPage, s, filters });
    goto(route);
  }

  function handleFilterClose() {
    hidefilters();
  }

  function handleClearAll() {
    filters = [];
    const route = buildRoute({ page: 1, perPage, s, filters });
    goto(route);
  }

  //EDIT COLUMNS👽👽👽
  $: [show, hide] = useModal(
    { title: 'Choose which columns you see' },
    ShowHideCols,
    {
      cols: $columns,
      onApply: handleApply,
      onClose: handleClose,
    }
  );

  function handleApply(detail) {
    $columns = detail;
    hide();
  }

  function handleClose() {
    hide();
  }

  function handleDropdownAction({ text, id }) {
    switch (id) {
      case 'EDIT_COLUMNS':
        show();

        break;
      default:
        break;
    }
  }

  function buildRoute({ page = 1, perPage = 10, s = '', filters = [] }) {
    const baseUrl = '/case-studies/page/';
    let route = `${baseUrl}${page}`;
    let queryParams = { per_page: perPage };

    if (s !== '') {
      queryParams.s = s;
    }

    if (filters.length) {
      queryParams.filters = filters;
    }

    return `${route}?${httpBuildQuery(queryParams)}`;
  }
</script>

<div class="container">
  <!-- <Controls /> -->
  <select class="content-type" bind:value={$category}>
    {#each selec as { id, label } (id)}
      <option
        class="content-type-option"
        value={id}
        disabled={label == 'Coming Soon...'}
      >
        {label}
      </option>
    {/each}
  </select>

  <div class="actionContainer">
    <div class="search">
      <div class="search-wrapper">
        <Search
          searchQuery={s}
          placeholder="Type keywords to find case studies"
          on:search={handleSearch}
        />
      </div>

      <button class="filter" on:click={() => showfilters()}>
        <span class="material-symbols-outlined"> &#xe429 </span>
        <span>Filters ({filters.length})</span>
      </button>
      {#if filters.length}
        <button class="clear" on:click={handleClearAll}> Clear all </button>
      {/if}
    </div>

    <DropdownActions
      text={ddaText}
      actions={ddaActions}
      onAction={handleDropdownAction}
    />
  </div>

  {#if $navigating}
    <Table data={null} columns={$columns} initialRowCount={perPage} />
  {:else}
    <Table columns={$columns} data={caseStudies}>
      <svelte:fragment slot="cell" let:row let:col let:wrapperRef>
        {#if col === 'title'}
          <Title data={row} {wrapperRef} />
        {:else if col === 'clientIndustry'}
          <TableCell text={row.clientIndustry} {wrapperRef} />
        {:else if col === 'targetLocation'}
          <TableCell text={row.targetLocation} {wrapperRef} />
        {:else if col === 'pdf'}
          <Hyperlink text="View PDF" link={row.pdf} copyButton {wrapperRef}>
            <span slot="before" class="pdf material-symbols-outlined"
              >&#xe415;</span
            ></Hyperlink
          >
        {:else if col === 'webpage'}
          <Webpage gated={row.link} unlocked={row.unlocked} />
        {:else if col === 'client'}
          <Hyperlink text={row.clientName} link={row.clientWebsite} {wrapperRef}
            ><svelte:fragment slot="before">
              <Image let:fallback>
                <img
                  src={`https://s2.googleusercontent.com/s2/favicons?domain=${row.clientWebsite}`}
                  alt="Company logo"
                  width="16"
                  height="16"
                  loading="lazy"
                  use:fallback
                />
              </Image>
            </svelte:fragment></Hyperlink
          >
        {:else if col === 'targetDM'}
          <TableCell text={row.targetDM} {wrapperRef} />
        {:else if col === 'targetIndustry'}
          <TableCell text={row.targetIndustry} {wrapperRef} />
        {:else if col === 'clientLocation'}
          <TableCell text={row.clientLocation} {wrapperRef} />
        {:else if col === 'hq'}
          <TableCell text={row.clientHQ} {wrapperRef} />
        {:else if col === 'campaign'}
          <TableCell text={row.campaign} {wrapperRef} />
        {:else if col === 'results'}
          <ResultsCell results={row.results} title={row.title} {wrapperRef} />
        {:else if col === 'lob'}
          <TableCell text={row.clientLOB} {wrapperRef} />
        {/if}
      </svelte:fragment>
    </Table>
  {/if}

  <Pagination
    {totalRecords}
    {perPage}
    {currentPage}
    let:page
    on:perPage={handlePerPage}
  >
    <a
      class="nav"
      sveltekit:prefetch
      slot="left"
      href={buildRoute({ page, perPage, s, filters })}
      ><span class="material-symbols-outlined"> &#xe408 </span></a
    >
    <a
      class="nav"
      sveltekit:prefetch
      slot="right"
      href={buildRoute({ page, perPage, s, filters })}
      ><span class="material-symbols-outlined"> &#xe409 </span></a
    >
    <a
      sveltekit:prefetch
      class:selected={page === currentPage}
      slot="page"
      href={buildRoute({ page, perPage, s, filters })}>{page}</a
    >
  </Pagination>
</div>

<style lang="scss">
  @use '../styles/app';

  .container {
    width: 98vw;
    margin: 0 auto;
  }

  a {
    $padding: 0.25rem;
    $color: app.colors('grey-400');

    display: inline-block;
    @include app.text('sm');
    font-family: 'Lato', sans-serif;
    text-align: center;
    text-decoration: none;
    color: app.colors('grey-900');
    padding: $padding;
    width: calc(1.25rem + (2 * #{$padding}) + 2px);
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 0.25rem;

    &.selected {
      font-weight: 700;
      background-color: rgba($color, 0.15);
      border: 1px solid rgba($color, 0.375);
      cursor: default;
    }

    &:not(.selected):hover {
      background-color: rgba($color, 0.15);
      border-color: rgba($color, 0.15);
      background-clip: padding-box;
    }

    &.nav {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20;

      .material-symbols-outlined {
        @include app.text('xl', 1);
      }
    }
  }

  .filter {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20;
    .material-symbols-outlined {
      @include app.text('xl', 1);
    }
  }

  .actionContainer {
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 98vw;
    margin: 0 auto;
  }

  .search {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .search-wrapper {
    min-width: 280px;
  }

  .filter {
    display: flex;
    gap: 0.25rem;
    align-items: center;
    border: 0 none;
    padding: 0;
    background: transparent;
    @include app.text('sm');
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    color: app.colors('blue-350');
    cursor: pointer;
  }

  .content-type {
    @include app.text('2xl');
    font-family: 'Work Sans', sans-serif;
    font-weight: 500;
    margin: 1.5rem 0 1.5rem 1vw;
    padding: 0.375rem 0rem;
    border: 0 none;

    // border-bottom: 2px solid app.colors('blue-400');
    color: app.colors('blue-400');
    background-color: transparent;
    cursor: pointer;
    max-width: 180px;

    &:active,
    &:focus {
      outline: 0 none;
    }

    option {
      @include app.text('base');
      color: app.colors('grey-400');
    }
  }

  .clear {
    display: flex;
    gap: 0.25rem;
    align-items: center;
    border: 0 none;
    padding: 0;
    background: transparent;
    @include app.text('sm');
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    color: app.colors('blue-350');
    cursor: pointer;
  }

  .pdf.material-symbols-outlined {
    font-size: 1rem;
    line-height: 1;
    color: app.colors('red-400');
  }
</style>
