import { Link } from '@remix-run/react';
import { contactUrl } from './misc';

export function Header() {
	return (
		<header className="flex items-center py-6 md:px-6 justify-between mx-auto w-[85%] max-w-6xl">
			<Link
				to="/"
				className="underlined text-black dark:text-white text-primary underlined block whitespace-nowrap text-xl font-medium transition focus:outline-none"
			>
				<h1 className="text-2xl hidden md:block">Lukas Alvarez</h1>
				<h1 className="text-2xl md:hidden">Lukas A.</h1>
			</Link>

			<nav className="text-base">
				<ul className="flex gap-4">
					<li className="hidden md:block">
						<Link to="/blog" className="underlined">
							Blog
						</Link>
					</li>
					<li className="hidden md:block">
						<Link to="/#about" className="underlined">
							About
						</Link>
					</li>
					<li>
						<Link
							to={contactUrl}
							className="py-1.5 px-4 dark:bg-white text-[color:var(--bg-primary)] bg-[color:var(--text-primary)] rounded-full font-medium"
						>
							Contact
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
