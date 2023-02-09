// import { filters } from '$stores/filters';

/** @type {import('./$types').PageLoad} */
export async function load(event) {
	const {
		params: { page },
		url: { searchParams },
		fetch
	} = event;

	const url = `https://www.callboxinc.com/wp-json/cch/v1/case-studies?page=${page}&${searchParams.toString()}`;

	const res = await fetch(url);
	const data = await res.json();

	return data;
}
