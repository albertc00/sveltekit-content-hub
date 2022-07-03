<script>
  export let text = 'Show actions';
  export let actions = [
    { text: 'Action #1' },
    { text: 'Action #2' },
    { text: 'Action #3' },
  ];
  export let onAction = () => {};

  let showActions = false;
  let buttonRef;
  let buttonTextRef;
  let buttonSVGRef;
  const actionsCopy = actions.map((a) => ({ ...a, self: null }));
  $: actionsRef = actionsCopy.map(({ self }) => self);
  $: withinDDA = [buttonRef, buttonTextRef, buttonSVGRef, ...actionsRef];

  function handleMouseDown({ which, target }) {
    switch (which) {
      case 1:
        if (!withinDDA.includes(target)) {
          showActions = false;
        }
        break;
      default:
        break;
    }
  }

  function handleAction({ target }) {
    const { self: _, ...a } = actionsCopy.find(({ self }) => target === self);
    showActions = false;
    onAction(a);
  }
</script>

<svelte:window on:mousedown={handleMouseDown} />

<div class="dda">
  <button
    class="show-actions"
    bind:this={buttonRef}
    on:click|preventDefault={() => (showActions = !showActions)}
  >
    <span bind:this={buttonTextRef} class="show-actions-text">{text}</span>
    <span class="material-symbols-outlined"> &#xe5c5 </span>
  </button>
  {#if showActions}
    <ul class="actions" style={`top: ${buttonRef.offsetHeight + 5}px;`}>
      {#each actionsCopy as { text, self }}
        <li>
          <button
            class="action-button"
            bind:this={self}
            on:click|preventDefault={handleAction}
          >
            {text}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="scss">
  @use '../styles/app';

  .dda {
    position: relative;
  }

  button {
    cursor: pointer;
  }

  .show-actions {
    display: grid;
    gap: 0.375rem;
    grid-template-columns: max-content max-content;
    background-color: #fff;
    align-items: center;
    margin: 0;
    padding: 0.375rem 0.5rem 0.375rem 0.875rem;
    border: 1px solid #b1b1b1;
    border-radius: 0.25rem;
    color: #5f7380;
    @include app.text('sm');
    font-family: 'Lato', sans-serif;
  }

  .actions {
    position: absolute;
    right: 0;
    border: 1px solid #b1b1b1;
    border-radius: 0.25rem;
    list-style: none;
    padding: 0.5rem 0;
    margin: 0;
    background: #fff;
    z-index: 9999;
    box-shadow: 0 1px 24px 0 rgb(0 0 0 / 8%);
  }

  li {
    padding: 0;
    cursor: pointer;
  }

  .action-button {
    width: 100%;
    min-width: 165px;
    margin: 0;
    padding: 0.375rem 0.875rem;
    text-align: left;
    @include app.text('sm');
    font-family: 'Lato', sans-serif;
    white-space: nowrap;
    color: #5f7380;
    border: 0 none;
    background-color: transparent;
  }

  .action-button:hover {
    background-color: #f2f2f2;
  }
</style>
