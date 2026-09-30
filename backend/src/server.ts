import Fastify from "fastify";
import cors from "@fastify/cors";
import "dotenv/config";
import { calendarRoutes } from "./routes/calendar.js";
import { chatRoutes } from "./routes/chat.js";

const app = Fastify({
  logger: true,
});

async function start() {
  try {
    await app.register(cors, {
      origin: true,
    });

    await app.register(chatRoutes, {
      prefix: "/api",
    });

    await app.register(calendarRoutes, {
        prefix: "/api/calendar",
    });

    app.get("/", async () => {
      return {
        status: "Personal Assistant API is running",
      };
    });

    await app.listen({
      port: 3000,
      host: "0.0.0.0",
    });

    console.log("Server running on port 3000");
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();