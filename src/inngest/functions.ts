import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "5s");
    await step.sleep("2", "5s");
    await step.sleep("w3", "5s");
    return { success: true, message: "Job queued" };
  }
);
