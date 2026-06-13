import { Bell, CalendarCheck2, Smartphone, Vote } from "lucide-react";
import { DownloadAppCta } from "@/components/landing/download-app-cta";
import { PhoneMock } from "@/components/landing/phone-mock";
import { Reveal } from "@/components/landing/reveal";

const highlights = [
	{
		icon: CalendarCheck2,
		title: "Your schedule in your pocket",
		description:
			"Personal agendas with session reminders, synced the second organizers change anything.",
	},
	{
		icon: Vote,
		title: "Vote from your seat",
		description:
			"Polls, word clouds and Q&A open right on the phone. No app-store hunting for attendees.",
	},
	{
		icon: Bell,
		title: "Announcements that arrive",
		description:
			"Room changed? Lunch early? Push it once and every attendee knows instantly.",
	},
];

export default function MobileApp() {
	return (
		<section id="mobile" className="mx-auto max-w-6xl px-6 py-28">
			<div className="grid items-center gap-16 lg:grid-cols-2">
				<Reveal>
					<span className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70">
						<Smartphone className="h-4 w-4 text-teal-300" />
						iOS & Android
					</span>
					<h2 className="mt-6 font-display font-semibold text-4xl text-white sm:text-5xl">
						The whole event,{" "}
						<span className="landing-gradient-text font-serif-accent">
							in every pocket
						</span>
					</h2>
					<p className="mt-5 max-w-lg text-lg text-white/50">
						EventSchedulr ships with a native companion app. Attendees scan your
						QR, land in the event, and everything stays in sync with the web in
						real time.
					</p>
					<div className="mt-10 flex flex-col gap-6">
						{highlights.map((highlight) => (
							<div key={highlight.title} className="flex gap-4">
								<div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-white/10 bg-white/5">
									<highlight.icon className="h-5 w-5 text-teal-300" />
								</div>
								<div>
									<h3 className="font-semibold text-white">
										{highlight.title}
									</h3>
									<p className="mt-1 text-sm text-white/50">
										{highlight.description}
									</p>
								</div>
							</div>
						))}
					</div>
					<div className="mt-10 flex flex-wrap items-center gap-4">
						<DownloadAppCta variant="button" />
						<span className="text-sm text-white/40">iOS build coming soon</span>
					</div>
				</Reveal>

				<Reveal delay={0.15} className="flex justify-center">
					<div className="relative">
						<div className="absolute inset-0 scale-110 rounded-full bg-teal-500/10 blur-3xl" />
						<PhoneMock />
					</div>
				</Reveal>
			</div>
		</section>
	);
}
