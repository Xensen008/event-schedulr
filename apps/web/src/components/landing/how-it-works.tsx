import { Reveal } from "@/components/landing/reveal";

const steps = [
	{
		number: "01",
		title: "Create your event",
		description:
			"Pick a cover, set the agenda, add speakers and sessions. Your event page is live in minutes, not days.",
	},
	{
		number: "02",
		title: "Share one code",
		description:
			"Every event gets a short code and QR. Attendees join from any device with zero sign-up friction.",
	},
	{
		number: "03",
		title: "Run the show live",
		description:
			"Launch polls, push announcements, crown leaderboard winners and collect feedback while the room is still buzzing.",
	},
];

export default function HowItWorks() {
	return (
		<section
			id="how-it-works"
			className="relative border-white/5 border-y bg-white/[0.015] py-28"
		>
			<div className="mx-auto max-w-6xl px-6">
				<Reveal className="flex flex-col items-center text-center">
					<span className="font-mono text-sm text-teal-300 uppercase tracking-[0.2em]">
						How it works
					</span>
					<h2 className="mt-4 font-display font-semibold text-4xl text-white sm:text-5xl">
						Three steps to{" "}
						<span className="landing-gradient-text font-serif-accent">
							showtime
						</span>
					</h2>
				</Reveal>

				<div className="mt-16 grid gap-10 md:grid-cols-3">
					{steps.map((step, index) => (
						<Reveal key={step.number} delay={index * 0.12}>
							<div className="relative">
								<span className="block bg-gradient-to-b from-white/25 to-white/0 bg-clip-text font-bold font-display text-7xl text-transparent">
									{step.number}
								</span>
								<div className="relative -mt-5">
									<h3 className="font-display font-semibold text-white text-xl">
										{step.title}
									</h3>
									<p className="mt-3 text-white/50 leading-relaxed">
										{step.description}
									</p>
								</div>
								{index < steps.length - 1 && (
									<div className="absolute top-7 right-0 hidden h-px w-16 translate-x-1/2 bg-gradient-to-r from-white/20 to-transparent md:block" />
								)}
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
