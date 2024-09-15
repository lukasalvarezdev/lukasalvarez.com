import * as React from 'react';
import { LoaderFunctionArgs } from '@remix-run/node';
import { Link, MetaFunction, useLoaderData } from '@remix-run/react';
import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { getMDXComponent } from 'mdx-bundler/client';
import { bundleMDX } from 'mdx-bundler';
import { rehypePrettyCode } from 'rehype-pretty-code';
import { formatDate, getGenericSocialImage, getSocialMetas } from '~/utils/misc';
import { ArrowBack } from '~/utils/icons';
import { RootLoaderType } from '~/root';

export async function loader({ params }: LoaderFunctionArgs) {
	const __dirname = dirname(fileURLToPath(import.meta.url));
	const { slug } = params;
	const filePath = path.join(__dirname, `../client/content/${slug}.mdx`);
	const fileContent = await fs.readFile(filePath, 'utf-8');

	const { code, frontmatter } = await bundleMDX({
		source: fileContent,
		mdxOptions(options) {
			options.remarkPlugins = [...(options.remarkPlugins ?? [])];
			options.rehypePlugins = [
				...(options.rehypePlugins ?? []),
				[rehypePrettyCode, { theme: { dark: 'github-dark-dimmed', light: 'github-light' } }],
			];

			return options;
		},
	});

	return { code, slug, metadata: getFrontMatter() };

	function getFrontMatter(): FrontmatterType {
		const matter = frontmatter as FrontmatterType;
		return { ...matter, date: formatDate(matter.date) };
	}
}

export default function BlogPost() {
	const { code, slug, metadata } = useLoaderData<typeof loader>();

	const Component = React.useMemo(() => getMDXComponent(code), [code]);

	return (
		<div key={slug}>
			<div className="max-w-2xl mx-auto">
				<Link
					to="/blog"
					className="flex gap-2 mb-8 text-base text-black dark:text-white items-center group max-w-max"
				>
					<ArrowBack className="group-hover:-translate-x-1 transition-all" />
					Back to blog
				</Link>
				<h1 className="mb-2 text-black dark:text-white">{metadata.title}</h1>
				<p className="text-base mb-8">{metadata.date}</p>
			</div>

			<div className="max-w-4xl mx-auto">
				<img
					src={metadata.bannerUrl}
					alt={metadata.bannerCredit}
					className="w-full object-cover rounded-lg mb-8"
				/>
			</div>

			<div className="mdx max-w-2xl mx-auto">
				<Component />
			</div>
		</div>
	);
}

type FrontmatterType = {
	title: string;
	date: string;
	description: string;
	bannerCredit: string;
	bannerUrl: string;
	meta: { keywords: string[] };
};

type ExtraMeta = Array<{ [key: string]: string }>;
type MetaLoader = typeof loader;

export const meta: MetaFunction<MetaLoader, { root: RootLoaderType }> = ({ data, matches }) => {
	const requestInfo = getRequestInfo();

	if (data) {
		const extraMetaInfo = data.metadata.meta ?? {};
		const extraMeta: ExtraMeta = Object.entries(extraMetaInfo).reduce(
			(acc: ExtraMeta, [key, val]) => [...acc, { [key]: String(val) }],
			[],
		);

		const title = data.metadata.title;
		const url = getUrl(requestInfo);

		return [
			...getSocialMetas({
				url,
				title,
				description: data.metadata.description,
				image: getGenericSocialImage({
					url,
					words: title,
					featuredImage: data.metadata.bannerUrl,
				}),
			}),
			...extraMeta,
		].filter(Boolean);
	} else {
		return [{ title: 'Not found' }, { description: 'You landed on the wrong place buddy' }];
	}

	function getRequestInfo() {
		return (matches.find(m => m.id === 'root')?.data as RootLoaderType)?.requestInfo;
	}
};

function getOrigin(requestInfo?: { origin?: string; path: string }) {
	return requestInfo?.origin ?? 'https://lukasalvarez.com';
}
function removeTrailingSlash(s: string) {
	return s.endsWith('/') ? s.slice(0, -1) : s;
}
function getUrl(requestInfo?: { origin: string; path: string }) {
	return removeTrailingSlash(`${getOrigin(requestInfo)}${requestInfo?.path ?? ''}`);
}
