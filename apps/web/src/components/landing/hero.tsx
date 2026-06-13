"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DashboardMock } from "@/components/landing/dashboard-mock";
import { DownloadAppCta } from "@/components/landing/download-app-cta";
import { PhoneMock } from "@/components/landing/phone-mock";

const easing = [0.21, 0.65, 0.36, 1] as const;

const attendees = [
	{ initials: "SK", gradient: "from-rose-400 to-orange-300" },
	{ initials: "MJ", gradient: "from-teal-400 to-sky-300" },
	{ initials: "PT", gradient: "from-emerald-400 to-teal-300" },
	{ initials: "RA", gradient: "from-amber-400 to-yellow-300" },
];

export default function Hero() {
	const router = useRouter();
	const [code, setCode] = useState("");

	const joinWithCode = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (code.trim()) {
			router.push(`/join?code=${encodeURIComponent(code.trim())}`);
		}
	};

	return (
		<section className="relative overflow-hidden pt-36 pb-24 sm:pt-44">
			<div className="aurora" />
			<div className="hero-spotlight" />
			<div className="grid-texture absolute inset-0" />
			<div className="noise-overlay" />

			<div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
				<motion.h1
					initial={{ opacity: 0, y: 28 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.08, ease: easing }}
					className="max-w-4xl font-display font-semibold text-[clamp(3rem,7vw,5.5rem)] text-white leading-[1.02] tracking-tight"
				>
					Events that{" "}
					<span className="shimmer-text pr-2 font-serif-accent">flow.</span>
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.18, ease: easing }}
					className="mt-6 max-w-xl text-balance text-lg text-white/55 sm:text-xl"
				>
					Build the event page, share one code, run the whole show live.
					Agendas, polls and announcements that reach every attendee in real
					time.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.28, ease: easing }}
					className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
				>
					<Link
						href="/auth"
						className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 px-7 py-3.5 font-semibold text-white shadow-[0_8px_40px_-8px_rgba(45,212,191,0.65)] transition-all hover:shadow-[0_8px_50px_-6px_rgba(34,211,238,0.8)]"
					>
						<span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
						Create your event
						<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Link>
					<form
						onSubmit={joinWithCode}
						className="flex items-center rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur transition-colors focus-within:border-teal-400/50"
					>
						<input
							value={code}
							onChange={(event) => setCode(event.target.value)}
							placeholder="EVENT-CODE"
							className="w-36 bg-transparent px-3 font-mono font-semibold text-sm text-white tracking-widest placeholder:text-white/30"
						/>
						<button
							type="submit"
							className="rounded-xl bg-white/10 px-4 py-2 font-semibold text-sm text-white transition-colors hover:bg-white/20"
						>
							Join
						</button>
					</form>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.38 }}
					className="mt-5"
				>
					<DownloadAppCta variant="pill" />
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 0.45 }}
					className="mt-8 flex items-center gap-4"
				>
					<div className="flex -space-x-2">
						{attendees.map((person) => (
							<div
								key={person.initials}
								className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#08080d] bg-gradient-to-br font-semibold text-[10px] text-white ${person.gradient}`}
							>
								{person.initials}
							</div>
						))}
					</div>
					<p className="text-sm text-white/40">
						<span className="font-semibold text-white/75">1,200+ events</span>{" "}
						run live with EventSchedulr
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 56 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1.1, delay: 0.5, ease: easing }}
					className="relative mt-20 w-full"
				>
					<div className="absolute -inset-x-10 -top-10 bottom-0 rounded-[40px] bg-teal-500/8 blur-3xl" />

					<div className="relative lg:pr-40">
						<DashboardMock />
					</div>

					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 0.75, ease: easing }}
						className="absolute right-0 -bottom-12 hidden origin-bottom-right scale-[0.82] lg:block"
					>
						<div className="float-slow">
							<PhoneMock className="shadow-[0_40px_90px_-20px_rgba(0,0,0,0.85)]" />
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
