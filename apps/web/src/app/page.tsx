import type { Metadata } from "next";
import Features from "@/components/landing/features";
import FooterCta from "@/components/landing/footer-cta";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import Marquee from "@/components/landing/marquee";
import MobileApp from "@/components/landing/mobile-app";
import Team from "@/components/landing/team";
import PublicHeader from "@/components/public-header";

export const metadata: Metadata = {
	title: "EventSchedulr — Events that flow, schedules that work",
	description:
		"Create beautiful event pages, share one code, and run the whole show live with real-time agendas, polls, leaderboards and feedback.",
};

export default function HomePage() {
	return (
		<main className="landing min-h-screen antialiased">
			<PublicHeader />
			<Hero />
			<Marquee />
			<Features />
			<HowItWorks />
			<MobileApp />
			<Team />
			<FooterCta />
		</main>
	);
}
