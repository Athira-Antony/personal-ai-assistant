import { FastifyInstance } from "fastify";
import { GoogleGenAI } from "@google/genai";

interface ChatBody {
  message: string;
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

        const interaction =
          await ai.interactions.create({
            model: "gemini-3.8-flash",

            input: `
You are a personal AI assistant.

Help the user:
- organize their day
- manage tasks
- manage schedules
- create plans
- answer questions
- stay productive

Keep your response friendly, useful and concise.

User message:
${message}
            `,
          });

        const assistantResponse =
          interaction.output_text;

        console.log(
          "Assistant:",
          assistantResponse
        );

        return {
          response: assistantResponse,
        };
      } catch (error) {
        console.error(
          "Gemini error:",
          error
        );

        return reply.status(500).send({
          error:
            "Failed to generate AI response",
        });
      }
    }
  );
}