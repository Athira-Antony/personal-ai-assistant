import { google } from "googleapis";

export const googleOAuthClient =
  new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

export const CALENDAR_SCOPES = [
  "https://www.googleapis.com/auth/calendar.events",
];

export function getGoogleAuthUrl() {
  return googleOAuthClient.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: CALENDAR_SCOPES,
  });
}