import fs from 'fs/promises';
import path from 'path';

export async function loader() {
	await readFile('mememoji.png');
	await readFile('software-as-an-art.mdx');
	return { hi: 'World' };
}

async function readFile(rest: string) {
	try {
		const filePath = path.join(process.cwd(), 'public', rest);
		return await fs.readFile(filePath, 'utf-8');
	} catch (error) {
		console.log(error);
	}
}
