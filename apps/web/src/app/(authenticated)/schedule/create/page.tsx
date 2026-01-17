"use client";

import { api } from "@event-schedulr/backend/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import {
	Calendar,
	CalendarClock,
	Clock,
	FileText,
	MapPin,
	User,
	Sparkles,
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
				<div className="mx-auto container w-full space-y-6 py-10">
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
			<div className="eve w-full text-white ">
				<div className="mx-auto container w-full space-y-6 py-10">
					<Card>
						<CardContent className="py-16 text-center">
							<h3 className="mb-2 text-lg font-semibold">No current event</h3>
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
		<div className="eve w-full text-white min-h-screen">
			<div className="mx-auto container w-full max-w-2xl space-y-6 py-10 px-4">
				<Card className="rounded-4xl ">
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
								<Label htmlFor="title">
									<FileText className="mr-2 inline h-4 w-4" />
									Session Title *
								</Label>
								<Input
									id="title"
									value={formData.title}
									onChange={(e) =>
										setFormData({ ...formData, title: e.target.value })
									}
									placeholder="Keynote: Future of Technology"
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="description">
									<FileText className="mr-2 inline h-4 w-4" />
									Description (optional)
								</Label>
								<Textarea
									id="description"
									value={formData.description}
									onChange={(e) =>
										setFormData({ ...formData, description: e.target.value })
									}
									placeholder="Session description..."
									className="min-h-[100px]"
								/>
							</div>

							<div className="grid gap-4 sm:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="date">
										<Calendar className="mr-2 inline h-4 w-4" />
										Date *
									</Label>
									<Input
										id="date"
										type="date"
										value={formData.date}
										onChange={(e) =>
											setFormData({ ...formData, date: e.target.value })
										}
										required
									/>
								</div>
							</div>

							<div className="grid gap-4 sm:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="startTime">
										<Clock className="mr-2 inline h-4 w-4" />
										Start Time *
									</Label>
									<Input
										id="startTime"
										type="time"
										value={formData.startTime}
										onChange={(e) =>
											setFormData({ ...formData, startTime: e.target.value })
										}
										required
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="endTime">
										<CalendarClock className="mr-2 inline h-4 w-4" />
										End Time *
									</Label>
									<Input
										id="endTime"
										type="time"
										value={formData.endTime}
										onChange={(e) =>
											setFormData({ ...formData, endTime: e.target.value })
										}
										required
									/>
								</div>
							</div>

							<div className="grid gap-4 sm:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="location">
										<MapPin className="mr-2 inline h-4 w-4" />
										Location (optional)
									</Label>
									<Input
										id="location"
										value={formData.location}
										onChange={(e) =>
											setFormData({ ...formData, location: e.target.value })
										}
										placeholder="Main Hall"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="speaker">
										<User className="mr-2 inline h-4 w-4" />
										Speaker (optional)
									</Label>
									<Input
										id="speaker"
										value={formData.speaker}
										onChange={(e) =>
											setFormData({ ...formData, speaker: e.target.value })
										}
										placeholder="John Doe"
									/>
								</div>
							</div>

							<div className="grid gap-4 sm:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="type">Session Type *</Label>
									<Select
										value={formData.type}
										onValueChange={(value: any) =>
											setFormData({ ...formData, type: value })
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
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
									<Label htmlFor="status">Status *</Label>
									<Select
										value={formData.status}
										onValueChange={(value: any) =>
											setFormData({ ...formData, status: value })
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="upcoming">Upcoming</SelectItem>
											<SelectItem value="ongoing">Ongoing</SelectItem>
											<SelectItem value="completed">Completed</SelectItem>
											<SelectItem value="postponed">Postponed</SelectItem>
											<SelectItem value="cancelled">Cancelled</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<Button type="submit" disabled={isSubmitting} className="w-full">
								{isSubmitting ? "Creating Session..." : "Create Session"}
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
