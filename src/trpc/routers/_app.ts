import { inngest } from "@/inngest/client";
import {
  baseProcedure,
  createTRPCRouter,
  premiumProducer,
  protectedProcedure,
} from "../init";
import prisma from "@/lib/db";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
export const appRouter = createTRPCRouter({
  testAi: premiumProducer.mutation(async () => {
    await inngest.send({ name: "execute/ai" });

    return { success: true, message: "done..." };
  }),
  getWorkflows: protectedProcedure.query(() => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "ikbal@gmail.com",
      },
    });
    return prisma.workflow.create({
      data: {
        name: "test-workflow",
      },
    });
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
