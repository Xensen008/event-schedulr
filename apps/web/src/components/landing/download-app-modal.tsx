"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, X } from "lucide-react";
import { AppDownloadQR } from "@/components/landing/app-download-qr";
import { LogoMark } from "@/components/landing/logo";
import { PhoneMock } from "@/components/landing/phone-mock";
import { ANDROID_APK_URL } from "@/lib/links";

export function DownloadAppModal({
	open,
	onClose,
}: {
	open: boolean;
	onClose: () => void;
}) {
	return (
		<AnimatePresence>
			{open && (
				<div className="fixed inset-0 z-[60] flex items-center justify-center">
					<motion.button
						type="button"
						aria-label="Close"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="absolute inset-0 cursor-default bg-black/85 backdrop-blur-sm"
					/>

					<motion.div
						initial={{ opacity: 0, y: 24, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 16, scale: 0.97 }}
						transition={{ duration: 0.35, ease: [0.21, 0.65, 0.36, 1] }}
						className="relative z-10 w-[92vw] max-w-[680px]"
					>
						<div
							className="relative overflow-hidden rounded-3xl border border-white/10 px-8 py-10 md:px-12"
							style={{
								background:
									"radial-gradient(70% 50% at 50% 0%, rgba(45,212,191,0.16) 0%, rgba(16,16,28,0.95) 60%), radial-gradient(60% 40% at 50% 100%, rgba(34,211,238,0.12) 0%, transparent 60%), linear-gradient(135deg, #12121c 0%, #08080f 100%)",
								boxShadow:
									"0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(45,212,191,0.2), 0 0 40px rgba(34,211,238,0.15)",
							}}
						>
							<div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
								<div
									className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full blur-3xl"
									style={{ background: "rgba(45,212,191,0.2)" }}
								/>
								<div
									className="absolute -bottom-28 left-8 h-56 w-56 rounded-full blur-3xl"
									style={{ background: "rgba(34,211,238,0.15)" }}
								/>
								<LogoMark className="absolute top-8 -right-10 h-40 w-40 opacity-[0.05]" />
								<LogoMark className="absolute -bottom-16 -left-12 h-44 w-44 rotate-12 opacity-[0.04]" />
							</div>

							<button
								type="button"
								onClick={onClose}
								aria-label="Close"
								className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
							>
								<X className="h-5 w-5" />
							</button>

							<div className="relative flex flex-col items-center text-center">
								<p className="font-semibold text-sm text-teal-300 uppercase tracking-wider">
									Almost there
								</p>
								<h2 className="mt-2 font-display font-semibold text-3xl text-white md:text-4xl">
									Get the EventSchedulr app
								</h2>
								<p className="mt-3 max-w-md text-sm text-white/55 md:text-base">
									Scan with your phone, or grab the .apk directly. Your events,
									polls and announcements, everywhere you go.
								</p>
							</div>

							<div className="relative mt-8 flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12">
								<div className="hidden h-[300px] w-[170px] items-center justify-center md:flex">
									<div className="origin-center scale-[0.52]">
										<PhoneMock />
									</div>
								</div>

								<div className="flex flex-col items-center gap-3">
									<AppDownloadQR value={ANDROID_APK_URL} size={180} />
									<p className="text-white/50 text-xs">
										Scan with your phone camera
									</p>
								</div>
							</div>

							<div className="relative mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
								<a
									href={ANDROID_APK_URL}
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-flex h-[52px] flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 font-semibold text-white shadow-[0_8px_40px_-8px_rgba(45,212,191,0.6)] transition-all hover:shadow-[0_8px_50px_-6px_rgba(34,211,238,0.75)] sm:max-w-[240px]"
								>
									<Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
									Download .apk
								</a>
								<button
									type="button"
									onClick={onClose}
									className="inline-flex h-[52px] flex-1 items-center justify-center rounded-2xl border border-white/12 bg-white/5 font-semibold text-white/80 transition hover:bg-white/10 hover:text-white sm:max-w-[240px]"
								>
									Continue to site
								</button>
							</div>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
