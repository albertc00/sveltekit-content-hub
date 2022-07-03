<script>
  import TextWithInfo from './TextWithInfo.svelte';
  import { boundary } from '$stores/store';

  export let data;
  export let selector = 'text';
  export let as = 'p';
  export let center = true;
  const text = selector.split('.').reduce((prev, curr) => prev[curr], data);
</script>

<div class:center>
  <TextWithInfo {as} info={text} boundary={$boundary}>{@html text}</TextWithInfo
  >
</div>

<style>
  .center {
    text-align: center;
  }
</style>
