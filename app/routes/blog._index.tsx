import { MetaFunction, useLoaderData } from '@remix-run/react';
import { bundleMDX } from 'mdx-bundler';
import { BlogGrid } from '~/utils/blog-grid';
import { getFrontMatter, postContentsBySlug } from '~/utils/blog.server';

export async function loader() {
	const posts = await Promise.all(
		Array.from(Object.entries(postContentsBySlug)).map(async ([slug, content]) => {
			const { frontmatter } = await bundleMDX({ source: content });
			return { slug, metadata: getFrontMatter(frontmatter) };
		}),
	);

	return {
		posts: posts.sort(
			(a, b) => new Date(b.metadata.rawDate).getTime() - new Date(a.metadata.rawDate).getTime(),
		),
	};
}

export const meta: MetaFunction = () => {
	return [
		{ title: 'Blog: thoughts on code, mindset, and everything in between — Lukas Alvarez' },
		{
			name: 'description',
			content:
				"Check out my latest insights, experiences, and experiments. It's not just about writing code—it's about how we think and approach building things.",
		},
	];
};

export default function Component() {
	const { posts } = useLoaderData<typeof loader>();

	return (
		<div className="max-w-4xl mx-auto">
			<h1 className="mb-4 text-black dark:text-white">
				Thoughts on code, mindset, and everything in between
			</h1>
			<p className="mb-8">
				Check out my latest insights, experiences, and experiments. It&apos;s not just about
				writing code—it&apos;s about how we think and approach building things.
			</p>

			<BlogGrid posts={posts} />
		</div>
	);
}
