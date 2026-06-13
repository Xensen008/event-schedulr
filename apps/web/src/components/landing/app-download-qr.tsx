"use client";

import { QRCodeSVG } from "qrcode.react";
import { LogoMark } from "@/components/landing/logo";
import { cn } from "@/lib/utils";

export function AppDownloadQR({
	value,
	size = 184,
	className,
}: {
	value: string;
	size?: number;
	className?: string;
}) {
	const badge = Math.round(size * 0.24);

	return (
		<div
			className={cn("relative rounded-3xl bg-white p-5", className)}
			style={{ boxShadow: "0 12px 40px rgba(45, 212, 191, 0.3)" }}
		>
			<QRCodeSVG
				value={value}
				size={size}
				bgColor="#ffffff"
				fgColor="#08080f"
				level="H"
				marginSize={0}
			/>
			<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
				<LogoMark
					className="rounded-xl"
					style={{
						width: badge,
						height: badge,
						boxShadow: "0 0 0 4px #ffffff",
					}}
				/>
			</div>
		</div>
	);
}
