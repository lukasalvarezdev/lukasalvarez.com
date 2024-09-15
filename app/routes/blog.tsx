import { Outlet } from '@remix-run/react';

export default function Component() {
	return (
		<div className="mx-auto w-[90%] max-w-2xl mdx">
			<Outlet />
		</div>
	);
}
