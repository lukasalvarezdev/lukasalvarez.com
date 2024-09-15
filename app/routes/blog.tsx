import { Outlet } from '@remix-run/react';
import { Header } from '~/utils/header';

export default function Component() {
	return (
		<div>
			<Header />
			<div className="mx-auto w-[85%] max-w-2xl mdx mt-8">
				<Outlet />
			</div>
		</div>
	);
}
