import { Link, MetaFunction, useLoaderData } from '@remix-run/react';
import { bundleMDX } from 'mdx-bundler';
import { getFrontMatter, postContentsBySlug } from '~/utils/blog.server';
import { cn } from '~/utils/misc';

export async function loader() {
	const posts = await Promise.all(
		Array.from(Object.entries(postContentsBySlug)).map(async ([slug, content]) => {
			const { frontmatter } = await bundleMDX({ source: content });
			return { slug, metadata: getFrontMatter(frontmatter) };
		}),
	);

	return { posts };
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

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{posts.map(post => (
					<Link to={`/blog/${post.slug}`} key={post.slug} prefetch="intent" className="group">
						<div className="aspect-[3/4] relative mb-4">
							<img
								src={post.metadata.bannerUrl}
								alt={post.metadata.bannerCredit}
								className="w-full h-full object-cover rounded-lg mb-2 relative z-20"
								loading="lazy"
							/>
							<div
								className={cn(
									'w-[94%] h-[94%] absolute z-10 border-2 border-primary rounded-xl',
									'group-hover:scale-110 transition-transform',
									'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
								)}
							></div>
						</div>
						<p className="text-sm">{post.metadata.date}</p>
						<h4>{post.metadata.title}</h4>
					</Link>
				))}
			</div>
		</div>
	);
}
