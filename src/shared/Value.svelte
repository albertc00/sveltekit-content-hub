<script>
    import { isArray, isObject } from '$functions/objType.js';
  
    export let value;
  
    let hasValue = false;
    $: switch (true) {
      case isArray(value) && value.length:
        hasValue = true;
        break;
      case isObject(value) && Object.entries(value).length:
        hasValue = true;
        break;
      default:
        hasValue = value || value === 0;
        break;
    }
  </script>
  
  {#if hasValue}
    <slot />
  {:else}
    --
  {/if}
  