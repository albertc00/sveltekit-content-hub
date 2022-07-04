<div class="skeleton" />

<!-- .skeleton {
    height: calc(
      0.875rem + 0.75rem + 2px
    ); /* font-size _ padding top and bottom */
    font-size: 0.75rem; /* 12px */
    line-height: 1rem; /* 16px */
    background-color: #ebecef;
    border-radius: 0.25rem;
    animation: 1.5s shine linear infinite;
  }  -->
<style>
  .skeleton {
    height: calc(
      1rem + (0.375rem * 2) + 2px
    ); /* font-size _ padding top and bottom */
    max-width: 335px;
    font-size: 0.75rem; /* 12px */
    line-height: 1rem; /* 16px */
    background: #eee;
    background: linear-gradient(
      110deg,
      #ececec71 8%,
      #e2e2e2a8 18%,
      #ececec8f 35%
    );
    border-radius: 0.25rem;
    background-size: 200% 100%;
    animation: 2s shine linear infinite;
  }
  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }
</style>
