import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { LogoMark } from "@/components/landing/logo";
import { Reveal } from "@/components/landing/reveal";

export default function FooterCta() {
	return (
		<footer className="relative px-6 pt-28 pb-10">
			<Reveal className="mx-auto max-w-5xl">
				<div className="glass-card relative overflow-hidden rounded-[36px] px-8 py-16 text-center sm:py-20">
					<div className="aurora" />
					<div className="relative flex flex-col items-center">
						<h2 className="max-w-2xl font-display font-semibold text-4xl text-white sm:text-5xl">
							Your next event starts{" "}
							<span className="landing-gradient-text font-serif-accent">
								here
							</span>
						</h2>
						<p className="mt-4 max-w-md text-lg text-white/55">
							Free to start. Set up your first event before your coffee finishes
							brewing.
						</p>
						<div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
							<Link
								href="/auth"
								className="group inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-semibold text-[#0b0b12] transition-all hover:bg-teal-100"
							>
								Get started free
								<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>
							<Link
								href="/join"
								className="inline-flex items-center rounded-2xl border border-white/15 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/5"
							>
								Join an event
							</Link>
						</div>
					</div>
				</div>
			</Reveal>

			<div className="mx-auto mt-16 flex max-w-5xl flex-col items-center justify-between gap-6 border-white/5 border-t pt-8 sm:flex-row">
				<div className="flex items-center gap-2.5">
					<LogoMark className="h-7 w-7" />
					<span className="font-display font-semibold text-sm text-white">
						EventSchedulr
					</span>
				</div>
				<nav className="flex items-center gap-7 text-sm text-white/45">
					<a href="#features" className="transition-colors hover:text-white">
						Features
					</a>
					<a
						href="#how-it-works"
						className="transition-colors hover:text-white"
					>
						How it works
					</a>
					<a href="#team" className="transition-colors hover:text-white">
						Team
					</a>
				</nav>
				<span className="text-sm text-white/35">
					© 2026 EventSchedulr. Built live, like everything else.
				</span>
			</div>
		</footer>
	);
}
