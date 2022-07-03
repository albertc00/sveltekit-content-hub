<script>
  import { isSearching, SearchTerm, fields } from '$stores/store';
  function handleOnSubmit() {
    $isSearching = true;
    $fields = $fields;
  }
</script>

<form class="form" on:submit|preventDefault={handleOnSubmit}>
  <div class="wrapper">
    <input
      class="searchBox"
      type="search"
      name="search"
      spellcheck="true"
      placeholder="Type keywords to find case studies"
      aria-label="Search case studies"
      bind:value={$SearchTerm}
      required
    />

    <button
      class="button"
      disabled={$SearchTerm === ''}
      type="submit"
      aria-label="Start search"
      title="Click to search"
      ><span class="material-symbols-outlined"> &#xe8b6 </span>
    </button>
  </div>
</form>

<style lang="scss">
  @use '../styles/app';

  @include app.root {
    .form {
      width: 100%;
    }

    .wrapper {
      position: relative;
      border-radius: 0.375rem;
      background: #fff;
    }

    .searchBox {
      display: inline-block;
      width: 100%;
      padding: 0.5rem 2.375rem 0.5rem 0.75rem;
      margin: 0;
      font-family: 'Lato', sans-serif;
      @include app.text('sm');
      color: app.colors('grey-400');
      border: 1px solid app.colors('grey-200');
      border-radius: 0.375rem;
      // box-shadow: 0px 8px 9px -6px rgb(95 115 128 / 44%);

      &:focus {
        outline: 0 none;
      }
    }

    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 0;
      top: 0;
      // height: 2.875rem;
      // width: 2.875rem;
      height: calc(2.25rem + 2px);
      width: 2.375rem;
      padding: 0;
      background: none;
      border: 0 none;
      border-radius: 0 0.375rem 0.375rem 0;
      padding: calc((2.25rem - 24px) / 2);
      cursor: pointer;
    }

    .button:disabled {
      cursor: not-allowed;
    }
  }
</style>
