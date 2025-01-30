import { Client, TextChannel } from "discord.js";
import Reminder from "../schemas/reminder"; // Adjust the path as needed
import initDB from "../db";

export default async function handleReminders(client: Client) {
  try {
    await initDB(); // Ensure DB connection is established
    const now = new Date();

    // Fetch reminders from the database
    const upcomingReminders = await Reminder.find({ date: { $gte: now } });

    upcomingReminders.forEach((reminder) => {
      const leadTimeMs = reminder.leadTimeMs || 10 * 60 * 1000; // Default lead time in milliseconds
      const reminderTime = new Date(reminder.date).getTime() - leadTimeMs;
      const timeUntilReminder = reminderTime - now.getTime();

      if (timeUntilReminder > 0) {
        setTimeout(() => sendReminder(client, reminder), timeUntilReminder);
      }
    });
  } catch (error) {
    console.error("Error handling reminders:", error);
  }
}

async function sendReminder(client: Client, reminder: any) {
  try {
    const channel = client.channels.cache.get(reminder.channelId) as TextChannel;

    if (!channel) {
      console.error(`Channel with ID ${reminder.channelId} not found.`);
      return;
    }

    const leadTimeMinutes = (reminder.leadTimeMs || 10 * 60 * 1000) / (60 * 1000);
    await channel.send(`🔔 Reminder: "${reminder.title}" starts in ${leadTimeMinutes} minutes!`);
  } catch (error) {
    console.error("Error sending reminder:", error);
  }
}

// Optional: Function to continuously run the reminder handler periodically
export function startReminderService(client: Client, intervalMs: number = 60 * 1000) {
  setInterval(() => handleReminders(client), intervalMs);
}
