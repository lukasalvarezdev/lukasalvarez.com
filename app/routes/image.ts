import fs from 'fs/promises';
import path from 'path';

export async function loader() {
	const filePath = path.join(process.cwd(), 'public', 'memoji.png');
	const fileContent = await fs.readFile(filePath, 'utf-8');
	console.log(fileContent);
	return { fileContent };
}
