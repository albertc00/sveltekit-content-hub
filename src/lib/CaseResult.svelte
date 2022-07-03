<script>
  export let title;
  export let text;
</script>

<div class="wrapper">
  <h3>{title}</h3>
  <table>
    <thead>
      <tr>
        <th>KPI</th>
        <th>#</th>
      </tr>
    </thead>
    <tbody>
      {#each text as { label, value }}
        <tr>
          <td>
            {label}
          </td>
          <td class="td-value">
            {value}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .wrapper {
    padding: 1rem;
  }

  .td-value {
    text-align: center;
  }

  h3 {
    font-size: 1rem;
    line-height: 1.5rem;
    font-family: 'Work Sans', sans-serif;
    font-weight: 600;
    color: #231f20;
    margin: 0 0 1.25rem;
  }

  table {
    /* border: 1px solid rgb(199, 198, 198); */
    border-collapse: collapse;
    table-layout: fixed;
    margin: 0 auto;
  }

  td,
  th {
    border: 1px solid #c4cbcf;
  }

  td {
    font-family: 'Lato', sans-serif;
    font-size: 0.875rem;
    line-height: 1.25rem;
    letter-spacing: initial;
    padding: 0.5rem 1rem;
    color: #231f20;
    min-width: 150px;
  }

  th {
    background-color: #c4cbcf;
    color: #231f20;
    font-weight: 600;
    text-transform: uppercase;
    font-family: 'Work Sans', sans-serif;
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 0.5rem;
    text-align: center;
  }
</style>
