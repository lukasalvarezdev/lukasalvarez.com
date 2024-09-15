export async function loader() {
	console.log(readFile());
	return { hi: 'World' };
}

function readFile() {
	return Object.fromEntries(
		Object.entries(
			import.meta.glob('../content/*.mdx', {
				query: '?raw',
				import: 'default',
				eager: true,
			}),
		),
	);
}
