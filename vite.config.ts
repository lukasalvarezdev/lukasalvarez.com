import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { rehypePrettyCode } from 'rehype-pretty-code';

export default defineConfig({
	server: { port: 3000 },
	plugins: [
		mdx({
			remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
			rehypePlugins: [
				[rehypePrettyCode, { theme: { dark: 'github-dark-dimmed', light: 'one-light' } }],
			],
		}),
		remix({
			future: {
				v3_fetcherPersist: true,
				v3_relativeSplatPath: true,
				v3_throwAbortReason: true,
			},
		}),
		tsconfigPaths(),
	],
});
