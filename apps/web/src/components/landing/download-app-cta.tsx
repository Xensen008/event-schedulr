"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import { DownloadAppModal } from "@/components/landing/download-app-modal";

export function DownloadAppCta({
	variant = "button",
}: {
	variant?: "pill" | "button";
}) {
	const [open, setOpen] = useState(false);

	return (
		<>
			{variant === "pill" ? (
				<button
					type="button"
					onClick={() => setOpen(true)}
					className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60 backdrop-blur transition-colors hover:border-teal-400/40 hover:text-white"
				>
					<Download className="h-4 w-4 text-teal-300 transition-transform group-hover:-translate-y-0.5" />
					Download the Android app
					<span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10px] text-white/50">
						.apk
					</span>
				</button>
			) : (
				<button
					type="button"
					onClick={() => setOpen(true)}
					className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-[0_8px_40px_-8px_rgba(45,212,191,0.6)] transition-all hover:shadow-[0_8px_50px_-6px_rgba(34,211,238,0.75)]"
				>
					<Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
					Download for Android
					<span className="rounded-full bg-black/20 px-2 py-0.5 font-mono text-[10px] text-white/80">
						.apk
					</span>
				</button>
			)}
			<DownloadAppModal open={open} onClose={() => setOpen(false)} />
		</>
	);
}
