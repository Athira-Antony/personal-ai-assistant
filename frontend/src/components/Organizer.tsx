import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import TaskCard from "./TaskCard";

import { tasks } from "../data/mockData";
import { getCalendarEvents } from "../services/api";
import { CalendarEvent } from "../types";

import { COLORS } from "../constants/theme";

interface Props {
  onOpenChange?: (open: boolean) => void;
}

export default function Organizer({
  onOpenChange,
}: Props) {
  const [open, setOpen] = useState(false);

  const [calendarEvents, setCalendarEvents] =
    useState<CalendarEvent[]>([]);

  const [loadingEvents, setLoadingEvents] =
    useState(false);

  function toggleOrganizer() {
    const newValue = !open;

    setOpen(newValue);

    if (onOpenChange) {
      onOpenChange(newValue);
    }
  }

  useEffect(() => {
    if (!open) return;

    async function loadCalendarEvents() {
      try {
        setLoadingEvents(true);

        const events = await getCalendarEvents();

        console.log("Calendar events:", events);

        setCalendarEvents(events);
      } catch (error) {
        console.error(
          "Failed to load calendar events:",
          error
        );
      } finally {
        setLoadingEvents(false);
      }
    }

    loadCalendarEvents();
  }, [open]);

 function convertEventToSchedule(
  event: CalendarEvent
) {
  let time = "";
  let period: "am" | "pm" = "am";

  if (event.start) {
    const date = new Date(event.start);

    time = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // Remove AM/PM from the time
    time = time.replace(" AM", "").replace(" PM", "");

    // TaskCard specifically expects lowercase "am" or "pm"
    period = date.getHours() >= 12 ? "pm" : "am";
  }

  return {
    id: event.id,
    title: event.title,
    time,
    period,
    type: "schedule" as const,
  };
}

  return (
    <View>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleOrganizer}
        activeOpacity={0.7}
      >
        <Text style={styles.title}>
          Organizer
        </Text>

        <Text style={styles.arrow}>
          {open ? "⌃" : "⌄"}
        </Text>
      </TouchableOpacity>

      {open && (
        <View style={styles.content}>
          {/* TASKS */}

          <Text style={styles.sectionTitle}>
            Tasks
          </Text>

          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              item={task}
            />
          ))}

          {/* GOOGLE CALENDAR */}

          <Text
            style={[
              styles.sectionTitle,
              styles.scheduleTitle,
            ]}
          >
            Schedule
          </Text>

          {loadingEvents && (
            <ActivityIndicator size="small" />
          )}

          {!loadingEvents &&
            calendarEvents.length === 0 && (
              <Text style={styles.emptyText}>
                No upcoming events
              </Text>
            )}

          {!loadingEvents &&
            calendarEvents.map((event) => {
              const schedule =
                convertEventToSchedule(event);

              return (
                <TaskCard
                  key={event.id}
                  item={schedule}
                />
              );
            })}

          <View style={styles.bottomLine} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 42,

    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },

  arrow: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },

  content: {
    paddingTop: 28,
  },

  sectionTitle: {
    color: COLORS.textMuted,
    fontSize: 10,
    marginBottom: 8,
  },

  scheduleTitle: {
    marginTop: 14,
  },

  emptyText: {
    color: COLORS.textMuted,
    fontSize: 11,
    paddingVertical: 10,
  },

  bottomLine: {
    height: 1,
    backgroundColor: COLORS.border,

    marginTop: 30,
    marginHorizontal: 12,
  },
});