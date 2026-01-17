"use client";

import { api } from "@event-schedulr/backend/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import {
	Calendar,
	CalendarClock,
	Clock,
	FileText,
	MapPin,
	Sparkles,
	User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function CreateSchedulePage() {
	const router = useRouter();
	const currentEvent = useQuery(api.events.getCurrentEvent);
	const createSession = useMutation(api.schedule.createSession);

	const [formData, setFormData] = useState({
		title: "",
		description: "",
		date: "",
		startTime: "",
		endTime: "",
		location: "",
		speaker: "",
		type: "talk" as
			| "talk"
			| "workshop"
			| "break"
			| "meal"
			| "activity"
			| "ceremony"
			| "other",
		status: "upcoming" as
			| "postponed"
			| "upcoming"
			| "ongoing"
			| "completed"
			| "cancelled",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		if (!currentEvent) {
			toast.error("No current event selected");
			setIsSubmitting(false);
			return;
		}

		try {
			const date = new Date(formData.date);
			const startTimeStr = formData.startTime;
			const endTimeStr = formData.endTime;

			const [startHours, startMinutes] = startTimeStr.split(":").map(Number);
			const [endHours, endMinutes] = endTimeStr.split(":").map(Number);

			const startTime = new Date(date);
			startTime.setHours(startHours, startMinutes, 0, 0);

			const endTime = new Date(date);
			endTime.setHours(endHours, endMinutes, 0, 0);

			if (startTime >= endTime) {
				toast.error("Start time must be before end time");
				setIsSubmitting(false);
				return;
			}

			await createSession({
				eventId: currentEvent._id,
				title: formData.title,
				description: formData.description || undefined,
				date: date.getTime(),
				startTime: startTime.getTime(),
				endTime: endTime.getTime(),
				location: formData.location || undefined,
				speaker: formData.speaker || undefined,
				type: formData.type,
				status: formData.status,
			});

			toast.success("Session created successfully!");
			router.push("/schedule");
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Failed to create session",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (currentEvent === undefined) {
		return (
			<div className="eve w-full text-white">
				<div className="container mx-auto w-full space-y-6 py-10">
					<Card>
						<CardContent className="py-10 text-center">
							<p className="text-muted-foreground">Loading...</p>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	if (!currentEvent) {
		return (
			<div className="eve w-full text-white">
				<div className="container mx-auto w-full space-y-6 py-10">
					<Card>
						<CardContent className="py-16 text-center">
							<h3 className="mb-2 font-semibold text-lg">No current event</h3>
							<p className="mb-6 text-muted-foreground">
								Set a current event to create sessions
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="eve min-h-screen w-full text-white">
			<div className="container mx-auto w-full max-w-4xl space-y-6 px-4 py-10">
				<Card className="rounded-2xl border-none bg-transparent">
					<CardHeader>
						<div className="flex items-center gap-2">
							<Sparkles className="h-5 w-5" />
							<CardTitle>Create New Session</CardTitle>
						</div>
						<CardDescription>
							Add a new session to {currentEvent.name}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="space-y-2">
								<Label htmlFor="title" className="font-semibold text-lg">
									Session Title *
								</Label>
								<Input
									id="title"
									value={formData.title}
									onChange={(e) =>
										setFormData({ ...formData, title: e.target.value })
									}
									placeholder="Keynote: Future of Technology"
									className="h-12 rounded-xl text-base"
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="description" className="font-semibold text-lg">
									Description (optional)
								</Label>
								<Textarea
									id="description"
									value={formData.description}
									onChange={(e) =>
										setFormData({ ...formData, description: e.target.value })
									}
									placeholder="Session description..."
									className="min-h-[100px] rounded-xl text-base"
								/>
							</div>

							<div className="flex w-full items-center space-y-3 rounded-xl bg-bg-input p-4">
								<div className="flex w-full flex-col items-center gap-4">
									<div className="relative w-full max-w-md rounded-xl p-5 font-sans shadow-lg">
										<div className="absolute top-11 bottom-11 left-6.25 z-0 border-muted-foreground/30 border-l border-dashed" />

										<div className="relative z-10 mb-6 flex items-center justify-between">
											<div className="flex items-center gap-3">
												<div className="h-2.5 w-2.5 rounded-full bg-white" />
												<label className="font-medium text-text-primary">
													Start
												</label>
											</div>

											<div className="flex gap-2">
												<div className="group relative">
													<div className="flex items-center overflow-hidden rounded-lg border border-border/50 bg-bg-card transition-colors group-hover:border-white/10">
														<div className="min-w-22.5 border-border border-r px-3 py-1.5 text-center text-sm text-text-primary">
															{formData.date
																? new Date(formData.date).toLocaleDateString(
																		"en-GB",
																		{
																			weekday: "short",
																			day: "numeric",
																			month: "short",
																		},
																	)
																: "DD MMM"}
														</div>
													</div>
													<input
														type="date"
														value={formData.date}
														onChange={(e) =>
															setFormData({ ...formData, date: e.target.value })
														}
														className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:opacity-0"
														required
													/>
												</div>
												<div className="group relative">
													<div className="flex items-center overflow-hidden rounded-lg border border-border/50 bg-bg-card transition-colors group-hover:border-white/10">
														<div className="min-w-15 px-3 py-1.5 text-center text-sm text-text-primary">
															{formData.startTime || "--:--"}
														</div>
													</div>
													<input
														type="time"
														value={formData.startTime}
														onChange={(e) =>
															setFormData({
																...formData,
																startTime: e.target.value,
															})
														}
														className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:opacity-0"
														required
													/>
												</div>
											</div>
										</div>

										<div className="relative z-10 flex items-center justify-between">
											<div className="flex items-center gap-3">
												<div className="h-2.5 w-2.5 rounded-full border border-muted-foreground bg-bg-card" />
												<label className="font-medium text-text-primary">
													End
												</label>
											</div>

											<div className="flex gap-2">
												<div className="group relative">
													<div className="flex items-center overflow-hidden rounded-lg border border-border/50 bg-bg-card transition-colors group-hover:border-white/10">
														<div className="min-w-22.5 border-border border-r px-3 py-1.5 text-center text-sm text-text-primary">
															{formData.date
																? new Date(formData.date).toLocaleDateString(
																		"en-GB",
																		{
																			weekday: "short",
																			day: "numeric",
																			month: "short",
																		},
																	)
																: "DD MMM"}
														</div>
													</div>
													<input
														type="date"
														value={formData.date}
														onChange={(e) =>
															setFormData({ ...formData, date: e.target.value })
														}
														className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:opacity-0"
														required
													/>
												</div>
												<div className="group relative">
													<div className="flex items-center overflow-hidden rounded-lg border border-border/50 bg-bg-card transition-colors group-hover:border-white/10">
														<div className="min-w-15 px-3 py-1.5 text-center text-sm text-text-primary">
															{formData.endTime || "--:--"}
														</div>
													</div>
													<input
														type="time"
														value={formData.endTime}
														onChange={(e) =>
															setFormData({
																...formData,
																endTime: e.target.value,
															})
														}
														className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:opacity-0"
														required
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="grid gap-4 sm:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="location" className="text-base">
										Location (optional)
									</Label>
									<Input
										id="location"
										value={formData.location}
										onChange={(e) =>
											setFormData({ ...formData, location: e.target.value })
										}
										placeholder="Main Hall"
										className="rounded-xl"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="speaker" className="text-base">
										Speaker (optional)
									</Label>
									<Input
										id="speaker"
										value={formData.speaker}
										onChange={(e) =>
											setFormData({ ...formData, speaker: e.target.value })
										}
										placeholder="John Doe"
										className="rounded-xl"
									/>
								</div>
							</div>

							<div className="grid gap-4 sm:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="type" className="text-base">
										Session Type *
									</Label>
									<Select
										value={formData.type}
										onValueChange={(value: any) =>
											setFormData({ ...formData, type: value })
										}
									>
										<SelectTrigger className="rounded-xl">
											<SelectValue />
										</SelectTrigger>
										<SelectContent className="text-white">
											<SelectItem value="talk">Talk</SelectItem>
											<SelectItem value="workshop">Workshop</SelectItem>
											<SelectItem value="break">Break</SelectItem>
											<SelectItem value="meal">Meal</SelectItem>
											<SelectItem value="activity">Activity</SelectItem>
											<SelectItem value="ceremony">Ceremony</SelectItem>
											<SelectItem value="other">Other</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="status" className="text-base">
										Status *
									</Label>
									<Select
										value={formData.status}
										onValueChange={(value: any) =>
											setFormData({ ...formData, status: value })
										}
									>
										<SelectTrigger className="rounded-xl">
											<SelectValue />
										</SelectTrigger>
										<SelectContent className="text-white">
											<SelectItem value="upcoming">Upcoming</SelectItem>
											<SelectItem value="ongoing">Ongoing</SelectItem>
											<SelectItem value="completed">Completed</SelectItem>
											<SelectItem value="postponed">Postponed</SelectItem>
											<SelectItem value="cancelled">Cancelled</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<Button
								type="submit"
								disabled={isSubmitting}
								className="w-full rounded-xl py-5 text-lg"
							>
								{isSubmitting ? "Creating Session..." : "Create Session"}
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
