<script>
  export let post;
  export let selector = 'text';
  const text = selector.split('.').reduce((prev, curr) => prev[curr], post);
</script>

<div>
  <img
    class="wp-post-img"
    src={post._embedded['wp:featuredmedia']['0'].link}
    alt={text}
    width="350px"
    height="200px"
  />
</div>

<style>
</style>
