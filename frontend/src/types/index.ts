export type OrganizerItemType = "task" | "schedule";

export interface OrganizerItem {
  id: string;
  time: string;
  period: "am" | "pm";
  title: string;
  type: OrganizerItemType;
}
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start?: string;
  end?: string;
}