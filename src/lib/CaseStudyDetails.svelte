<script>
  import Value from '$shared/Value.svelte';
  import Hyperlink from '$shared/Hyperlink.svelte';

  export let data;
</script>

<div class="wrapper">
  <table class="details">
    <tbody>
      <tr>
        <th scope="row" class="label">Title</th>
        <td>
          <div class="p">
            <a href={data.unlocked} target="_blank">{data.title}</a>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row" class="label">Summary</th>
        <td>
          <Value value={data.excerpt}>
            <div class="p">{data.excerpt}</div>
          </Value>
        </td>
      </tr>
    </tbody>

    <tbody>
      <tr>
        <th scope="col" colspan="2" class="section">
          <div class="section-heading">
            <span class="material-symbols-outlined">&#xe7fd;</span>Client
            Details
          </div>
        </th>
      </tr>
      <tr>
        <th scope="row" class="label">Company</th>
        <td>
          <Value value={data.clientName}>
            <Hyperlink text={data.clientName} link={data.clientWebsite} />
          </Value>
        </td>
      </tr>
      <tr>
        <th scope="row" class="label">Industry</th>
        <td>
          <Value value={data.product}>
            <div class="p">{data.product}</div>
          </Value>
        </td>
      </tr>
      <tr>
        <th scope="row" class="label">LOB</th>
        <td>
          <Value value={data.clientLOB}>
            <div class="p">{data.clientLOB}</div>
          </Value>
        </td>
      </tr>
      <tr>
        <th scope="row" class="label">Location</th>
        <td>
          <Value value={data.clientLocation}>
            <div class="p">{data.clientLocation}</div>
          </Value>
        </td>
      </tr>
    </tbody>

    <tbody>
      <tr>
        <th scope="col" colspan="2" class="section">
          <div class="section-heading">
            <span class="material-symbols-outlined">&#xe153;</span>Target
            Details
          </div>
        </th>
      </tr>
      <tr>
        <th scope="row" class="label">Industry</th>
        <td>
          <Value value={data.targetIndustry}>
            <div class="p">{data.targetIndustry}</div>
          </Value>
        </td>
      </tr>
      <tr>
        <th scope="row" class="label">Location</th>
        <td>
          <Value value={data.targetLocation}>
            <div class="p">{data.targetLocation}</div>
          </Value>
        </td>
      </tr>
      <tr>
        <th scope="row" class="label">Contacts</th>
        <td>
          <Value value={data.targetDM}>
            <div class="p">{data.targetDM}</div>
          </Value>
        </td>
      </tr>
    </tbody>

    <tbody>
      <tr>
        <th scope="col" colspan="2" class="section">
          <div class="section-heading">
            <span class="material-symbols-outlined">&#xef49;</span> Campaign Details
          </div>
        </th>
      </tr>
      <tr>
        <th scope="row" class="label">Type</th>
        <td>
          <Value value={data.campaign}>
            <ul class="pills">
              {#each data.campaign as type (type)}
                <li class="pill">{type}</li>
              {/each}
            </ul>
          </Value>
        </td>
      </tr>
      <tr>
        <th scope="row" class="label">Results</th>
        <td>
          <Value value={data.results}>
            <table class="results">
              {#each data.results as result (result)}
                <tr>
                  <th scope="row">{result.label}</th>
                  <td>{result.value}</td>
                </tr>
              {/each}
            </table>
          </Value>
        </td>
      </tr>
      <tr>
        <th scope="row" class="label">Highlights</th>
        <td>
          <Value value={data.highlights}>
            <ul class="highlights">
              {#each data.highlights as highlight (highlight)}
                <li>{highlight}</li>
              {/each}
            </ul>
          </Value>
        </td>
      </tr>
    </tbody>

    <tbody>
      <tr>
        <th scope="col" colspan="2" class="section">
          <div class="section-heading">
            <span class="material-symbols-outlined">&#xef42;</span> Full Story
          </div>
        </th>
      </tr>
      <Value value={data.content}>
        <tr class="the-content">
          <th />
          <td>
            <div class="content-wrapper">
              <div class="content">{@html data.content}</div>
            </div>
          </td>
        </tr>
      </Value>
    </tbody>
  </table>
</div>

<style lang="scss">
  @use '../styles/app';

  @mixin text {
    @include app.text('sm');
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    color: app.colors('grey-700');
    letter-spacing: 0.025em;
    margin: 0;
  }

  .wrapper {
    padding: 1.5rem;
  }

  table.details {
    border-spacing: 0;

    & > tbody > tr {
      & > th,
      & > td {
        border-bottom: 1px solid app.colors('grey-400', 0.2);
      }

      $padding-y: 1rem;

      & > th {
        text-align: left;
        vertical-align: top;
        padding: $padding-y 3rem $padding-y 0;

        &.section {
          padding-top: 2.5rem;
          border-bottom: 0 none;
        }
      }

      & > td {
        padding: $padding-y 0;
      }
    }
  }

  table.results {
    border-spacing: 0;
    border: 1px solid app.colors('grey-400', 0.3);
    border-radius: 0.25rem;

    th,
    td {
      text-align: left;
      @include text;
      padding: 0.5rem;
    }

    th {
      font-family: 'Work Sans', sans-serif;
      font-weight: 500;
    }

    tr {
      &:not(:last-child) {
        th,
        td {
          border-bottom: 1px solid app.colors('grey-400', 0.3);
        }
      }

      &:last-child {
        th,
        td {
          border-bottom: 0 none;
        }
      }
    }
  }

  ul,
  ol {
    @include text;
    padding-left: 1.25rem;
  }

  a {
    font-weight: 700;
    text-decoration: none;
    color: app.colors('blue-350');
  }

  .section-heading {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    @include app.text('base');
    font-family: 'Work Sans', sans-serif;
    font-weight: 600;
    letter-spacing: 0.025em;
    color: app.colors('grey-900');
    margin: 0;
  }

  .label {
    @include app.text('sm');
    font-family: 'Work Sans', sans-serif;
    font-weight: 600;
    letter-spacing: 0.025em;
    color: app.colors('grey-900', 0.85);
    margin: 1rem 0;
  }

  .p {
    @include text;
  }

  .pills {
    @include app.reset-list;
    display: flex;
    gap: 0.75rem;
  }

  .pill {
    @include text;
    display: inline-block;
    padding: 0.25rem 1rem;
    background-color: app.colors('grey-400', 0.1);
    border: 1px solid app.colors('grey-400', 0.3);
    border-radius: 0.375rem;
  }

  .the-content {
    th,
    td {
      border-bottom: 0 none;
    }
  }

  .content-wrapper {
    max-height: 350px;
    overflow-y: scroll;
    border: 1px solid app.colors('grey-400', 0.3);
    border-radius: 0.25rem;
    padding: 1.5rem;
  }

  .content {
    :global(h2),
    :global(h3) {
      @include app.text('lg');
      font-family: 'Work Sans', sans-serif;
      font-weight: 600;
      color: app.colors('grey-900');
      margin: 0 0 1rem;

      :global(b) {
        font-family: 'Work Sans', sans-serif;
        font-weight: 600;
      }
    }

    :global(h3) {
      @include app.text('base');
    }

    :global(p),
    :global(span) {
      @include text;
      margin: 1rem 0;
    }

    :global(ul),
    :global(ol) {
      @include text;
      margin: 1rem 0;
    }
  }
</style>
