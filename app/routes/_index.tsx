import * as React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Await, defer, Link, useLoaderData } from '@remix-run/react';
import { bundleMDX } from 'mdx-bundler';
import { BlogGrid } from '~/utils/blog-grid';
import { getFrontMatter, postContentsBySlug } from '~/utils/blog.server';
import { Footer } from '~/utils/footer';
import { Header } from '~/utils/header';
import { ArrowBack } from '~/utils/icons';
import { cn } from '~/utils/misc';

export const meta: MetaFunction = () => {
	return [
		{ title: "Going beyond software: Make something you're truly proud of — Lukas Alvarez" },
		{
			name: 'description',
			content:
				"Check out my latest insights, experiences, and experiments. It&apos;s not just about writing code—it's about how we think and approach building things.",
		},
	];
};

export async function loader() {
	async function getPosts() {
		const posts = await Promise.all(
			Array.from(Object.entries(postContentsBySlug))
				.slice(0, 3)
				.map(async ([slug, content]) => {
					const { frontmatter } = await bundleMDX({ source: content });
					return { slug, metadata: getFrontMatter(frontmatter) };
				}),
		);

		return posts.sort(
			(a, b) => new Date(b.metadata.rawDate).getTime() - new Date(a.metadata.rawDate).getTime(),
		);
	}

	return defer({ posts: getPosts() });
}

export default function Index() {
	return (
		<div>
			<div className="min-h-screen h-full">
				<Header />
				<div className="mx-auto w-[85%] max-w-6xl">
					<div
						className={cn(
							'grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 max-w-4xl mx-auto gap-8',
						)}
					>
						<div className="col-span-full lg:col-span-5 flex flex-col justify-between gap-8">
							<div className="flex-1 flex flex-col justify-center gap-8">
								<h1 className="text-primary">
									Going beyond software: Make something you&apos;re truly proud of.
								</h1>
								<div className="flex flex-col gap-4">
									<button
										className={cn(
											'py-3 px-6 dark:bg-white text-[color:var(--bg-primary)] bg-[color:var(--text-primary)]',
											'rounded-full font-medium max-w-max text-base',
										)}
										onClick={() => {
											document
												.getElementById('contact')
												?.scrollIntoView({ behavior: 'smooth' });
										}}
									>
										Contact me
									</button>
									<Link
										to="/blog"
										className={cn(
											'py-3 px-6 rounded-full font-medium max-w-max text-base',
											'text-primary border border-gray-200 dark:border-gray-100',
										)}
										prefetch="render"
									>
										Read the blog
									</Link>
								</div>
							</div>

							<button
								className="flex group items-center gap-4 max-w-max text-black dark:text-white hover:text-opacity-70"
								onClick={() => {
									document.getElementById('about_me')?.scrollIntoView({ behavior: 'smooth' });
								}}
							>
								<span
									className={cn(
										'flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-200',
									)}
								>
									<ArrowBack className="w-6 h-6 rotate-270 group-hover:translate-y-1 transition-all" />
								</span>
								Learn more about me
							</button>
						</div>
						<div className="col-span-full lg:col-span-7 row-start-1 lg:col-start-6">
							<div>
								<img src="/memoji.png" alt="Remix" className="w-full max-w-full" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mx-auto w-[85%] max-w-4xl">
				<div
					className={cn(
						'grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 max-w-4xl mx-auto gap-8',
						'pt-16',
					)}
					id="about_me"
				>
					<div className="col-span-full lg:col-span-5 flex flex-col justify-between gap-8">
						<img
							src="https://res.cloudinary.com/dmfhqqv3t/image/upload/v1726510841/IMG_2639_1_ocgd5b.jpg"
							alt="By Lukas Alvarez"
							className="aspect-[4/3] lg:aspect-[3/4] rounded-lg object-cover"
							loading="lazy"
						/>
					</div>
					<div className="col-span-full lg:col-span-7 row-start-1 lg:col-start-6">
						<h2 className="mb-8">Hi there, it&apos;s Lukas</h2>
						<p>
							I started coding with a simple goal: to build a small e-commerce site. Little did
							I know, this would spark a deep passion for creating clean, elegant software. For
							me, aesthetics and attention to detail are as crucial as functionality. I strive
							to make everything—both the UI and the code—look and feel just right.
							<br />
							<br />
							One of my proudest achievements was developing an ERP startup from scratch. I
							coded the whole thing myself, but personal challenges with my co-founder
							eventually led me to step away. Despite the hurdles, that project remains a
							testament to my skills and dedication.
							<br />
							<br />
							When faced with tough problems, I start by laying them out on paper. I find that
							planning everything out helps me stay focused and tackle challenges effectively.
							<br />
							<br />
							I&apos;m driven by a desire to make a positive impact—whether that&apos;s helping
							others grow, improving a project, or just making sure every place and person I
							encounter is better off than before.
							<br />
							<br />
							Outside of work, I&apos;m passionate about photography (yes, I took that photo of
							the stars), playing football, and solo travel. These activities keep me grounded
							and give me a fresh perspective, helping me bring a balanced approach to my work.
						</p>
					</div>
				</div>

				<section className="pt-16 mb-16" id="contact">
					<h2 className="text-center mb-8">Contact me</h2>

					<div className="grid lg:grid-cols-3 gap-8">
						<ContactCard
							to="mailto:lukasalvarezdev@gmail.com"
							title="Email"
							description="Interested in collaborating or have a question? Drop me an email."
							icon="mail-open-line"
							action="lukasalvarezdev@gmail.com"
						/>
						<ContactCard
							to="https://www.linkedin.com/in/lukasalvarezdev"
							title="Linkedin"
							description="Explore my professional background and let's connect."
							icon="linkedin-box-line"
							action="View profile"
						/>
						<ContactCard
							to="https://www.github.com/lukasalvarezdev"
							title="Github"
							description="Take a look at my work in progress and see how I code."
							icon="github-line"
							action="View profile"
						/>
					</div>
				</section>

				<BlogSection />
			</div>

			<Footer />
		</div>
	);
}

function ContactCard({
	description,
	title,
	to,
	action,
	icon,
}: {
	to: string;
	title: string;
	description: string;
	icon: string;
	action: string;
}) {
	return (
		<a
			href={to}
			className={cn(
				'bg-[#f3f3f3] dark:bg-[#22272e]',
				'p-6 aspect-square rounded-lg flex flex-col justify-between',
				'hover:bg-[#e7e7e7] dark:hover:bg-[#25292f] group',
			)}
			target="_blank"
			rel="noopener noreferrer"
		>
			<div>
				<h3 className="text-black dark:text-white">{title}</h3>
				<p className="mb-4">{description}</p>
				<p className="text-base group-hover:underline">{action}</p>
			</div>

			<i className={`ri-${icon}`}></i>
		</a>
	);
}

function BlogSection() {
	const { posts } = useLoaderData<typeof loader>();

	return (
		<div className="mb-16">
			<h2 className="mb-8 text-center">
				Some thoughts on code, mindset, and everything in between.
			</h2>

			<React.Suspense fallback={null}>
				<Await resolve={posts}>{posts => <BlogGrid posts={posts} />}</Await>
			</React.Suspense>
		</div>
	);
}
