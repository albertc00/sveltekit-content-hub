<script>
  import Button from '$shared/Button.svelte';
  import MultiTermInput from '$shared/MultiTermInput.svelte';
  import Tooltip from '$shared/Tooltip.svelte';
  import hasEllipses from '$functions/hasEllipses.js';

  export let properties;
  export let filters = [];
  export let onClose;
  export let onApply;

  let step = filters.length ? 2 : 0;
  let history = [];

  let selectedPropID;
  $: selectedPropText = properties.find(
    ({ id }) => selectedPropID === id
  )?.text;
  let selectedCompare = null;
  let value = [];

  const compares = [
    { text: 'contains exactly', compare: 'LIKE' },
    { text: "doesn't contain exactly", compare: 'NOT LIKE' },
  ];

  function handleSet() {
    step = 1;
    history.push(0);
  }

  function handleBack() {
    const goBackTo = history.pop();

    if (goBackTo === 0) {
      selectedPropID = '';
      selectedCompare = null;
      value = [];
    }

    step = goBackTo;
  }

  function handleAdd(filter) {
    const { key: k } = filter;
    const index = filters.findIndex(({ key }) => key === k);

    if (index >= 0) {
      filters[index] = filter;
    } else {
      filters = [...filters, filter];
    }

    history = [];
    step = 2;
  }

  function handleEdit(k) {
    const { compare, value: v } = filters.find(({ key }) => key === k);

    selectedPropID = k;
    selectedCompare = compare;
    value = v;

    step = 1;
    history.push(2);
  }

  function handleDelete(k) {
    filters = filters.filter(({ key }) => key !== k);
    selectedPropID = '';
    selectedCompare = null;
    value = [];
  }

  function handleAnd() {
    selectedPropID = '';
    selectedCompare = null;
    value = [];
    step = 0;
    history.push(2);
  }

  function handleCancel() {
    onClose();
  }

  function handleSubmit() {
    onApply(filters);
  }

  function joinOr(arr) {
    const words = [...arr];

    if (words.length < 3) {
      return words.join(' or ');
    } else {
      const last = words.pop();
      return `${words.join(', ')} or ${last}`;
    }
  }

  $: _properties = properties.filter(
    ({ id }) => !filters.some(({ key }) => key === id)
  );

  $: _filters = filters?.map(({ key, compare, value }) => ({
    key,
    text: properties.find(({ id }) => id === key)?.text,
    compare,
    compareText: compares.find(({ compare: comp }) => comp === compare)?.text,
    value,
  }));

  let filterRefs = [];
  $: disabled = filterRefs.map(
    (filterRef) => filterRef && !hasEllipses(filterRef)
  );
</script>

<form class="filter-wrapper" on:submit|preventDefault={handleSubmit}>
  <div class="inner-wrapper">
    {#if step === 0}
      {#if filters.length || history.length}
        <button type="button" class="back" on:click|preventDefault={handleBack}>
          <span class="material-symbols-outlined"> arrow_back </span>
          <span>Back</span>
        </button>
      {/if}
      <h6>Properties</h6>
      <div class="scroll-container">
        <ul>
          {#each _properties as { id, text } (id)}
            <li>
              <label class="field">
                <input
                  class="radio offscreen"
                  type="radio"
                  name="property"
                  bind:group={selectedPropID}
                  value={id}
                  on:change={handleSet}
                />
                <span>{text}</span>
              </label>
            </li>
          {/each}
        </ul>
      </div>
    {:else if step === 1}
      <button type="button" class="back" on:click|preventDefault={handleBack}>
        <span class="material-symbols-outlined"> arrow_back </span>
        <span>Back</span>
      </button>
      <h6>{selectedPropText}</h6>
      <div class="compares">
        {#each compares as { text, compare } (compare)}
          <div class="compare">
            <label class="compare-label">
              <input
                class="radio"
                type="radio"
                name="compare"
                bind:group={selectedCompare}
                value={compare}
              />
              <span class="compare-text">{text}</span>
            </label>
            {#if selectedCompare === compare}
              <div>
                <MultiTermInput bind:keywords={value} />
              </div>
            {/if}
          </div>
        {/each}
      </div>
      <Button
        disabled={!value.length}
        color="blue-400"
        on:click={() =>
          handleAdd({ key: selectedPropID, compare: selectedCompare, value })}
        preventDefault>Apply filter</Button
      >
    {:else if step === 2}
      <div class="filters">
        {#each _filters as { key, text, compareText, value }, i (key)}
          <div class="filter" on:click|preventDefault={() => handleEdit(key)}>
            <Tooltip
              title={`${text} ${compareText} "${joinOr(value)}"`}
              disabled={disabled[i]}
            >
              <p bind:this={filterRefs[i]} class="filter-desc">
                <span class="filter-prop">{text}</span>
                {compareText}
                <strong class="filter-keyword">{joinOr(value)}</strong>
              </p>
            </Tooltip>
            <button
              type="button"
              class="delete-filter material-symbols-outlined"
              on:click|preventDefault={() => handleDelete(key)}
            >
              &#xe872;
            </button>
          </div>
        {/each}
      </div>
      <button
        type="button"
        class="and"
        class:add={!filters.length}
        on:click|preventDefault={handleAnd}
        >{filters.length ? 'and' : 'add'}</button
      >
      <div class="button-row">
        <Button type="submit" color="blue-400">Apply filter</Button>
        <Button
          filled={false}
          color="blue-400"
          preventDefault
          on:click={handleCancel}>Cancel</Button
        >
      </div>
    {/if}
  </div>
</form>

<style lang="scss">
  @use '../styles/app';

  $max-width: 360px;
  $padding: 0.5;

  .filter-wrapper {
    max-width: $max-width;

    .material-symbols-outlined {
      @include app.text('xl', 1);
    }
  }

  .inner-wrapper {
    padding: $padding * 1rem;
  }

  .back {
    display: flex;
    gap: 0.25rem;
    align-items: center;
    border: 0 none;
    padding: 0;
    margin-bottom: 0.5rem;
    background: transparent;
    @include app.text('sm');
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    color: app.colors('blue-350');
    cursor: pointer;
  }

  h6 {
    @include app.text('base');
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    color: app.colors('grey-900');
    margin: 0 0 0.5rem 0;
  }

  .scroll-container {
    margin: 0 auto;
    min-height: calc((42px * 5) + (0.75rem * 6));
    max-height: calc((42px * 5) + (0.75rem * 6));
    overflow-y: scroll;
    padding: 0.5rem 0.5rem 0.5rem 0;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    row-gap: 0.75rem;
  }

  li {
    border: 1px solid #b1b1b1;
    border-radius: 0.25rem;
    background-color: #fff;
    color: app.colors('grey-400');
  }

  .field {
    display: block;
    padding: 0.5rem 0.75rem;
    @include app.text('sm');
    font-family: 'Lato', sans-serif;
    color: app.colors('grey-400');
    cursor: pointer;
  }

  .radio {
    margin: 0;
  }

  .offscreen {
    position: fixed;
    top: 0;
    left: -9999px;
  }

  .compares {
    margin-bottom: 1.5rem;
  }

  .compare {
    display: grid;
    row-gap: 0.25rem;
    padding: 0.125rem;
  }

  .compare-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    @include app.text('base');
    font-family: 'Lato', sans-serif;
    color: app.colors('grey-400');
  }

  .filters {
    display: grid;
    row-gap: 1rem;
  }

  .filter-desc {
    margin: 0;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .delete-filter {
    display: none;
    position: absolute;
    top: 50%;
    right: 0.75rem;
    transform: translateY(-50%);
    width: 28px;
    border: 0 none;
    background-color: transparent;
    cursor: pointer;
  }

  .filter {
    position: relative;
    box-sizing: border-box;
    @include app.text('base');
    font-family: 'Lato', sans-serif;
    color: app.colors('grey-900');
    padding: 0.75rem 1rem;
    border: 1px solid #b1b1b1;
    border-radius: 0.25rem;
    background-color: #fff;
    transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
    width: calc(#{$max-width} - #{$padding * 2rem});

    &:hover {
      background-color: app.colors('grey-400', 0.1);
      cursor: pointer;

      .filter-desc {
        width: calc(100% - 28px);
      }

      .delete-filter {
        display: inline-block;
      }
    }
  }

  .filter-prop {
    font-weight: 600;
    color: app.colors('blue-400');
  }

  .filter-keyword {
    font-weight: 600;
  }

  .and {
    display: inline-block;
    @include app.text('xs');
    font-weight: 600;
    text-transform: uppercase;
    color: app.colors('grey-900', 0.8);
    background-color: app.colors('grey-150', 0.4);
    padding: 0.25rem 0.75rem;
    margin: 1rem 0 0;
    border: 1px solid app.colors('grey-300');
    border-radius: 0.25rem;
    cursor: pointer;
    // transition: all 0.3s;
    transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;

    &.add {
      margin-top: 0;
    }
  }

  .button-row {
    display: flex;
    gap: 0.75rem;
    margin-top: 2rem;

    button {
      border: 1px solid app.colors('blue-700');
      border-radius: 0.25rem;
      padding: 0.375rem 0.75rem;
      @include app.text('sm');
      font-weight: 600;
      background-color: #fff;
      color: app.colors('blue-700');
      cursor: pointer;
    }

    .primary {
      background-color: app.colors('blue-700');
      color: #fff;
    }
  }
</style>
