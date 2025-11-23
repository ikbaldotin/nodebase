import { UpgradeModel } from "@/components/upgrade-model";
import { TRPCClientError } from "@trpc/client";
import { useState } from "react";

export const useUpgradeModel = () => {
  const [open, setOpen] = useState(false);

  const handelError = (error: unknown) => {
    if (error instanceof TRPCClientError) {
      if (error.data?.code === "FOBIDDEN") {
        setOpen(true);
        return true;
      }
    }
    return false;
  };
  const modal = <UpgradeModel open={open} onOpenChange={setOpen} />;
  return { handelError, modal };
};
