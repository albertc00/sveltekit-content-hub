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
            }px; background: ${draggingItem.label}; width: calc(${
              dragContainer.offsetWidth
            }px - 1.25rem);`}
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
            draggable={true}
            on:dragstart={(e) => handleDragStart(show, getIndex(show.id), e)}
            on:drag={handleDrag}
            on:dragover={(e) => handleDragOver(getIndex(show.id))}
            on:dragend={handleDragEnd}
          >
            <div class="label">
              <!-- 							<svg class="x" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M3.333 9V7.25H16.667V9ZM3.333 12.5V10.75H16.667V12.5Z"/></svg> -->
              <svg
                class="x"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20"
                ><path
                  d="M7.542 16.667Q6.833 16.667 6.333 16.167Q5.833 15.667 5.833 14.958Q5.833 14.25 6.333 13.75Q6.833 13.25 7.542 13.25Q8.25 13.25 8.75 13.75Q9.25 14.25 9.25 14.958Q9.25 15.667 8.75 16.167Q8.25 16.667 7.542 16.667ZM7.542 11.708Q6.833 11.708 6.333 11.208Q5.833 10.708 5.833 10Q5.833 9.292 6.333 8.792Q6.833 8.292 7.542 8.292Q8.25 8.292 8.75 8.792Q9.25 9.292 9.25 10Q9.25 10.708 8.75 11.208Q8.25 11.708 7.542 11.708ZM7.542 6.75Q6.833 6.75 6.333 6.25Q5.833 5.75 5.833 5.042Q5.833 4.333 6.333 3.833Q6.833 3.333 7.542 3.333Q8.25 3.333 8.75 3.833Q9.25 4.333 9.25 5.042Q9.25 5.75 8.75 6.25Q8.25 6.75 7.542 6.75ZM12.458 6.75Q11.75 6.75 11.25 6.25Q10.75 5.75 10.75 5.042Q10.75 4.333 11.25 3.833Q11.75 3.333 12.458 3.333Q13.167 3.333 13.667 3.833Q14.167 4.333 14.167 5.042Q14.167 5.75 13.667 6.25Q13.167 6.75 12.458 6.75ZM12.458 11.708Q11.75 11.708 11.25 11.208Q10.75 10.708 10.75 10Q10.75 9.292 11.25 8.792Q11.75 8.292 12.458 8.292Q13.167 8.292 13.667 8.792Q14.167 9.292 14.167 10Q14.167 10.708 13.667 11.208Q13.167 11.708 12.458 11.708ZM12.458 16.667Q11.75 16.667 11.25 16.167Q10.75 15.667 10.75 14.958Q10.75 14.25 11.25 13.75Q11.75 13.25 12.458 13.25Q13.167 13.25 13.667 13.75Q14.167 14.25 14.167 14.958Q14.167 15.667 13.667 16.167Q13.167 16.667 12.458 16.667Z"
                /></svg
              >
              <span>{show.label}</span>
            </div>
            <button
              class="hide-button"
              on:click|preventDefault={() => toggleShowHide(show, false)}
            >
              <svg
                class="x"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20"
                ><path
                  d="M5.375 15.854 4.146 14.625 8.771 10 4.146 5.375 5.375 4.146 10 8.771 14.625 4.146 15.854 5.375 11.229 10 15.854 14.625 14.625 15.854 10 11.229Z"
                /></svg
              >
            </button>
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

<style>
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
  }

  .label {
    display: flex;
    gap: 0.25rem;
    align-items: center;
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
    height: 20px;
    width: 20px;
  }

  .x {
    fill: #5f7380;
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
