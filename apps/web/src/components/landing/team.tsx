"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Reveal } from "@/components/landing/reveal";

const team = [
	{
		name: "Arnab",
		image: "https://avatars.githubusercontent.com/u/106694416?s=260&v=4",
		link: "https://github.com/Xensen008",
	},
	{
		name: "Aryan",
		image: "https://avatars.githubusercontent.com/u/123343302?s=260&v=4",
		link: "https://github.com/codiearyan",
	},
	{
		name: "Alecx",
		image: "https://avatars.githubusercontent.com/u/150958558?s=260&v=4",
		link: "https://github.com/Alecx2004",
	},
	{
		name: "Arjun",
		image: "https://avatars.githubusercontent.com/u/144615229?s=260&v=4",
		link: "https://github.com/Arjun-Bhandari",
	},
	{
		name: "Anurag",
		image: "https://avatars.githubusercontent.com/u/172275420?s=260&v=4",
		link: "https://github.com/AnuragBaruah47",
	},
];

export default function Team() {
	return (
		<section
			id="team"
			className="relative border-white/5 border-t bg-white/[0.015] py-28"
		>
			<div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
				<Reveal className="flex flex-col items-center">
					<span className="font-mono text-sm text-teal-300 uppercase tracking-[0.2em]">
						Berojgaar Engineers
					</span>
					<h2 className="mt-4 font-display font-semibold text-4xl text-white sm:text-5xl">
						Brains behind the{" "}
						<span className="landing-gradient-text font-serif-accent">
							scenes
						</span>
					</h2>
					<p className="mt-4 max-w-md text-lg text-white/50">
						Five engineers, one shared calendar, far too many midnight deploys.
					</p>
				</Reveal>

				<div className="mt-14 flex flex-wrap items-end justify-center gap-5 sm:gap-7">
					{team.map((member, index) => (
						<Reveal key={member.name} delay={index * 0.08}>
							<Link
								href={member.link}
								target="_blank"
								rel="noopener noreferrer"
								className="group flex flex-col items-center gap-3"
							>
								<motion.img
									src={member.image}
									alt={member.name}
									whileHover={{ scale: 1.12, rotate: -3 }}
									transition={{ type: "spring", stiffness: 300, damping: 18 }}
									className="h-24 w-24 rounded-2xl border border-white/10 object-cover grayscale transition-all duration-300 group-hover:border-teal-400/60 group-hover:shadow-[0_0_40px_-10px_rgba(45,212,191,0.7)] group-hover:grayscale-0 sm:h-28 sm:w-28"
								/>
								<span className="font-medium text-sm text-white/40 transition-colors group-hover:text-white">
									{member.name}
								</span>
							</Link>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
