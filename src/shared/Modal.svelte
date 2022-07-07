<script>
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import { clickOutside } from '$actions/clickOutside';

  export let title;
  export let content;
  export let contentProps;

  const dispatch = createEventDispatcher();

  let vh;
  let modalRef;
  const marginTop = 8;
  $: modalHeight = modalRef?.offsetHeight + vh * (marginTop / 100);
  $: scroll = modalHeight > vh;
</script>

<svelte:window bind:innerHeight={vh} />

{#if content}
  <div class="backdrop" class:scroll>
    <div
      bind:this={modalRef}
      role="dialog"
      class="modal"
      use:clickOutside
      on:clickOutside={() => dispatch('close')}
      transition:fly={{ y: 50 }}
      style:margin-top={`${marginTop}vh`}
    >
      <header class="header" class:hasTitle={title !== ''}>
        <h4 class="title">{title}</h4>
        <button
          class="close material-symbols-outlined"
          on:click={() => dispatch('close')}
        >
          &#xe5cd;
        </button>
      </header>
      <div class="content">
        <svelte:component this={content} {...contentProps} />
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  @use '../styles/app';

  .backdrop {
    background-color: app.colors('grey-900', 0.9);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;

    &.scroll {
      overflow-y: scroll;
    }
  }

  .modal {
    align-self: flex-start;
    background-color: #fff;
    border-radius: 0.5rem 0.5rem 0.25rem 0.25rem;
    /* box-shadow: 0 1px 24px 0 rgb(0 0 0 / 8%); */
    box-shadow: 0 50px 100px -20px rgb(50 50 93 / 25%),
      0 30px 60px -30px rgb(0 0 0 / 30%), 0 -18px 60px -10px rgb(0 0 0 / 3%);
    min-width: 400px;
    max-width: calc(1280px / 12 * 10);
    min-height: 200px;
  }

  .header {
    position: relative;
    background-color: app.colors('blue-400');
    border-radius: 0.25rem 0.25rem 0 0;
    padding: 0.75rem 1rem;
  }

  .title {
    margin: 0;
    @include app.text('xl');
    font-family: 'Work Sans', sans-serif;
    font-weight: 500;
    letter-spacing: 0.025em;
    color: #fff;
  }

  .close {
    position: absolute;
    top: 50%;
    right: 0.375rem;
    transform: translateY(-50%);

    display: inline-block;
    background-color: transparent;
    color: #fff;
    border: 0 none;
    border-radius: 9999px;
    cursor: pointer;
    margin: 0;
    width: 2.25rem;
    height: 2.25rem;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: rgba(#fff, 0.1);
    }
  }

  .content {
    padding: 1.25rem;
  }
</style>
