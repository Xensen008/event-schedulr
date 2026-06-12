import { Lock, Megaphone, Radio, Share2, Users } from "lucide-react";
import { LogoMark } from "@/components/landing/logo";

const dashboardTabs = [
	{ label: "Overview", active: true },
	{ label: "Participants", active: false },
	{ label: "Live Activities", active: false },
	{ label: "Announcements", active: false },
	{ label: "Schedule", active: false },
	{ label: "Feedback", active: false },
];

const scheduleRows = [
	{
		time: "10:00",
		title: "Doors open + coffee",
		accent: "bg-emerald-400",
		status: "Done",
		statusClass: "bg-white/8 text-white/45",
	},
	{
		time: "10:30",
		title: "Keynote: Ship faster",
		accent: "bg-teal-400",
		status: "Live",
		statusClass: "bg-emerald-400/15 text-emerald-300",
	},
	{
		time: "11:15",
		title: "Live Q&A panel",
		accent: "bg-cyan-300",
		status: "Up next",
		statusClass: "bg-teal-400/15 text-teal-300",
	},
	{
		time: "12:00",
		title: "Lunch + networking",
		accent: "bg-amber-400",
		status: "12:00 PM",
		statusClass: "bg-white/8 text-white/45",
	},
];

const pollOptions = [
	{ label: "Panel discussion", percent: 62 },
	{ label: "Lightning talks", percent: 27 },
	{ label: "Open networking", percent: 11 },
];

const avatars = [
	{ initials: "SK", gradient: "from-rose-400 to-orange-300" },
	{ initials: "MJ", gradient: "from-teal-400 to-sky-300" },
	{ initials: "PT", gradient: "from-emerald-400 to-teal-300" },
];

export function DashboardMock() {
	return (
		<div className="overflow-hidden rounded-2xl border border-white/10 bg-[#08080f] text-left shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]">
			<div className="flex items-center gap-3 border-white/6 border-b bg-[#0d0d15] px-4 py-2.5">
				<div className="flex gap-1.5">
					<span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
					<span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
					<span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
				</div>
				<div className="mx-auto flex w-full max-w-sm items-center justify-center gap-1.5 rounded-lg bg-white/5 px-3 py-1 text-white/45 text-xs">
					<Lock className="h-3 w-3" />
					eventschedulr.app/events/design-systems-summit
				</div>
				<span className="w-10" />
			</div>

			<div className="flex items-center justify-between border-white/6 border-b px-5 py-3.5">
				<div className="flex items-center gap-3">
					<LogoMark className="h-7 w-7" />
					<div>
						<span className="flex items-center gap-2 font-semibold text-sm text-white">
							Design Systems Summit
							<span className="flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-0.5 font-semibold text-[10px] text-emerald-300">
								<span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
								Live
							</span>
						</span>
						<span className="text-[11px] text-white/40">
							Sat, Jul 18 · Bangalore + Online
						</span>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<div className="hidden -space-x-2 sm:flex">
						{avatars.map((person) => (
							<div
								key={person.initials}
								className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0c0c14] bg-gradient-to-br font-semibold text-[9px] text-white ${person.gradient}`}
							>
								{person.initials}
							</div>
						))}
					</div>
					<span className="flex items-center gap-1.5 rounded-xl bg-teal-500/90 px-3.5 py-1.5 font-semibold text-[#04201c] text-xs">
						<Share2 className="h-3 w-3" />
						Share event
					</span>
				</div>
			</div>

			<div className="flex gap-1 overflow-hidden border-white/6 border-b px-5">
				{dashboardTabs.map((tab) => (
					<span
						key={tab.label}
						className={`whitespace-nowrap border-b-2 px-3 py-2.5 font-medium text-xs ${
							tab.active
								? "border-teal-400 text-white"
								: "border-transparent text-white/40"
						}`}
					>
						{tab.label}
					</span>
				))}
			</div>

			<div className="grid gap-4 bg-[#08080f] p-5 lg:grid-cols-[1.6fr_1fr]">
				<div>
					<div className="mb-3 flex items-center justify-between">
						<span className="font-semibold text-sm text-white">
							Today's schedule
						</span>
						<span className="text-[11px] text-teal-300">View all</span>
					</div>
					<div className="flex flex-col gap-2">
						{scheduleRows.map((row) => (
							<div
								key={row.time}
								className="flex items-center gap-3.5 rounded-xl border border-white/6 bg-[#10101c] px-3.5 py-2.5"
							>
								<span className="w-10 font-mono text-white/40 text-xs">
									{row.time}
								</span>
								<span className={`h-5 w-1 rounded-full ${row.accent}`} />
								<span className="flex-1 font-medium text-sm text-white/85">
									{row.title}
								</span>
								<span
									className={`rounded-full px-2 py-0.5 font-medium text-[10px] ${row.statusClass}`}
								>
									{row.status}
								</span>
							</div>
						))}
					</div>
				</div>

				<div className="flex flex-col gap-3">
					<div className="rounded-xl border border-white/6 bg-[#10101c] p-4">
						<div className="flex items-center justify-between">
							<span className="font-semibold text-white text-xs">
								What's next?
							</span>
							<span className="flex items-center gap-1 rounded-full bg-rose-500/15 px-2 py-0.5 font-semibold text-[9px] text-rose-300 uppercase tracking-wide">
								<span className="live-dot h-1 w-1 rounded-full bg-rose-400" />
								Live
							</span>
						</div>
						<div className="mt-2.5 flex flex-col gap-2">
							{pollOptions.map((option) => (
								<div key={option.label}>
									<div className="flex justify-between text-[10px] text-white/60">
										<span>{option.label}</span>
										<span>{option.percent}%</span>
									</div>
									<div className="mt-0.5 h-1 overflow-hidden rounded-full bg-white/10">
										<div
											className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-300"
											style={{ width: `${option.percent}%` }}
										/>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<div className="rounded-xl border border-white/6 bg-[#10101c] p-3.5">
							<Users className="h-4 w-4 text-teal-300" />
							<span className="mt-1.5 block font-bold text-lg text-white">
								482
							</span>
							<span className="text-[10px] text-white/40">Checked in</span>
						</div>
						<div className="rounded-xl border border-white/6 bg-[#10101c] p-3.5">
							<Megaphone className="h-4 w-4 text-amber-300" />
							<span className="mt-1.5 block font-bold text-lg text-white">
								12
							</span>
							<span className="text-[10px] text-white/40">Announcements</span>
						</div>
					</div>
					<div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/8 px-3.5 py-2.5">
						<Radio className="live-dot h-3.5 w-3.5 text-emerald-300" />
						<span className="text-[11px] text-emerald-200">
							327 attendees voting in real time
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
