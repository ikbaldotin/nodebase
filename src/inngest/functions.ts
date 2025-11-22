import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { inngest } from "./client";
import { generateText } from "ai";
const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const antropic = createAnthropic();
export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.0-flash"),
        system: "you are a helpful assistant",

        prompt: "what is 2+2",
      }
    );
    const { steps: openaiSteps } = await step.ai.wrap(
      "openai-generate-text",
      generateText,
      {
        model: openai("gpt-4"),
        system: "you are a helpful assistant",

        prompt: "what is 2+2",
      }
    );
    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generate-text",
      generateText,
      {
        model: antropic("claude-sonnet-4-5"),
        system: "you are a helpful assistant",

        prompt: "what is 2+2",
      }
    );
    return {
      geminiSteps,
      openaiSteps,
      anthropicSteps,
    };
  }
);
