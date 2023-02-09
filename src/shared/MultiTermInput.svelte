<script>
	export let keywords = [];
	export let disableInput;
	let value = '';
	$: trimmed = value.trim();
	let inputRef;

	function handleKeydown(e) {
		const { target, key } = e;

		switch (key) {
			case 'Enter':
			case 'Tab':
			case ',':
				if (target === inputRef) {
					e.preventDefault();
				}

				if (trimmed !== '') {
					if (!keywords.includes(trimmed)) {
						keywords = [...keywords, trimmed];
						value = '';
					}
				}
				break;
			default:
				break;
		}
	}

	function handleClose(keyword) {
		keywords = keywords.filter((word) => word !== keyword);
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="wrapper" on:click={() => inputRef.focus()} tabindex="-1" on:keypress={() => {}}>
	{#if keywords.length}
		{#each keywords as keyword (keyword)}
			<div class="keyword">
				<span class="word">{keyword}</span>
				<button class="close" on:click={() => handleClose(keyword)}>
					<span class="material-symbols-outlined"> close </span>
					<!-- <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M6.062 15 5 13.938 8.938 10 5 6.062 6.062 5 10 8.938 13.938 5 15 6.062 11.062 10 15 13.938 13.938 15 10 11.062Z"/></svg> -->
				</button>
			</div>
		{/each}
	{/if}
	<div class="input-wrapper">
		<input
			class="input"
			type="text"
			autocomplete="off"
			disabled={disableInput}
			bind:value
			bind:this={inputRef}
			style:width={`calc(${value.length || 1} * 1ch)`}
		/>
	</div>
</div>
<div class="error-message" class:show={disableInput}>
	<span> Parameter limit reached</span>
</div>

<style lang="scss">
	@use '../styles/app';

	.wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
		padding: 0.375rem 0.5rem;
		border: 1px solid #d1d1d1;
		border-radius: 0.25rem;
		cursor: text;
	}

	.input-wrapper {
		display: inline-block;
	}

	.input {
		display: inline-block;
		@include app.text('sm');
		padding: 0;
		margin: 0;
		border: 0 none;

		&:focus {
			outline: 0 none;
		}
	}

	.keyword {
		display: inline-flex;
		gap: 0.25rem;
		align-items: center;
		justify-content: center;
		width: max-content;
		@include app.text('xs');
		font-weight: 500;
		padding: 0 0.125rem 0 0.375rem;
		border: 1px solid #d1d1d1;
		border-radius: 0.25rem;
		background: #f1f1f1;
		vertical-align: middle;
		box-sizing: border-box;
	}

	.word {
		white-space: nowrap;
		vertical-align: middle;
	}

	.close {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		margin: 0;
		background: transparent;
		border: 0 none;
		cursor: pointer;

		.material-symbols-outlined {
			// font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20;
			@include app.text('lg', 1);
		}
	}

	.error-message {
		display: none;
		span {
			color: red;
			@include app.text('xs');
			padding: 0 0.125rem 0.125rem 0.125rem;
		}

		&.show {
			display: block;
		}
	}
</style>
