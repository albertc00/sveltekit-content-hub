<header>
  <div class="bg">
    <h1>
      <a href="/"
        ><img
          src="/logo.svg"
          alt="Site logo"
          width="89"
          height="50"
          loading="lazy"
        /></a
      >
    </h1>
  </div>
</header>

<style lang="scss">
  @use '../styles/app';

  .bg {
    background-color: app.colors('blue-400');
    padding: 0.375rem 0 0.375rem calc(100vw / 48);
  }

  h1 {
    margin: 0;
  }

  a {
    display: block;
    width: fit-content;
  }

  img {
    display: block;
  }
</style>
