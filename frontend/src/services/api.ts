import { CalendarEvent } from "../types";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL;
export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const response = await fetch(
    `${API_URL}/api/calendar/events`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch calendar events: ${response.status}`
    );
  }

  const data = await response.json();

  return data.events ?? [];
}