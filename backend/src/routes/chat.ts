import { FastifyInstance } from "fastify";
import { GoogleGenAI } from "@google/genai";
import { google } from "googleapis";

import {
  googleOAuthClient,
} from "../services/googleCalendar.js";

interface ChatBody {
  message: string;
}

interface AssistantAction {
  action: "chat" | "create_calendar_event";
  response: string;
  title: string;
  start: string;
  end: string;
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function chatRoutes(
  app: FastifyInstance
) {
  app.post<{ Body: ChatBody }>(
    "/chat",
    async (request, reply) => {
      const { message } = request.body;

      if (!message || !message.trim()) {
        return reply.status(400).send({
          error: "Message is required",
        });
      }

      try {
        console.log("User:", message);

        const now = new Date();

        const interaction =
          await ai.interactions.create({
            model: "gemini-3.5-flash-lite",

            input: `
Current date and time:
${now.toISOString()}

User message:
${message}
            `,

            system_instruction: `
You are a personal AI assistant.

Determine whether the user wants to create
a Google Calendar event.

If the user asks to add, create, schedule,
or put something on their calendar:

action = "create_calendar_event"

Extract:
- title
- start
- end

Return start and end as ISO 8601 date/time strings.

If the user gives no end time,
make the event 1 hour long.

IMPORTANT:
Do NOT tell the user that an event was added.
Only the backend can confirm that after
Google Calendar successfully creates it.

For all other messages:

action = "chat"

Answer normally in response.

For normal chat:
title = ""
start = ""
end = ""
            `,

            response_format: {
              type: "text",
              mime_type: "application/json",

              schema: {
                type: "object",

                properties: {
                  action: {
                    type: "string",
                    enum: [
                      "chat",
                      "create_calendar_event",
                    ],
                  },

                  response: {
                    type: "string",
                  },

                  title: {
                    type: "string",
                  },

                  start: {
                    type: "string",
                  },

                  end: {
                    type: "string",
                  },
                },

                required: [
                  "action",
                  "response",
                  "title",
                  "start",
                  "end",
                ],
              },
            },
          });

        const outputText = interaction.output_text;

if (!outputText) {
  throw new Error(
    "Gemini returned an empty response"
  );
}

const result =
  JSON.parse(outputText) as AssistantAction;

        console.log("AI action:", result);

        // =========================
        // CALENDAR ACTION
        // =========================

        if (
          result.action ===
          "create_calendar_event"
        ) {
          if (
            !result.title ||
            !result.start ||
            !result.end
          ) {
            return {
              response:
                "I need a date and time to add that to your calendar.",
            };
          }

          const calendar = google.calendar({
            version: "v3",
            auth: googleOAuthClient,
          });

          const createdEvent =
  await calendar.events.insert({
    calendarId: "primary",

    requestBody: {
      summary: result.title,

      start: {
        dateTime: result.start,
        timeZone: "Asia/Kolkata",
      },

      end: {
        dateTime: result.end,
        timeZone: "Asia/Kolkata",
      },
    },
  });
          console.log(
            "Calendar event created:",
            createdEvent.data.id
          );

          // ONLY NOW do we tell the user it worked.
          return {
            response:
              `Added "${result.title}" to your calendar.`,
          };
        }

        // =========================
        // NORMAL CHAT
        // =========================

        console.log(
          "Assistant:",
          result.response
        );

        return {
          response: result.response,
        };
      } catch (error) {
        console.error(
          "Chat / Calendar error:",
          error
        );

        return reply.status(500).send({
          error: "Failed to process request",
        });
      }
    }
  );
}