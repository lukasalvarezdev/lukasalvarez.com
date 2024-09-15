export async function loader() {
	await readFile();
	return { hi: 'World' };
}

async function readFile() {
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
