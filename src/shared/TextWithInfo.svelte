<script>
  import { beforeUpdate } from 'svelte';
  import { fade } from 'svelte/transition';

  export let as = 'div';
  export let info;
  export let boundary;

  let hovered = false;
  let checked = false;

  function handleMouseOver() {
    hovered = true;
  }

  function handleMouseOut() {
    hovered = false;
  }

  let ref;
  const getRef = (node) => (ref = node);
  $: hasEllipses = ref?.offsetWidth < ref?.scrollWidth;

  function uniqueId(len = 6, prefix = 'uid_') {
    const arr = crypto.getRandomValues(
      new Uint8Array(Math.ceil(Math.min(len, 40) / 2))
    );
    const enc = Array.from(arr, (dec) => dec.toString(36)).join('');
    return `${prefix}${enc}`;
  }

  const tooltipID = uniqueId();

  const boundaryRect = boundary?.getBoundingClientRect();
  const {
    left: boundaryLeft,
    right: boundaryRight,
    bottom: boundaryBottom,
  } = boundaryRect ?? {};

  let tooltipRef;
  $: tipRect = tooltipRef?.getBoundingClientRect();
  $: tipRight = tipRect?.right;
  $: tipLeft = tipRect?.left;
  $: tipBottom = tipRect?.bottom;
  $: tipHeight = tipRect?.height;

  $: boundarySrollYWidth = boundary?.offsetWidth - boundary?.clientWidth;

  beforeUpdate(() => {
    if (hovered || checked) {
      if (tipBottom > boundaryBottom) {
        tooltipRef.style.top = `-${tipHeight + 10}px`;
      }

      if (tipRight > boundaryRight) {
        tooltipRef.style.left = `${
          boundaryRight - tipRight - boundarySrollYWidth - 10
        }px`;
      }

      if (tipLeft < boundaryLeft) {
        tooltipRef.style.left = `${Math.abs(tipLeft) + boundaryLeft + 10}px`;
      }
    }
  });
</script>

<div class="wrapper">
  <svelte:element this={as} class="text" use:getRef>
    <slot />
  </svelte:element>
  {#if hasEllipses}
    <label
      class="icon-wrapper"
      class:checked
      class:hovered
      aria-label="Show full text"
      aria-describedby={tooltipID}
    >
      <svg
        class="icon"
        on:mouseover={handleMouseOver}
        on:mouseout={handleMouseOut}
        on:focus
        on:blur
        xmlns="http://www.w3.org/2000/svg"
        height="20"
        width="20"
        ><path
          d="M9.125 14.167H10.875V9.167H9.125ZM10 7.479Q10.354 7.479 10.615 7.219Q10.875 6.958 10.875 6.604Q10.875 6.25 10.615 5.99Q10.354 5.729 10 5.729Q9.646 5.729 9.385 5.99Q9.125 6.25 9.125 6.604Q9.125 6.958 9.385 7.219Q9.646 7.479 10 7.479ZM10 18.333Q8.271 18.333 6.75 17.677Q5.229 17.021 4.104 15.896Q2.979 14.771 2.323 13.25Q1.667 11.729 1.667 10Q1.667 8.271 2.323 6.75Q2.979 5.229 4.104 4.104Q5.229 2.979 6.75 2.323Q8.271 1.667 10 1.667Q11.729 1.667 13.25 2.323Q14.771 2.979 15.896 4.104Q17.021 5.229 17.677 6.75Q18.333 8.271 18.333 10Q18.333 11.729 17.677 13.25Q17.021 14.771 15.896 15.896Q14.771 17.021 13.25 17.677Q11.729 18.333 10 18.333ZM10 10Q10 10 10 10Q10 10 10 10Q10 10 10 10Q10 10 10 10Q10 10 10 10Q10 10 10 10Q10 10 10 10Q10 10 10 10ZM10 16.583Q12.729 16.583 14.656 14.656Q16.583 12.729 16.583 10Q16.583 7.271 14.656 5.344Q12.729 3.417 10 3.417Q7.271 3.417 5.344 5.344Q3.417 7.271 3.417 10Q3.417 12.729 5.344 14.656Q7.271 16.583 10 16.583Z"
        /></svg
      >
      <input class="check" type="checkbox" bind:checked />
    </label>
    {#if checked || hovered}
      <div
        id={tooltipID}
        role="tooltip"
        class="tip"
        bind:this={tooltipRef}
        transition:fade={{ delay: 100, duration: 150 }}
      >
        {info}
      </div>
    {/if}
  {/if}
</div>

<style lang="scss">
  @use '../styles/app';

  @include app.root {
    .wrapper {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      width: 100%;
    }

    .text {
      margin: 0;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .icon-wrapper {
      display: inline-flex;
      align-items: center;
      position: relative;
      cursor: help;
    }

    .icon {
      fill: #728896;

      &:focus,
      &:active {
        outline: 1px app.colors('blue-300');
      }
    }

    .checked .icon,
    .hovered .icon {
      /* 		fill: #14b37d; */
      fill: #196fd9;
    }

    .check {
      position: fixed;
      left: -9999px;
      top: 0;
    }

    .tip {
      position: absolute;
      top: calc(100% + 10px);
      left: 0;
      z-index: 9999;
      border: 0 none;
      border-radius: 0.25rem;
      padding: 0.75rem;
      font-size: 0.75rem;
      line-height: 1rem;
      /* 		white-space: normal; */
      /* 		word-break: break-word; */
      width: 120%;
      max-width: max-content;
      background-color: #fff;
      box-shadow: rgba(0, 0, 0, 0.3) 0 2px 10px;
    }
  }
</style>
