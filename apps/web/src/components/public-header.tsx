import Link from "next/link";
import { LogoMark } from "@/components/landing/logo";

export default function PublicHeader() {
	const centerNav = [
		{ label: "Features", href: "#features" },
		{ label: "How it works", href: "#how-it-works" },
		{ label: "Mobile app", href: "#mobile" },
		{ label: "Team", href: "#team" },
	];

	return (
		<header className="fixed inset-x-0 top-0 z-50">
			<div className="mx-auto mt-4 flex max-w-5xl items-center justify-between rounded-2xl border border-white/8 bg-[#0b0b12]/70 px-4 py-2.5 backdrop-blur-xl sm:px-5">
				<Link href="/" className="group flex items-center gap-2.5">
					<LogoMark className="h-8 w-8 transition-transform duration-300 group-hover:rotate-6" />
					<span className="font-display font-semibold text-[15px] text-white">
						EventSchedulr
					</span>
				</Link>

				<nav className="hidden items-center gap-8 md:flex">
					{centerNav.map(({ label, href }) => (
						<a
							key={label}
							href={href}
							className="font-medium text-sm text-white/60 transition-colors hover:text-white"
						>
							{label}
						</a>
					))}
				</nav>

				<div className="flex items-center gap-2">
					<Link
						href="/join"
						className="hidden items-center rounded-xl px-4 py-2 font-medium text-sm text-white/70 transition-colors hover:text-white sm:inline-flex"
					>
						Join event
					</Link>
					<Link
						href="/auth"
						className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 font-semibold text-[#0b0b12] text-sm transition-all hover:bg-teal-100"
					>
						Sign in
					</Link>
				</div>
			</div>
		</header>
	);
}
