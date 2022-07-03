<script>
  export let post;
  export let selector = 'text';
  export let center = false;
  const text = selector.split('.').reduce((prev, curr) => prev[curr], post);
</script>

<div class="text" class:center>
  {@html text}
</div>

<style lang="scss">
  @use '../styles/app';

  @include app.root {
    .text {
      display: inline-block;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &.center {
        text-align: center;
      }
    }
  }
</style>
