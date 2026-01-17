import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";

import { mutation, query } from "./_generated/server";

function getEventStatus(
	startsAt: number,
	endsAt: number,
): "upcoming" | "live" | "ended" {
	const now = Date.now();
	if (now < startsAt) return "upcoming";
	if (now > endsAt) return "ended";
	return "live";
}

export const getOverallAnalytics = query({
	handler: async (ctx) => {
		const events = await ctx.db.query("events").collect();
		const participants = await ctx.db.query("participants").collect();
		const accessCodes = await ctx.db.query("accessCodes").collect();
		const announcements = await ctx.db.query("announcements").collect();
		const sessions = await ctx.db.query("sessions").collect();
		const liveActivities = await ctx.db.query("liveActivities").collect();
		const activityResponses = await ctx.db
			.query("activityResponses")
			.collect();

		const now = Date.now();

		const eventsWithStatus = events.map((event) => ({
			...event,
			status: getEventStatus(event.startsAt, event.endsAt),
		}));

		const totalEvents = events.length;
		const totalParticipants = participants.length;
		const activeEvents = eventsWithStatus.filter((e) => e.status === "live")
			.length;
		const upcomingEvents = eventsWithStatus.filter(
			(e) => e.status === "upcoming",
		).length;
		const endedEvents = eventsWithStatus.filter((e) => e.status === "ended")
			.length;

		const totalAccessCodes = accessCodes.length;
		const activeAccessCodes = accessCodes.filter((c) => c.isActive).length;
		const totalCodeUses = accessCodes.reduce(
			(sum, code) => sum + code.useCount,
			0,
		);

		const totalAnnouncements = announcements.length;
		const announcementsByType = {
			info: announcements.filter((a) => a.type === "info").length,
			warning: announcements.filter((a) => a.type === "warning").length,
			success: announcements.filter((a) => a.type === "success").length,
		};

		const totalSessions = sessions.length;
		const sessionsByType = {
			talk: sessions.filter((s) => s.type === "talk").length,
			workshop: sessions.filter((s) => s.type === "workshop").length,
			break: sessions.filter((s) => s.type === "break").length,
			meal: sessions.filter((s) => s.type === "meal").length,
			activity: sessions.filter((s) => s.type === "activity").length,
			ceremony: sessions.filter((s) => s.type === "ceremony").length,
			other: sessions.filter((s) => s.type === "other").length,
		};

		const sessionsByStatus = {
			postponed: sessions.filter((s) => s.status === "postponed").length,
			upcoming: sessions.filter((s) => s.status === "upcoming").length,
			ongoing: sessions.filter((s) => s.status === "ongoing").length,
			completed: sessions.filter((s) => s.status === "completed").length,
			cancelled: sessions.filter((s) => s.status === "cancelled").length,
		};

		const totalActivities = liveActivities.length;
		const activitiesByType = {
			poll: liveActivities.filter((a) => a.type === "poll").length,
			word_cloud: liveActivities.filter((a) => a.type === "word_cloud").length,
			reaction_speed: liveActivities.filter(
				(a) => a.type === "reaction_speed",
			).length,
			anonymous_chat: liveActivities.filter(
				(a) => a.type === "anonymous_chat",
			).length,
			guess_logo: liveActivities.filter((a) => a.type === "guess_logo").length,
		};

		const activitiesByStatus = {
			draft: liveActivities.filter((a) => a.status === "draft").length,
			scheduled: liveActivities.filter((a) => a.status === "scheduled").length,
			live: liveActivities.filter((a) => a.status === "live").length,
			ended: liveActivities.filter((a) => a.status === "ended").length,
		};

		const totalActivityResponses = activityResponses.length;

		const participantsWithPushTokens = participants.filter(
			(p) => p.expoPushToken,
		).length;
		const pushNotificationOptInRate =
			totalParticipants > 0
				? (participantsWithPushTokens / totalParticipants) * 100
				: 0;

		const joinMethodBreakdown = {
			qr_code: participants.filter((p) => p.accessMethod === "qr_code").length,
			access_code: participants.filter(
				(p) => p.accessMethod === "access_code",
			).length,
		};

		const participantsByEvent = new Map<string, number>();
		participants.forEach((p) => {
			const count = participantsByEvent.get(p.eventId) || 0;
			participantsByEvent.set(p.eventId, count + 1);
		});

		const averageParticipantsPerEvent =
			totalEvents > 0 ? totalParticipants / totalEvents : 0;

		const engagementRate =
			totalEvents > 0 && totalParticipants > 0
				? (totalActivities + totalSessions) / totalEvents
				: 0;

		const participantGrowthData = calculateParticipantGrowth(participants);

		const topPerformingEvents = Array.from(participantsByEvent.entries())
			.map(([eventId, count]) => {
				const event = events.find((e) => e._id === eventId);
				return {
					eventId,
					eventName: event?.name || "Unknown",
					participantCount: count,
					status: event ? getEventStatus(event.startsAt, event.endsAt) : "ended",
				};
			})
			.sort((a, b) => b.participantCount - a.participantCount)
			.slice(0, 5);

		return {
			overview: {
				totalEvents,
				totalParticipants,
				activeEvents,
				upcomingEvents,
				endedEvents,
				engagementRate: Math.round(engagementRate * 100) / 100,
			},
			participants: {
				total: totalParticipants,
				withPushTokens: participantsWithPushTokens,
				pushNotificationOptInRate: Math.round(pushNotificationOptInRate * 100) / 100,
				joinMethodBreakdown,
				averagePerEvent: Math.round(averageParticipantsPerEvent * 100) / 100,
				growthData: participantGrowthData,
			},
			accessCodes: {
				total: totalAccessCodes,
				active: activeAccessCodes,
				totalUses: totalCodeUses,
			},
			announcements: {
				total: totalAnnouncements,
				byType: announcementsByType,
			},
			sessions: {
				total: totalSessions,
				byType: sessionsByType,
				byStatus: sessionsByStatus,
			},
			activities: {
				total: totalActivities,
				byType: activitiesByType,
				byStatus: activitiesByStatus,
				totalResponses: totalActivityResponses,
			},
			topPerformingEvents,
		};
	},
});

function calculateParticipantGrowth(
	participants: Array<{ joinedAt: number }>,
): Array<{ date: string; count: number; cumulative: number }> {
	const sortedParticipants = [...participants].sort(
		(a, b) => a.joinedAt - b.joinedAt,
	);

	const dailyCounts = new Map<string, number>();

	sortedParticipants.forEach((participant) => {
		const date = new Date(participant.joinedAt);
		const dateKey = date.toISOString().split("T")[0];

		const current = dailyCounts.get(dateKey) || 0;
		dailyCounts.set(dateKey, current + 1);
	});

	const sortedDates = Array.from(dailyCounts.keys()).sort();
	let cumulative = 0;

	return sortedDates.map((date) => {
		const count = dailyCounts.get(date) || 0;
		cumulative += count;
		return {
			date,
			count,
			cumulative,
		};
	});
}

function generateAvatarSeed(): string {
	return Math.random().toString(36).substring(2, 15);
}

function generateCode(length = 6): string {
	const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	let code = "";
	for (let i = 0; i < length; i++) {
		code += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return code;
}

const firstNames = [
	"Alex",
	"Jordan",
	"Taylor",
	"Morgan",
	"Casey",
	"Riley",
	"Avery",
	"Cameron",
	"Dakota",
	"Quinn",
	"Sage",
	"River",
	"Skyler",
	"Phoenix",
	"Rowan",
	"Blake",
	"Hayden",
	"Reese",
	"Finley",
	"Emery",
];

const lastNames = [
	"Smith",
	"Johnson",
	"Williams",
	"Brown",
	"Jones",
	"Garcia",
	"Miller",
	"Davis",
	"Rodriguez",
	"Martinez",
	"Hernandez",
	"Lopez",
	"Wilson",
	"Anderson",
	"Thomas",
	"Taylor",
	"Moore",
	"Jackson",
	"Martin",
	"Lee",
];

function randomName(): string {
	const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
	const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
	return `${firstName} ${lastName}`;
}

function randomEmail(name: string): string {
	const cleanName = name.toLowerCase().replace(/\s+/g, ".");
	const domains = ["gmail.com", "yahoo.com", "outlook.com", "example.com"];
	const domain = domains[Math.floor(Math.random() * domains.length)];
	return `${cleanName}@${domain}`;
}

export const seed = mutation({
	handler: async (ctx) => {
		const now = Date.now();
		const oneDay = 24 * 60 * 60 * 1000;
		const oneWeek = 7 * oneDay;

		const eventNames = [
			"TechConf 2025",
			"Design Summit",
			"Startup Weekend",
			"Developer Meetup",
			"AI Innovation Forum",
		];

		const eventDescriptions = [
			"Annual technology conference featuring talks, workshops, and networking opportunities.",
			"A gathering of designers and creatives to share ideas and inspiration.",
			"Build your startup idea in 48 hours with mentors and investors.",
			"Monthly meetup for developers to discuss latest trends and technologies.",
			"Exploring the future of artificial intelligence and machine learning.",
		];

		const createdEvents: Id<"events">[] = [];

		for (let i = 0; i < 5; i++) {
			const daysAgo = i * 7;
			const startsAt = now - daysAgo * oneDay - oneDay;
			const endsAt = startsAt + 2 * oneDay;

			const eventId = await ctx.db.insert("events", {
				name: eventNames[i] || `Event ${i + 1}`,
				description: eventDescriptions[i] || "Event description",
				startsAt,
				endsAt,
				messageToParticipants: `Welcome to ${eventNames[i]}!`,
				isCurrentEvent: i === 0,
			});

			createdEvents.push(eventId);

			const accessCodeId = await ctx.db.insert("accessCodes", {
				eventId,
				code: generateCode(),
				isActive: true,
				maxUses: 999,
				useCount: Math.floor(Math.random() * 50) + 10,
				createdAt: startsAt - oneWeek,
			});

			for (let j = 0; j < 3; j++) {
				await ctx.db.insert("announcements", {
					eventId,
					message: `Announcement ${j + 1} for ${eventNames[i]}`,
					type: j === 0 ? "info" : j === 1 ? "warning" : "success",
				});
			}

			for (let j = 0; j < 8; j++) {
				const sessionDate = startsAt + j * 2 * 60 * 60 * 1000;
				const sessionStart = sessionDate;
				const sessionEnd = sessionStart + 60 * 60 * 1000;

				const sessionTypes: Array<
					| "talk"
					| "workshop"
					| "break"
					| "meal"
					| "activity"
					| "ceremony"
					| "other"
				> = ["talk", "workshop", "break", "meal", "activity", "ceremony", "other"];

				const sessionStatuses: Array<
					| "postponed"
					| "upcoming"
					| "ongoing"
					| "completed"
					| "cancelled"
				> = ["postponed", "upcoming", "ongoing", "completed", "cancelled"];

				await ctx.db.insert("sessions", {
					eventId,
					title: `Session ${j + 1}: ${sessionTypes[j % sessionTypes.length]} Session`,
					description: `Description for session ${j + 1}`,
					date: sessionDate,
					startTime: sessionStart,
					endTime: sessionEnd,
					location: j % 2 === 0 ? `Room ${j + 1}` : undefined,
					speaker: j % 3 === 0 ? randomName() : undefined,
					type: sessionTypes[j % sessionTypes.length],
					status:
						sessionEnd < now
							? "completed"
							: sessionStart > now
								? "upcoming"
								: "ongoing",
				});
			}

			const activityTypes: Array<
				| "poll"
				| "word_cloud"
				| "reaction_speed"
				| "anonymous_chat"
				| "guess_logo"
			> = ["poll", "word_cloud", "reaction_speed", "anonymous_chat", "guess_logo"];

			for (let j = 0; j < 5; j++) {
				const activityType = activityTypes[j % activityTypes.length];
				const activityStart = startsAt + j * 3 * 60 * 60 * 1000;

				let config: any;
				if (activityType === "poll") {
					config = {
						type: "poll",
						question: `Poll Question ${j + 1}`,
						options: [
							{ id: "1", text: "Option A" },
							{ id: "2", text: "Option B" },
							{ id: "3", text: "Option C" },
						],
						allowMultiple: false,
						showResultsToParticipants: true,
					};
				} else if (activityType === "word_cloud") {
					config = {
						type: "word_cloud",
						prompt: `Word Cloud Prompt ${j + 1}`,
						maxSubmissionsPerUser: 3,
						maxWordLength: 20,
					};
				} else if (activityType === "reaction_speed") {
					config = {
						type: "reaction_speed",
						roundCount: 5,
						minDelay: 1000,
						maxDelay: 5000,
					};
				} else if (activityType === "anonymous_chat") {
					config = {
						type: "anonymous_chat",
						maxMessageLength: 200,
						slowModeSeconds: 5,
					};
				} else {
					config = {
						type: "guess_logo",
						category: "Tech",
						logoCount: 10,
						timePerLogo: 30000,
						difficulty: "medium",
						showHints: true,
					};
				}

				const activityStatus =
					activityStart + 2 * 60 * 60 * 1000 < now
						? "ended"
						: activityStart > now
							? "scheduled"
							: "live";

				const activityId = await ctx.db.insert("liveActivities", {
					eventId,
					type: activityType,
					title: `${activityType} Activity ${j + 1}`,
					status: activityStatus,
					scheduledStartTime: activityStart,
					actualStartTime: activityStatus !== "scheduled" ? activityStart : undefined,
					endedAt:
						activityStatus === "ended"
							? activityStart + 2 * 60 * 60 * 1000
							: undefined,
					config,
					createdAt: activityStart - oneDay,
				});
			}
		}

		const totalParticipants = Math.floor(Math.random() * 51) + 100;

		for (let i = 0; i < totalParticipants; i++) {
			const eventIndex = Math.floor(Math.random() * createdEvents.length);
			const eventId = createdEvents[eventIndex];
			const event = await ctx.db.get(eventId);
			if (!event) continue;

			const name = randomName();
			const email = randomEmail(name);
			const daysAgo = Math.floor(Math.random() * 30);
			const joinedAt = event.startsAt - daysAgo * oneDay;

			const participantId = await ctx.db.insert("participants", {
				eventId,
				name,
				email,
				avatarSeed: generateAvatarSeed(),
				accessMethod: Math.random() > 0.5 ? "qr_code" : "access_code",
				joinedAt,
				expoPushToken:
					Math.random() > 0.3
						? `ExponentPushToken[${generateAvatarSeed()}]`
						: undefined,
			});

			const activities = await ctx.db
				.query("liveActivities")
				.withIndex("by_event", (q) => q.eq("eventId", eventId))
				.collect();

			for (const activity of activities.slice(0, 3)) {
				if (Math.random() > 0.4) {
					await ctx.db.insert("activityParticipants", {
						activityId: activity._id,
						participantId,
						joinedAt: activity.actualStartTime || activity.scheduledStartTime || now,
					});

					if (activity.type === "poll" && activity.config.type === "poll") {
						const selectedOptions = activity.config.options
							.slice(0, activity.config.allowMultiple ? 2 : 1)
							.map((opt: { id: string }) => opt.id);

						await ctx.db.insert("activityResponses", {
							activityId: activity._id,
							participantId,
							responseData: {
								type: "poll_vote",
								selectedOptionIds: selectedOptions,
							},
							submittedAt: (activity.actualStartTime || now) + 5000,
						});
					} else if (activity.type === "word_cloud") {
						await ctx.db.insert("activityResponses", {
							activityId: activity._id,
							participantId,
							responseData: {
								type: "word_submission",
								word: `word${Math.floor(Math.random() * 100)}`,
							},
							submittedAt: (activity.actualStartTime || now) + 10000,
						});
					} else if (activity.type === "reaction_speed") {
						await ctx.db.insert("activityResponses", {
							activityId: activity._id,
							participantId,
							responseData: {
								type: "reaction_time",
								roundNumber: 1,
								reactionTimeMs: Math.floor(Math.random() * 1000) + 200,
							},
							submittedAt: (activity.actualStartTime || now) + 5000,
						});
					} else if (activity.type === "anonymous_chat") {
						for (let msg = 0; msg < Math.floor(Math.random() * 3) + 1; msg++) {
							await ctx.db.insert("chatMessages", {
								activityId: activity._id,
								participantId,
								anonymousName: `User${Math.floor(Math.random() * 1000)}`,
								message: `Chat message ${msg + 1}`,
								sentAt:
									(activity.actualStartTime || now) +
									msg * 30 * 1000 +
									5000,
							});
						}
					}
				}
			}
		}

		return {
			success: true,
			eventsCreated: createdEvents.length,
			participantsCreated: totalParticipants,
		};
	},
});
