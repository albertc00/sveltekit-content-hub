<script>
  let page = 1;
</script>

<div class="nav-wrapper-outer">
  <nav class="nav-wrapper">
    <div class="card">
      <div class="case-study">
        <a href={`/case-studies`}>Case Study</a>
      </div>
    </div>

    <div class="card">
      <a href="/">Coming soon...</a>
    </div>
  </nav>
</div>

<style lang="scss">
  @use '../styles/app';
  .nav-wrapper-outer {
    text-align: center;
  }
  .nav-wrapper {
    display: grid;
    grid-template-columns: max-content max-content;
  }
  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    width: 15rem;
    height: 18rem;
    padding: 1rem;
    margin: 1rem;
    background-color: app.colors('grey-150');
    border-radius: 10px;
    position: relative;

    &:hover {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
  }
  .card a {
    position: absolute;
    left: 0;
    top: 100px;
    width: 100%;
    height: 100%;
    text-decoration: none;
  }
</style>
