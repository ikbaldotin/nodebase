import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Client } from "./client";
import { getQueryClient, trpc } from "@/trpc/server";
import { Suspense } from "react";

const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.getUser.queryOptions());
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>loading..........</p>}>
          <Client />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};
export default Page;
