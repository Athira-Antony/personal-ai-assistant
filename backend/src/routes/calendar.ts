import { FastifyInstance } from "fastify";
import { google } from "googleapis";
import {
  googleOAuthClient,
  getGoogleAuthUrl,
} from "../services/googleCalendar.js";

export async function calendarRoutes(
  app: FastifyInstance
) {
  // Start Google OAuth
  app.get("/connect", async (_request, reply) => {
    const url = getGoogleAuthUrl();

    return reply.redirect(url);
  });

  // Google redirects here after user gives permission
  app.get(
    "/oauth/callback",
    async (request, reply) => {
      const { code } = request.query as {
        code?: string;
      };

      if (!code) {
        return reply.status(400).send({
          error: "Authorization code missing",
        });
      }

      try {
        const { tokens } =
          await googleOAuthClient.getToken(code);

        googleOAuthClient.setCredentials(tokens);

        console.log(
          "Google Calendar connected!"
        );

        // TEMPORARY for testing.
        // We will store these in the database later.
        console.log(
          "Access token received:",
          Boolean(tokens.access_token)
        );

        console.log(
          "Refresh token received:",
          Boolean(tokens.refresh_token)
        );

        return reply.send({
          success: true,
          message:
            "Google Calendar connected successfully",
        });
      } catch (error) {
        console.error(
          "Google OAuth error:",
          error
        );

        return reply.status(500).send({
          error:
            "Failed to connect Google Calendar",
        });
      }
    }
  );

  app.post("/events", async (request, reply) => {
  const { title, start, end } = request.body as {
    title: string;
    start: string;
    end: string;
  };

  if (!title || !start || !end) {
    return reply.status(400).send({
      error: "title, start and end are required",
    });
  }

  try {
    const calendar = google.calendar({
      version: "v3",
      auth: googleOAuthClient,
    });

    const response = await calendar.events.insert({
      calendarId: "primary",

      requestBody: {
        summary: title,

        start: {
          dateTime: start,
          timeZone: "Asia/Kolkata",
        },

        end: {
          dateTime: end,
          timeZone: "Asia/Kolkata",
        },
      },
    });

    return {
      success: true,
      event: {
        id: response.data.id,
        title: response.data.summary,
        start: response.data.start?.dateTime,
        end: response.data.end?.dateTime,
        link: response.data.htmlLink,
      },
    };
  } catch (error) {
    console.error(
      "Create calendar event error:",
      error
    );

    return reply.status(500).send({
      error: "Failed to create calendar event",
    });
  }
});

// Get upcoming Google Calendar events
app.get("/events", async (_request, reply) => {
  try {
    const calendar = google.calendar({
      version: "v3",
      auth: googleOAuthClient,
    });

    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items || [];

    const formattedEvents = events.map((event) => ({
      id: event.id || "",
      title: event.summary || "No title",
      start:
        event.start?.dateTime ||
        event.start?.date ||
        "",
      end:
        event.end?.dateTime ||
        event.end?.date ||
        "",
    }));

    return {
      events: formattedEvents,
    };
  } catch (error) {
    console.error(
      "Calendar events error:",
      error
    );

    return reply.status(500).send({
      error: "Failed to fetch calendar events",
    });
  }
});
}