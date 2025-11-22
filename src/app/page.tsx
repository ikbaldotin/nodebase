"use client";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Page = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("done");
      },
    })
  );
  return (
    <div className="min-h-screen min-w-screen flex flex-col justify-center items-center gap-y-6">
      proctected server components
      <div>
        {JSON.stringify(data, null, 2)}
        <LogoutButton />
      </div>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        create getWorkflows
      </Button>
    </div>
  );
};

export default Page;
