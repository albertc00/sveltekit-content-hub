<script>
  import { quintOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const [send, receive] = crossfade({
    duration: (d) => Math.sqrt(d * 200),

    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === 'none' ? '' : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
      };
    },
  });

  export let cols = [
    { label: 'Item #1', id: 'item_1', show: true },
    { label: 'Item #2', id: 'item_2', show: true },
    { label: 'Item #3', id: 'item_3', show: false },
    { label: 'Item #4', id: 'item_4', show: true },
  ];

  let tempCols = cols.map((col) => ({ ...col }));

  export let onApply;
  export let onClose;

  function handleSubmit() {
    dispatch('apply', tempCols);
    onApply(tempCols);
  }

  function handleCancel() {
    dispatch('cancel');
    onClose();
  }

  function remove(id) {
    tempCols = tempCols.filter((col) => col.id !== id);
  }

  function toggleShowHide(col, show) {
    col.show = show;
    remove(col.id);
    tempCols = [...tempCols, col];
  }

  $: hidden = tempCols.filter(({ show }) => !show);
  $: shown = tempCols.filter(({ show }) => show);

  let mouseYCoordinate = null;
  let distanceTopGrabbedVsPointer = null;

  let draggingItem = null;
  let draggingItemId = null;
  let draggingItemIndex = null;

  let hoveredItemIndex = null;

  let dragContainer = null;

  $: {
    if (mouseYCoordinate === null || mouseYCoordinate === 0) {
      //
    }
  }

  $: {
    if (
      draggingItemIndex !== null &&
      hoveredItemIndex !== null &&
      draggingItemIndex !== hoveredItemIndex
    ) {
      // swap items
      // 			[shown[draggingItemIndex], shown[hoveredItemIndex]] = [
      // 				shown[hoveredItemIndex],
      // 				shown[draggingItemIndex],
      // 			];

      // swap
      [tempCols[draggingItemIndex], tempCols[hoveredItemIndex]] = [
        tempCols[hoveredItemIndex],
        tempCols[draggingItemIndex],
      ];

      // balance
      draggingItemIndex = hoveredItemIndex;
    }
  }

  function handleDragStart(item, index, e) {
    mouseYCoordinate = e.clientY;

    draggingItem = item;
    draggingItemIndex = index;
    draggingItemId = item.id;

    distanceTopGrabbedVsPointer =
      e.target.getBoundingClientRect().y - e.clientY;
  }

  function handleDrag(e) {
    mouseYCoordinate = e.clientY;
  }

  function handleDragOver(index) {
    hoveredItemIndex = index;
  }

  function handleDragEnd(e) {
    draggingItemId = null; // makes item visible
    hoveredItemIndex = null; // prevents instant swap
  }

  function getIndex(itemID) {
    return tempCols.findIndex(({ id }) => id === itemID);
  }
</script>

<form class="show-hide-cols" on:submit|preventDefault={handleSubmit}>
  <div class="cols hide-cols">
    <h6>Available</h6>
    <div class="scroll-container">
      <ul>
        {#each hidden as hide (hide.id)}
          <li
            in:receive|local={{ key: hide.id }}
            out:send|local={{ key: hide.id }}
          >
            <label class="hidden">
              <input
                class="checkbox"
                type="checkbox"
                value={hide.id}
                on:change={() => toggleShowHide(hide, true)}
              />
              <span>{hide.label}</span>
            </label>
          </li>
        {/each}
      </ul>
    </div>
  </div>
  <div class="cols show-cols">
    <h6>{`Selected Columns (${shown.length + 1})`}</h6>
    <div class="scroll-container">
      <ul bind:this={dragContainer}>
        {#if mouseYCoordinate}
          <li
            class="shown ghost"
            style={`top: ${
              mouseYCoordinate + distanceTopGrabbedVsPointer
            }px; background: ${draggingItem.label}; width: ${
              dragContainer.offsetWidth
            }px;`}
          >
            <div class="label">
              <span class="material-symbols-outlined"> &#xe945 </span>
              <span>{draggingItem.label}</span>
            </div>
            <span class="material-symbols-outlined"> &#xe5cd </span>
          </li>
        {/if}
        {#each shown as show, i (show.id)}
          <li
            class="shown"
            class:invisible={draggingItemId === show.id}
            style={`background: ${show.label};`}
            in:receive|local={{ key: show.id }}
            out:send|local={{ key: show.id }}
            draggable={shown.length === 1 ? false : true}
            on:dragstart={(e) => handleDragStart(show, getIndex(show.id), e)}
            on:drag={handleDrag}
            on:dragover={(e) => handleDragOver(getIndex(show.id))}
            on:dragend={handleDragEnd}
            class:disabled={shown.length === 1}
          >
            <div class="label">
              <!-- 							<svg class="x" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M3.333 9V7.25H16.667V9ZM3.333 12.5V10.75H16.667V12.5Z"/></svg> -->
              <span
                class="drag material-symbols-outlined"
                class:disabled={shown.length === 1}
              >
                &#xe945;
              </span>
              <span>{show.label}</span>
            </div>

            {#if shown.length > 1}
              <button
                class="hide-button"
                on:click|preventDefault={() => toggleShowHide(show, false)}
              >
                <span class="material-symbols-outlined"> &#xe5cd; </span>
              </button>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  </div>
  <div class="button-row">
    <button class="primary" type="submit">Apply</button>
    <button on:click|preventDefault={handleCancel}>Cancel</button>
  </div>
</form>

<style lang="scss">
  @use '../styles/app';

  .show-hide-cols {
    display: grid;
    grid-template-columns: 300px 300px;
    gap: 1rem;
  }

  h6 {
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    font-size: 0.75rem;
    line-height: 1rem;
    color: #231f20;
    margin: 0 0 0.5rem 0.5rem;
  }

  .scroll-container {
    min-height: calc((42px * 5) + (0.75rem * 6));
    max-height: calc((42px * 5) + (0.75rem * 6));
    overflow-y: scroll;
    padding: 0.5rem;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    row-gap: 0.75rem;
  }

  li {
    @include app.text('base');
    font-family: 'Lato', sans-serif;
    border: 1px solid #b1b1b1;
    border-radius: 0.25rem;
    padding: 0.5rem 0.75rem;
    background-color: #fff;
    color: #5f7380;
  }

  /* .show-cols .scroll-container {
    position: relative;
  } */

  .show-cols li {
    cursor: grab;

    &.disabled {
      pointer-events: none;
    }
  }

  .label {
    display: flex;
    gap: 0.25rem;
    align-items: center;
  }

  .drag {
    &.disabled {
      color: app.colors('grey-400', 0.25);
    }
  }

  .hidden {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    height: 20px;
    margin: 0;
  }

  .checkbox {
    margin: 0;
  }

  .shown {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding-left: 0.375rem;
  }

  .hide-button {
    border: 0 none;
    background: transparent;
    margin: 0;
    padding: 0;
    cursor: pointer;
    height: 24px;
    width: 24px;
    color: #5f7380;
  }

  .ghost {
    margin-bottom: 10px;
    pointer-events: none;
    z-index: 99;
    position: absolute;
    top: 0;
    left: 10;
  }

  .invisible {
    opacity: 0;
  }

  .button-row {
    display: flex;
    gap: 0.75rem;
    padding: 1rem 0 0 0.5rem;
  }

  .button-row button {
    border: 1px solid #063060;
    border-radius: 0.25rem;
    padding: 0.5rem 1.25rem;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 600;
    background-color: #fff;
    color: #063060;
    cursor: pointer;
  }

  .button-row .primary {
    background-color: #063060;
    color: #fff;
  }
</style>
