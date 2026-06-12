const phrases = [
	"Set up in minutes",
	"One code to join",
	"Real-time everything",
	"Polls that pop",
	"Agendas that adapt",
	"Feedback that lands",
	"Web, iOS and Android",
];

export default function Marquee() {
	const doubled = ["a", "b"].flatMap((copy) =>
		phrases.map((phrase) => ({ phrase, key: `${copy}-${phrase}` })),
	);

	return (
		<section className="relative border-white/5 border-y bg-white/[0.02] py-5">
			<div
				className="overflow-hidden"
				style={{
					maskImage:
						"linear-gradient(90deg, transparent, black 15%, black 85%, transparent)",
					WebkitMaskImage:
						"linear-gradient(90deg, transparent, black 15%, black 85%, transparent)",
				}}
			>
				<div className="marquee-track items-center gap-10">
					{doubled.map((item) => (
						<span
							key={item.key}
							className="flex items-center gap-10 whitespace-nowrap font-display font-medium text-lg text-white/35"
						>
							{item.phrase}
							<span className="h-1.5 w-1.5 rounded-full bg-teal-400/60" />
						</span>
					))}
				</div>
			</div>
		</section>
	);
}
