import { Link } from '@remix-run/react';
import { FrontmatterType } from './blog.server';
import { cn } from './misc';

export function BlogGrid({
	posts,
}: {
	posts: Array<{ slug: string; metadata: FrontmatterType }>;
}) {
	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{posts.map(post => (
				<Link to={`/blog/${post.slug}`} key={post.slug} prefetch="viewport" className="group">
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
	);
}
