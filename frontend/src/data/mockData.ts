import { OrganizerItem } from "../types";

export const tasks: OrganizerItem[] = [
  {
    id: "1",
    time: "12.30",
    period: "am",
    title: "Talk with Jacob",
    type: "task",
  },
  {
    id: "2",
    time: "1.30",
    period: "pm",
    title: "Understand the logic of...",
    type: "task",
  },
  {
    id: "3",
    time: "5.00",
    period: "pm",
    title: "Decide a final plan",
    type: "task",
  },
];

export const schedules: OrganizerItem[] = [
  {
    id: "4",
    time: "12.30",
    period: "am",
    title: "Understand the logic of bookwri...",
    type: "schedule",
  },
  {
    id: "5",
    time: "1.30",
    period: "pm",
    title: "Find a final plan",
    type: "schedule",
  },
];