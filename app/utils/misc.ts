import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A handy utility that makes constructing class names easier.
 * It also merges tailwind classes.
 */
export function cn(...inputs: Array<ClassValue>) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

const images = {
	garden:
		'https://res.cloudinary.com/dmfhqqv3t/image/upload/v1726410443/markus-spiske-bk11wZwb9F4-unsplash_2_cq42fa.jpg',
};

export function getGenericSocialImage({
	words,
	featuredImage: img,
	url,
}: {
	words: string;
	featuredImage: string;
	url: string;
}) {
	const vars = `$th_1256,$tw_2400,$gw_$tw_div_24,$gh_$th_div_12`;

	const encodedWords = doubleEncode(words);
	const primaryWordsSection = `co_white,c_fit,g_north_west,w_$gw_mul_10,h_$gh_mul_7,x_$gw_mul_1.3,y_$gh_mul_1.5,l_text:kentcdodds.com:Matter-Regular.woff2_110:${encodedWords}`;

	const kentProfileSection = `c_fit,g_north_west,r_max,w_$gw_mul_4,h_$gh_mul_3,x_$gw,y_$gh_mul_8,l_kent:profile-transparent`;
	const kentNameSection = `co_rgb:a9adc1,c_fit,g_north_west,w_$gw_mul_5.5,h_$gh_mul_4,x_$gw_mul_4.5,y_$gh_mul_9,l_text:kentcdodds.com:Matter-Regular.woff2_70:Kent%20C.%20Dodds`;

	const encodedUrl = doubleEncode(url);
	const urlSection = `co_rgb:a9adc1,c_fit,g_north_west,w_$gw_mul_5.5,x_$gw_mul_4.5,y_$gh_mul_9.8,l_text:kentcdodds.com:Matter-Regular.woff2_40:${encodedUrl}`;

	const featuredImageIsRemote = img.startsWith('http');
	const featuredImageCloudinaryId = featuredImageIsRemote
		? toBase64(img)
		: img.replace(/\//g, ':');
	const featuredImageLayerType = featuredImageIsRemote ? 'l_fetch:' : 'l_';

	const featureImageSection = `c_fit,g_east,w_$gw_mul_11,h_$gh_mul_11,x_$gw,${featuredImageLayerType}${featuredImageCloudinaryId}`;

	const backgroundSection = `c_fill,w_$tw,h_$th/kentcdodds.com/social-background.png`;
	return [
		`https://res.cloudinary.com/kentcdodds-com/image/upload`,
		vars,
		primaryWordsSection,
		kentProfileSection,
		kentNameSection,
		urlSection,
		featureImageSection,
		backgroundSection,
	].join('/');
}

export function getSocialMetas({
	url,
	title = "Going beyond software: Make something you're truly proud of.",
	description = 'Make the world better with software',
	image = getGenericSocialImage({ url, words: title, featuredImage: images.garden }),
	keywords = '',
}: {
	image?: string;
	url: string;
	title?: string;
	description?: string;
	keywords?: string;
}) {
	return [
		{ title },
		{ name: 'description', content: description },
		{ name: 'keywords', content: keywords },
		{ name: 'image', content: image },
		{ name: 'og:url', content: url },
		{ name: 'og:title', content: title },
		{ name: 'og:description', content: description },
		{ name: 'og:image', content: image },
		{
			name: 'twitter:card',
			content: image ? 'summary_large_image' : 'summary',
		},
		{ name: 'twitter:creator', content: '@kentcdodds' },
		{ name: 'twitter:site', content: '@kentcdodds' },
		{ name: 'twitter:title', content: title },
		{ name: 'twitter:description', content: description },
		{ name: 'twitter:image', content: image },
		{ name: 'twitter:image:alt', content: title },
	];
}

function toBase64(string: string) {
	if (typeof window === 'undefined') {
		return Buffer.from(string).toString('base64');
	} else {
		return window.btoa(string);
	}
}

// cloudinary needs double-encoding
function doubleEncode(s: string) {
	return encodeURIComponent(encodeURIComponent(s));
}

/**
 * @returns domain URL (without a ending slash, like: https://lukasalvarez.com)
 */
export function getDomainUrl(request: Request) {
	const host = request.headers.get('X-Forwarded-Host') ?? request.headers.get('host');
	if (!host) {
		throw new Error('Could not determine domain URL.');
	}
	const protocol = host.includes('localhost') ? 'http' : 'https';
	return `${protocol}://${host}`;
}
