import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
export const useSubscription = () => {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const { data } = await authClient.customer.state();
      return data;
    },
  });
};

export const useHasActiveSubscription = () => {
  const { data: customerstate, isLoading, ...rest } = useSubscription();
  const hasActiveSubscription =
    customerstate?.activeSubscriptions &&
    customerstate.activeSubscriptions.length > 0;
  return {
    hasActiveSubscription,
    subscription: customerstate?.activeSubscriptions?.[0],
    isLoading,
    ...rest,
  };
};
