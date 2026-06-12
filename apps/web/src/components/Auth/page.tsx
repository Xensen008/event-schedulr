"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SignInForm from "@/components/Auth/sign-in-form";
import SignUpForm from "@/components/Auth/sign-up-form";
import WelcomeMessage from "@/components/Auth/welcome-message";

export default function AuthPage() {
	const [isSignUp, setIsSignUp] = useState(true);

	return (
		<div className="landing eve relative flex min-h-screen overflow-hidden">
			<div className="aurora" />
			<div className="grid-texture absolute inset-0" />
			<div className="noise-overlay" />
			{/* FORM PANEL */}
			<motion.div
				className={`absolute inset-y-0 z-10 flex w-full items-center justify-center p-6 lg:w-1/2 lg:p-10 ${
					isSignUp ? "lg:justify-end" : "lg:justify-start"
				}`}
				animate={{
					x: isSignUp ? "0%" : "100%",
				}}
				transition={{
					duration: 0.6,
					ease: [0.4, 0, 0.2, 1],
				}}
			>
				<div className="w-full max-w-md">
					{isSignUp ? (
						<SignUpForm onSwitchToSignIn={() => setIsSignUp(false)} />
					) : (
						<SignInForm onSwitchToSignUp={() => setIsSignUp(true)} />
					)}
				</div>
			</motion.div>

			{/* WELCOME PANEL */}
			<motion.div
				className={`absolute inset-y-0 flex w-full items-center justify-center p-12 lg:w-1/2 lg:p-10 ${
					isSignUp ? "lg:justify-start" : "lg:justify-end"
				}`}
				animate={{
					x: isSignUp ? "100%" : "0%",
				}}
				transition={{
					duration: 0.6,
					ease: [0.4, 0, 0.2, 1],
				}}
			>
				<WelcomeMessage mode={isSignUp ? "signup" : "signin"} />
			</motion.div>
		</div>
	);
}
