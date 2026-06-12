import { motion } from "framer-motion";
import { LogoMark } from "@/components/landing/logo";

interface WelcomeMessageProps {
	mode: "signin" | "signup";
}

const container = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.12,
		},
	},
};

const item = {
	hidden: { opacity: 0, y: 14 },
	show: { opacity: 1, y: 0 },
};

export default function WelcomeMessage({ mode }: WelcomeMessageProps) {
	const isSignUp = mode === "signup";

	return (
		<motion.div
			key={mode}
			variants={container}
			initial="hidden"
			animate="show"
			className="max-w-md space-y-10 text-left text-white"
		>
			{/* Logo / Icon */}
			<motion.div variants={item} className="flex items-center space-x-3">
				<LogoMark className="h-11 w-11" />
				<span className="font-display font-semibold text-xl tracking-wide">
					EventSchedulr
				</span>
			</motion.div>

			{/* Heading */}
			<motion.div variants={item} className="space-y-4">
				<h1 className="font-bold text-4xl leading-tight lg:text-5xl">
					{isSignUp ? "Plan Events Without Chaos" : "Welcome Back, Organizer"}
				</h1>
				<p className="text-blue-100 text-lg">
					{isSignUp
						? "Create, schedule, and manage events with clarity and confidence."
						: "Pick up where you left off and keep your events running smoothly."}
				</p>
			</motion.div>

			{/* Feature list */}
			<motion.div variants={container} className="space-y-5">
				{(isSignUp
					? [
							[
								"Smart Scheduling",
								"Avoid conflicts with intelligent timelines",
							],
							["Attendee Management", "Track guests, RSVPs, and check-ins"],
							["Real-Time Updates", "Instant changes across all devices"],
						]
					: [
							["Upcoming Events", "View schedules at a glance"],
							["Live Adjustments", "Edit agendas in real time"],
							["Team Coordination", "Collaborate with staff & speakers"],
						]
				).map(([title, desc]) => (
					<motion.div
						key={title}
						variants={item}
						className="flex items-start space-x-4"
					>
						<span className="mt-1 text-xl">✔</span>
						<div>
							<h3 className="font-semibold">{title}</h3>
							<p className="text-blue-100 text-sm">{desc}</p>
						</div>
					</motion.div>
				))}
			</motion.div>

			{/* Social proof / trust */}
			<motion.div
				variants={item}
				className="border-white/20 border-t pt-6 text-blue-100 text-sm"
			>
				Trusted by event organizers, conferences, and communities worldwide
			</motion.div>
		</motion.div>
	);
}
