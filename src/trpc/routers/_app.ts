import { inngest } from "@/inngest/client";
import { createTRPCRouter } from "../init";
import prisma from "@/lib/db";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { workflowsRoute } from "@/features/workflows/server/routers";

export const appRouter = createTRPCRouter({
  workflows: workflowsRoute,
});
// export type definition of API
export type AppRouter = typeof appRouter;
