import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { Header } from '~/utils/header';
import { cn } from '~/utils/misc';

export const meta: MetaFunction = () => {
	return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
	return (
		<div>
			<Header />
			<div className="mx-auto w-[85%] max-w-6xl">
				<div
					className={cn(
						'grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 max-w-4xl mx-auto gap-8',
					)}
				>
					<div className="col-span-full lg:col-span-5 flex flex-col justify-center gap-8">
						<h1 className="text-primary">
							Going beyond software: Make something you&apos;re truly proud of.
						</h1>
						<div className="flex flex-col gap-4">
							<Link
								to="#contact"
								className={cn(
									'py-3 px-6 dark:bg-white text-[color:var(--bg-primary)] bg-[color:var(--text-primary)]',
									'rounded-full font-medium max-w-max text-base',
								)}
							>
								Contact me
							</Link>
							<Link
								to="/blog"
								className={cn(
									'py-3 px-6 rounded-full font-medium max-w-max text-base',
									'text-primary border border-gray-200 dark:border-gray-100',
								)}
							>
								Read the blog
							</Link>
						</div>

						<button></button>
					</div>
					<div className="col-span-full lg:col-span-7 row-start-1 lg:col-start-6">
						<div>
							<img src="/memoji.png" alt="Remix" className="w-full max-w-full" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
