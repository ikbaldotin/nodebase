import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";

const Page = async () => {
  await requireAuth();
  const data = await caller.getUser();
  return (
    <div className="min-h-screen min-w-screen flex flex-col justify-center items-center gap-y-6">
      proctected server components
      <div>
        {JSON.stringify(data, null, 2)}
        <LogoutButton />
      </div>
    </div>
  );
};

export default Page;
