<script>
  import { fade } from 'svelte/transition';

  export let title;
  export let boundaryRef = null;
  export let disabled = false;
  export let sticky = false;
  export let exclude = [];

  let hovered = false;
  let show = false;

  let wrapperRef;

  function setPos(tipRef) {
    const _boundaryRef = boundaryRef ?? document.body;
    const boundaryRect = _boundaryRef.getBoundingClientRect();
    const wrapperRect = wrapperRef.getBoundingClientRect();
    const tipRect = tipRef.getBoundingClientRect();
    const boundarySrollYSize =
      _boundaryRef.offsetWidth - _boundaryRef.clientWidth;
    const gap = 10;

    tipRef.classList.remove('bottom');

    if (tipRect.top < boundaryRect.top) {
      tipRef.style.top = `${tipRect.height + wrapperRect.height + 20}px`;
      tipRef.classList.add('bottom');
    }

    if (tipRect.right > boundaryRect.right - boundarySrollYSize) {
      const pad = tipRect.right - boundaryRect.right + gap + boundarySrollYSize;
      tipRef.style.left = `calc(50% - ${pad}px)`;
    }

    if (tipRect.left < boundaryRect.left) {
      const pad = boundaryRect.left - tipRect.left + gap;
      tipRef.style.left = `calc(50% + ${pad}px)`;
    }
  }

  function handleHover({ target }) {
    hovered = !exclude?.includes(target);
  }

  function handleLeave() {
    hovered = false;
  }
</script>

<div
  bind:this={wrapperRef}
  class="wrapper"
  on:mouseover={handleHover}
  on:mouseleave={handleLeave}
  on:focus
  on:blur
>
  <slot />
  {#if !disabled && (show || hovered)}
    <div use:setPos class="tip" in:fade={{ delay: 150, duration: 200 }}>
      {title}
    </div>
  {/if}
</div>

<style lang="scss">
  @use '../styles/app';

  .wrapper {
    position: relative;
  }

  .tip {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, calc(-100% - 10px));

    @include app.text('xs');
    padding: 0.75rem;
    border: 0 none;
    z-index: 99;
    border-radius: 0.25rem;
    background-color: app.colors('grey-400');
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.3) 0 2px 10px;
    max-width: max-content;
    width: 120%;

    &::after {
      content: '';
      display: block;
      position: absolute;
      border: 10px solid app.colors('grey-400');
      border-color: app.colors('grey-400') transparent transparent transparent;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }

    &:global(.bottom) {
      &::after {
        border-color: transparent transparent app.colors('grey-400') transparent;
        top: -20px;
      }
    }
  }
</style>
