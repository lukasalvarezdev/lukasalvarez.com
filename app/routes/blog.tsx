import { Outlet } from '@remix-run/react';
import { Footer } from '~/utils/footer';
import { Header } from '~/utils/header';

export default function Component() {
	return (
		<div>
			<Header />
			<div className="mx-auto w-[85%] mt-8">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}
