import {
	BarChart3,
	CalendarRange,
	Crown,
	MessageSquareText,
	QrCode,
	Trophy,
} from "lucide-react";
import { Reveal } from "@/components/landing/reveal";

const scheduleRows = [
	{ time: "10:00", title: "Doors open + coffee", accent: "bg-sky-400" },
	{ time: "10:30", title: "Keynote: Ship faster", accent: "bg-teal-400" },
	{ time: "11:15", title: "Live Q&A panel", accent: "bg-cyan-300" },
	{ time: "12:00", title: "Lunch + networking", accent: "bg-emerald-400" },
];

const podium = [
	{
		rank: 2,
		name: "Dev K.",
		points: "2,310",
		initials: "DK",
		avatar: "from-sky-400 to-cyan-300",
		height: "h-16",
		bar: "border-white/10 bg-white/[0.06]",
		rankClass: "text-white/50",
	},
	{
		rank: 1,
		name: "Priya S.",
		points: "2,840",
		initials: "PS",
		avatar: "from-amber-400 to-yellow-300",
		height: "h-24",
		bar: "border-amber-400/30 bg-gradient-to-b from-amber-400/25 to-amber-400/5",
		rankClass: "text-amber-300",
	},
	{
		rank: 3,
		name: "Maya R.",
		points: "1,995",
		initials: "MR",
		avatar: "from-emerald-400 to-teal-300",
		height: "h-11",
		bar: "border-white/10 bg-white/[0.06]",
		rankClass: "text-white/50",
	},
];

const qrPattern = [
	1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1,
	0, 1, 0, 1, 1, 0, 0, 1, 1, 1,
].map((cell, index) => ({ cell, id: `qr-${index}` }));

const pollBars = [35, 60, 95, 45, 75, 55, 85].map((height, index) => ({
	height,
	id: `bar-${index}`,
}));

export default function Features() {
	return (
		<section id="features" className="relative mx-auto max-w-6xl px-6 py-28">
			<Reveal className="flex flex-col items-center text-center">
				<span className="font-mono text-sm text-teal-300 uppercase tracking-[0.2em]">
					The toolkit
				</span>
				<h2 className="mt-4 max-w-2xl font-display font-semibold text-4xl text-white sm:text-5xl">
					Everything you need to run a{" "}
					<span className="landing-gradient-text font-serif-accent">great</span>{" "}
					event
				</h2>
				<p className="mt-4 max-w-xl text-lg text-white/50">
					From the first invite to the final feedback form, one place for the
					whole lifecycle.
				</p>
			</Reveal>

			<div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6">
				<Reveal className="md:col-span-4">
					<div className="glass-card group h-full rounded-3xl p-7 transition-colors hover:border-teal-400/30">
						<CalendarRange className="h-6 w-6 text-teal-300" />
						<h3 className="mt-4 font-display font-semibold text-white text-xl">
							Schedules that build themselves
						</h3>
						<p className="mt-2 max-w-md text-white/50">
							Drag sessions into place, attach speakers, and let every change
							sync instantly to all attendees. No re-printed agendas, ever.
						</p>
						<div className="mt-6 flex flex-col gap-2">
							{scheduleRows.map((row) => (
								<div
									key={row.time}
									className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-2.5 transition-transform duration-300 group-hover:translate-x-1"
								>
									<span className="font-mono text-sm text-white/40">
										{row.time}
									</span>
									<span className={`h-5 w-1 rounded-full ${row.accent}`} />
									<span className="font-medium text-sm text-white/80">
										{row.title}
									</span>
								</div>
							))}
						</div>
					</div>
				</Reveal>

				<Reveal delay={0.1} className="md:col-span-2">
					<div className="glass-card h-full rounded-3xl p-7 transition-colors hover:border-cyan-300/30">
						<BarChart3 className="h-6 w-6 text-cyan-300" />
						<h3 className="mt-4 font-display font-semibold text-white text-xl">
							Live polls & word clouds
						</h3>
						<p className="mt-2 text-white/50">
							Ask the room anything. Watch answers roll in on the big screen.
						</p>
						<div className="mt-6 flex h-24 items-end gap-2">
							{pollBars.map((bar) => (
								<div
									key={bar.id}
									className="flex-1 rounded-t-md bg-gradient-to-t from-teal-500/40 to-cyan-300"
									style={{ height: `${bar.height}%` }}
								/>
							))}
						</div>
					</div>
				</Reveal>

				<Reveal delay={0.05} className="md:col-span-2">
					<div className="glass-card h-full rounded-3xl p-7 transition-colors hover:border-emerald-400/30">
						<QrCode className="h-6 w-6 text-emerald-300" />
						<h3 className="mt-4 font-display font-semibold text-white text-xl">
							One code to join
						</h3>
						<p className="mt-2 text-white/50">
							Share a QR or a short code. Attendees are in before the coffee
							gets cold.
						</p>
						<div className="mt-6 flex items-center gap-4">
							<div className="grid h-16 w-16 grid-cols-6 gap-[2px] rounded-xl bg-white p-2">
								{qrPattern.map((item) => (
									<span
										key={item.id}
										className={`rounded-[1px] ${item.cell ? "bg-[#0b0b12]" : "bg-transparent"}`}
									/>
								))}
							</div>
							<span className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-bold font-mono text-white tracking-[0.2em]">
								TX4-92K
							</span>
						</div>
					</div>
				</Reveal>

				<Reveal delay={0.1} className="md:col-span-2">
					<div className="glass-card h-full rounded-3xl p-7 transition-colors hover:border-amber-400/30">
						<Trophy className="h-6 w-6 text-amber-300" />
						<h3 className="mt-4 font-display font-semibold text-white text-xl">
							Leaderboards
						</h3>
						<p className="mt-2 text-white/50">
							Turn participation into a sport with live points and rankings.
						</p>
						<div className="mt-6 flex items-end justify-center gap-2.5">
							{podium.map((entry) => (
								<div
									key={entry.rank}
									className="flex w-20 flex-col items-center gap-1.5"
								>
									{entry.rank === 1 && (
										<Crown className="h-4 w-4 text-amber-300" />
									)}
									<div
										className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br font-bold text-[#101019] text-[11px] ${entry.avatar}`}
									>
										{entry.initials}
									</div>
									<span className="font-medium text-[11px] text-white/75">
										{entry.name}
									</span>
									<div
										className={`flex w-full flex-col items-center justify-start rounded-t-xl border border-b-0 pt-2 ${entry.height} ${entry.bar}`}
									>
										<span
											className={`font-bold font-display text-lg ${entry.rankClass}`}
										>
											{entry.rank}
										</span>
										<span className="font-mono text-[9px] text-white/40">
											{entry.points} pts
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</Reveal>

				<Reveal delay={0.15} className="md:col-span-2">
					<div className="glass-card h-full rounded-3xl p-7 transition-colors hover:border-sky-400/30">
						<MessageSquareText className="h-6 w-6 text-sky-300" />
						<h3 className="mt-4 font-display font-semibold text-white text-xl">
							Announcements & feedback
						</h3>
						<p className="mt-2 text-white/50">
							Push updates mid-event and collect ratings before anyone leaves
							the room.
						</p>
						<div className="mt-6 flex flex-col gap-2.5">
							<div className="w-fit max-w-full rounded-2xl rounded-bl-md border border-white/5 bg-white/[0.05] px-4 py-2 text-sm text-white/75">
								Lunch is served on Level 2 🍕
							</div>
							<div className="ml-auto w-fit rounded-2xl rounded-br-md bg-teal-500/25 px-4 py-2 text-sm text-teal-100">
								Keynote was 🔥 — 4.9/5 from 213 ratings
							</div>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
