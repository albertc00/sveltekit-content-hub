<script>
	export let results;
	export let title;

	const icons = [
		{
			icon: '&#xef4f;',
			keywords: ['sales', 'appointments', 'sql']
		},
		{
			icon: '&#xef49;',
			keywords: ['marketing', 'lead', 'mql']
		},
		{
			icon: '&#xe878;',
			keywords: ['event', 'webinar', 'invite']
		},
		{
			icon: '&#xe80d;',
			keywords: ['social', 'connection', 'smm']
		},
		{
			icon: '&#xe0ba;',
			keywords: ['profile', 'contacts']
		},
		{
			icon: '&#xeb7b;',
			keywords: ['follow']
		},
		{
			icon: '&#xf0d2;',
			keywords: ['email']
		}
	];

	$: _results = results.map(({ label, value }) => {
		for (let i = 0; i < icons.length; i++) {
			const { icon, keywords } = icons[i];

			for (let j = 0; j < keywords.length; j++) {
				const keyword = keywords[j];

				if (label.toLowerCase().includes(keyword)) {
					return {
						label,
						value,
						icon
					};
				}
			}
		}

		return { label, value, icon: '&#xe153;' };
	});
</script>

<div class="wrapper">
	<h3>{title}</h3>
	<table>
		{#each _results as { label, value, icon }, i (i)}
			<tr class="row">
				<th scope="col"
					><div class="label">
						<span class="material-symbols-outlined">{@html icon}</span>
						{label}
					</div></th
				>
				<td>{value}</td>
			</tr>
		{/each}
	</table>
</div>

<style lang="scss">
	@use '../styles/app';

	.wrapper {
		padding: 0.5rem 0.5rem 1.5rem;
	}

	h3 {
		@include app.text('lg');
		font-family: 'Work Sans', sans-serif;
		font-weight: 600;
		color: app.colors('grey-900');
		text-align: center;
		width: calc(500px - 1rem);
		margin: 0 auto 2rem;
	}

	table {
		border: 0 none;
		border-spacing: 0;
		width: calc(100% / 12 * 10);
		margin: 0 auto;
	}

	th,
	td {
		@include app.text('sm');
		letter-spacing: 0.025em;
		font-family: 'Lato', sans-serif;
		text-align: left;
		padding: 1rem;
		border-bottom: 1px solid app.colors('grey-400', 0.2);
	}

	.label {
		font-family: 'Work Sans', sans-serif;
		font-weight: 500;
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}
</style>
