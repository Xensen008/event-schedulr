import {
	CalendarDays,
	ChevronRight,
	Home,
	Megaphone,
	Mic,
	Play,
	PlayCircle,
	User,
	Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
	{
		icon: Users,
		value: "482",
		label: "Participants",
		tint: "text-teal-300",
		bg: "bg-teal-400/15",
	},
	{
		icon: PlayCircle,
		value: "3",
		label: "Activities",
		tint: "text-emerald-300",
		bg: "bg-emerald-400/15",
	},
	{
		icon: Megaphone,
		value: "12",
		label: "Announcements",
		tint: "text-amber-300",
		bg: "bg-amber-400/15",
	},
];

const tabs = [
	{ icon: Home, label: "Home", active: true, badge: 0 },
	{ icon: CalendarDays, label: "Schedule", active: false, badge: 0 },
	{ icon: Play, label: "Live", active: false, badge: 2 },
	{ icon: Megaphone, label: "News", active: false, badge: 0 },
	{ icon: User, label: "Profile", active: false, badge: 0 },
];

export function PhoneMock({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				"glass-card relative w-[300px] rounded-[46px] border-white/15 p-2.5",
				className,
			)}
		>
			<div className="overflow-hidden rounded-[38px] bg-[#08080f]">
				<div className="flex items-center justify-between px-7 pt-4 pb-2">
					<span className="font-semibold text-white/90 text-xs">9:41</span>
					<span className="h-5 w-20 rounded-full bg-black" />
					<span className="font-semibold text-white/90 text-xs">5G</span>
				</div>

				<div className="px-4 pt-2 pb-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2.5">
							<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 font-bold text-[#062a26] text-sm">
								AR
							</div>
							<div>
								<span className="block text-[10px] text-white/45">
									Welcome back,
								</span>
								<span className="block font-semibold text-sm text-white">
									Aryan
								</span>
							</div>
						</div>
						<span className="flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-0.5 font-semibold text-[10px] text-emerald-300">
							<span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
							Live
						</span>
					</div>

					<div className="mt-3 rounded-2xl border border-white/6 bg-[#10101c] p-3">
						<span className="block font-bold text-sm text-white">
							Design Systems Summit
						</span>
						<span className="mt-0.5 block text-[11px] text-white/45">
							A day of talks, workshops and live design battles.
						</span>
					</div>

					<div className="mt-2.5 flex gap-2">
						{stats.map((stat) => (
							<div
								key={stat.label}
								className="flex flex-1 flex-col items-center rounded-2xl border border-white/6 bg-[#10101c] px-1 py-2.5"
							>
								<span
									className={`mb-1 flex h-7 w-7 items-center justify-center rounded-full ${stat.bg}`}
								>
									<stat.icon className={`h-3.5 w-3.5 ${stat.tint}`} />
								</span>
								<span className="font-bold text-sm text-white">
									{stat.value}
								</span>
								<span className="text-[8px] text-white/40">{stat.label}</span>
							</div>
						))}
					</div>

					<div className="mt-3.5 flex items-center gap-1.5">
						<span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
						<span className="font-semibold text-white text-xs">
							Happening Now
						</span>
					</div>
					<div className="mt-1.5 flex items-center gap-2.5 rounded-2xl border border-emerald-400/25 bg-[#10101c] p-3">
						<span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-400/15">
							<Play className="h-3.5 w-3.5 text-emerald-300" />
						</span>
						<div className="flex-1">
							<span className="block font-medium text-white text-xs">
								Poll: What's next?
							</span>
							<span className="text-[10px] text-emerald-300">
								Live now · 327 votes
							</span>
						</div>
						<ChevronRight className="h-3.5 w-3.5 text-white/35" />
					</div>

					<span className="mt-3.5 block font-semibold text-white text-xs">
						Coming Up
					</span>
					<div className="mt-1.5 flex items-center gap-2.5 rounded-2xl border border-white/6 bg-[#10101c] p-3">
						<span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-400/15">
							<Mic className="h-3.5 w-3.5 text-teal-300" />
						</span>
						<div className="flex-1">
							<span className="block font-medium text-white text-xs">
								Keynote: Ship faster
							</span>
							<span className="text-[10px] text-white/45">
								in 25m · Main Hall · Sarah Chen
							</span>
						</div>
						<ChevronRight className="h-3.5 w-3.5 text-white/35" />
					</div>
				</div>

				<div className="flex items-center justify-around border-white/6 border-t bg-[#0a0a12] px-3 pt-2.5 pb-5">
					{tabs.map((tab) => (
						<div
							key={tab.label}
							className="relative flex flex-col items-center gap-0.5"
						>
							<tab.icon
								className={`h-[18px] w-[18px] ${tab.active ? "text-teal-300" : "text-white/35"}`}
							/>
							{tab.badge > 0 && (
								<span className="absolute -top-1 -right-2 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-red-500 px-0.5 font-bold text-[8px] text-white">
									{tab.badge}
								</span>
							)}
							<span
								className={`text-[8px] ${tab.active ? "text-teal-300" : "text-white/35"}`}
							>
								{tab.label}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
